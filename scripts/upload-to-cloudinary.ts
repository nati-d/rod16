import {v2 as cloudinary} from "cloudinary";
import * as fs from "fs";
import * as path from "path";
import sharp from "sharp";
import {baby_shower, events, landscape, maternity, portrait, weeding, commercial} from "../constants/index";

// Configure Cloudinary
// Use environment variables if available, otherwise use hardcoded values
cloudinary.config({
	cloud_name: process.env.CLOUDINARY_CLOUD_NAME ,
	api_key: process.env.CLOUDINARY_API_KEY ,
	api_secret: process.env.CLOUDINARY_API_SECRET ,
});

interface UploadResult {
	originalPath: string;
	cloudinaryUrl: string;
	success: boolean;
	error?: string;
}

// Extract file ID from Google Drive URL
function extractGoogleDriveId(url: string): string | null {
	const match = url.match(/\/d\/([a-zA-Z0-9_-]+)/);
	return match ? match[1] : null;
}

// Convert Google Drive URL to direct download URL
function getGoogleDriveDownloadUrl(url: string): string {
	const fileId = extractGoogleDriveId(url);
	if (!fileId) return url;
	return `https://drive.google.com/uc?export=download&id=${fileId}`;
}

// Download image from URL (Google Drive or other)
async function downloadImage(url: string): Promise<Buffer> {
	try {
		const response = await fetch(url, {
			headers: {
				"User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
			},
		});

		if (!response.ok) {
			throw new Error(`Failed to download: ${response.statusText}`);
		}

		const arrayBuffer = await response.arrayBuffer();
		return Buffer.from(arrayBuffer);
	} catch (error) {
		console.error(`Error downloading ${url}:`, error);
		throw error;
	}
}

// Validate image buffer
async function validateImage(buffer: Buffer): Promise<boolean> {
	try {
		const metadata = await sharp(buffer).metadata();
		return metadata.width !== undefined && metadata.height !== undefined && metadata.width > 0 && metadata.height > 0;
	} catch {
		return false;
	}
}

// Compress image using sharp
async function compressImage(imageBuffer: Buffer, maxSizeMB: number = 5): Promise<Buffer> {
	const maxSizeBytes = maxSizeMB * 1024 * 1024; // Convert MB to bytes
	const originalSize = imageBuffer.length;

	// Validate the input image first
	const isValid = await validateImage(imageBuffer);
	if (!isValid) {
		throw new Error("Invalid image file - cannot read image metadata");
	}

	// If image is already small enough, return as is
	if (originalSize <= maxSizeBytes) {
		return imageBuffer;
	}

	console.log(`    📦 Compressing image: ${(originalSize / 1024 / 1024).toFixed(2)}MB -> target: ${maxSizeMB}MB`);

	try {
		// Get image metadata
		const metadata = await sharp(imageBuffer).metadata();
		const format = metadata.format || "jpeg";

		// Start with high quality and reduce if needed
		let quality = 85;
		let compressedBuffer = imageBuffer;

		// Compress in steps until we reach target size
		while (compressedBuffer.length > maxSizeBytes && quality > 20) {
			quality -= 5;

			try {
				if (format === "jpeg" || format === "jpg") {
					compressedBuffer = await sharp(imageBuffer)
						.jpeg({ quality, mozjpeg: true })
						.toBuffer();
				} else if (format === "png") {
					compressedBuffer = await sharp(imageBuffer)
						.png({ quality, compressionLevel: 9 })
						.toBuffer();
				} else if (format === "webp") {
					compressedBuffer = await sharp(imageBuffer)
						.webp({ quality })
						.toBuffer();
				} else {
					// For other formats, convert to JPEG
					compressedBuffer = await sharp(imageBuffer)
						.jpeg({ quality, mozjpeg: true })
						.toBuffer();
				}

				// Validate compressed buffer
				const isValidCompressed = await validateImage(compressedBuffer);
				if (!isValidCompressed) {
					console.log(`    ⚠️  Compression produced invalid image at quality ${quality}, using previous version`);
					break;
				}
			} catch (compressionError) {
				console.log(`    ⚠️  Compression error at quality ${quality}, using previous version`);
				break;
			}
		}

		// If still too large, resize the image
		if (compressedBuffer.length > maxSizeBytes && metadata.width && metadata.height) {
			const scaleFactor = Math.sqrt(maxSizeBytes / compressedBuffer.length);
			const newWidth = Math.floor((metadata.width || 2000) * scaleFactor);
			const newHeight = Math.floor((metadata.height || 2000) * scaleFactor);

			// Ensure minimum dimensions
			if (newWidth < 100 || newHeight < 100) {
				console.log(`    ⚠️  Resize would be too small, keeping current size`);
			} else {
				console.log(`    📐 Resizing: ${metadata.width}x${metadata.height} -> ${newWidth}x${newHeight}`);

				try {
					if (format === "jpeg" || format === "jpg") {
						compressedBuffer = await sharp(imageBuffer)
							.resize(newWidth, newHeight, { fit: "inside", withoutEnlargement: true })
							.jpeg({ quality: 80, mozjpeg: true })
							.toBuffer();
					} else if (format === "png") {
						compressedBuffer = await sharp(imageBuffer)
							.resize(newWidth, newHeight, { fit: "inside", withoutEnlargement: true })
							.png({ quality: 80, compressionLevel: 9 })
							.toBuffer();
					} else {
						compressedBuffer = await sharp(imageBuffer)
							.resize(newWidth, newHeight, { fit: "inside", withoutEnlargement: true })
							.jpeg({ quality: 80, mozjpeg: true })
							.toBuffer();
					}

					// Validate resized buffer
					const isValidResized = await validateImage(compressedBuffer);
					if (!isValidResized) {
						console.log(`    ⚠️  Resize produced invalid image, using compressed version`);
					}
				} catch (resizeError) {
					console.log(`    ⚠️  Resize error, using compressed version`);
				}
			}
		}

		// Final validation
		const finalIsValid = await validateImage(compressedBuffer);
		if (!finalIsValid) {
			console.log(`    ⚠️  Final compressed image is invalid, using original`);
			return imageBuffer;
		}

		const finalSize = compressedBuffer.length;
		const compressionRatio = ((1 - finalSize / originalSize) * 100).toFixed(1);
		console.log(`    ✅ Compressed: ${(finalSize / 1024 / 1024).toFixed(2)}MB (${compressionRatio}% reduction)`);

		return compressedBuffer;
	} catch (error: any) {
		console.error(`    ⚠️  Compression failed: ${error.message}`);
		// Return original if compression fails, but validate it first
		const originalIsValid = await validateImage(imageBuffer);
		if (!originalIsValid) {
			throw new Error("Original image is also invalid");
		}
		return imageBuffer;
	}
}

// Upload image to Cloudinary
async function uploadToCloudinary(
	imagePathOrUrl: string,
	folder: string,
	index: number
): Promise<UploadResult> {
	try {
		let uploadOptions: any = {
			folder: `rod16-photography/${folder}`,
			public_id: `${folder}-${index}`,
			overwrite: false,
			resource_type: "image",
			timeout: 60000, // 60 seconds timeout
		};

		// Check if it's a local file path
		if (imagePathOrUrl.startsWith("/")) {
			const localPath = path.join(process.cwd(), "public", imagePathOrUrl);
			
			if (!fs.existsSync(localPath)) {
				throw new Error(`Local file not found: ${localPath}`);
			}

			// Read and compress the image
			const imageBuffer = fs.readFileSync(localPath);
			
			// Validate before compression
			const isValid = await validateImage(imageBuffer);
			if (!isValid) {
				throw new Error(`Invalid image file: ${localPath}`);
			}

			const compressedBuffer = await compressImage(imageBuffer);

			// Final validation before upload
			const finalIsValid = await validateImage(compressedBuffer);
			if (!finalIsValid) {
				throw new Error(`Compressed image is invalid: ${localPath}`);
			}

			// Upload compressed buffer to Cloudinary
			return new Promise((resolve, reject) => {
				const uploadStream = cloudinary.uploader.upload_stream(
					uploadOptions,
					(error, result) => {
						if (error) {
							reject(error);
						} else if (result) {
							resolve({
								originalPath: imagePathOrUrl,
								cloudinaryUrl: result.secure_url,
								success: true,
							});
						}
					}
				);
				uploadStream.end(compressedBuffer);
			});
		} else if (imagePathOrUrl.includes("drive.google.com")) {
			// Handle Google Drive URL
			const downloadUrl = getGoogleDriveDownloadUrl(imagePathOrUrl);
			const imageBuffer = await downloadImage(downloadUrl);
			
			// Validate before compression
			const isValid = await validateImage(imageBuffer);
			if (!isValid) {
				throw new Error(`Invalid image downloaded from: ${imagePathOrUrl}`);
			}
			
			// Compress the image before uploading
			const compressedBuffer = await compressImage(imageBuffer);
			
			// Final validation before upload
			const finalIsValid = await validateImage(compressedBuffer);
			if (!finalIsValid) {
				throw new Error(`Compressed image is invalid: ${imagePathOrUrl}`);
			}
			
			// Upload compressed buffer to Cloudinary
			return new Promise((resolve, reject) => {
				const uploadStream = cloudinary.uploader.upload_stream(
					uploadOptions,
					(error, result) => {
						if (error) {
							reject(error);
						} else if (result) {
							resolve({
								originalPath: imagePathOrUrl,
								cloudinaryUrl: result.secure_url,
								success: true,
							});
						}
					}
				);
				uploadStream.end(compressedBuffer);
			});
		} else {
			// Handle other URLs (direct image URLs)
			const imageBuffer = await downloadImage(imagePathOrUrl);
			
			// Validate before compression
			const isValid = await validateImage(imageBuffer);
			if (!isValid) {
				throw new Error(`Invalid image downloaded from: ${imagePathOrUrl}`);
			}
			
			// Compress the image before uploading
			const compressedBuffer = await compressImage(imageBuffer);
			
			// Final validation before upload
			const finalIsValid = await validateImage(compressedBuffer);
			if (!finalIsValid) {
				throw new Error(`Compressed image is invalid: ${imagePathOrUrl}`);
			}
			
			return new Promise((resolve, reject) => {
				const uploadStream = cloudinary.uploader.upload_stream(
					uploadOptions,
					(error, result) => {
						if (error) {
							reject(error);
						} else if (result) {
							resolve({
								originalPath: imagePathOrUrl,
								cloudinaryUrl: result.secure_url,
								success: true,
							});
						}
					}
				);
				uploadStream.end(compressedBuffer);
			});
		}
	} catch (error: any) {
		return {
			originalPath: imagePathOrUrl,
			cloudinaryUrl: "",
			success: false,
			error: error.message || "Unknown error",
		};
	}
}

// Process all images in a category
async function processCategory(
	categoryName: string,
	images: string[]
): Promise<string[]> {
	console.log(`\n📸 Processing ${categoryName} (${images.length} images)...`);
	const results: string[] = [];

	for (let i = 0; i < images.length; i++) {
		const image = images[i];
		console.log(`  [${i + 1}/${images.length}] Uploading ${image}...`);

		const result = await uploadToCloudinary(image, categoryName, i);

		if (result.success) {
			results.push(result.cloudinaryUrl);
			console.log(`  ✅ Success: ${result.cloudinaryUrl}`);
		} else {
			console.log(`  ❌ Failed: ${result.error}`);
			// Keep original URL if upload fails
			results.push(image);
		}

		// Add a delay to avoid rate limiting and timeouts
		await new Promise((resolve) => setTimeout(resolve, 1000));
	}

	return results;
}

// Generate new constants file
function generateConstantsFile(results: {
	baby_shower: string[];
	events: string[];
	landscape: string[];
	maternity: string[];
	portrait: string[];
	weeding: string[];
	commercial: string[];
}) {
	const fileContent = `// Baby shower portfolio images
export const baby_shower = [
${results.baby_shower.map((url) => `\t"${url}",`).join("\n")}
];

// Events portfolio images
export const events = [
${results.events.map((url) => `\t"${url}",`).join("\n")}
];

// Landscape portfolio images
export const landscape = [
${results.landscape.map((url) => `\t"${url}",`).join("\n")}
];

// Maternity portfolio images
export const maternity = [
${results.maternity.map((url) => `\t"${url}",`).join("\n")}
];

// Portrait portfolio images
export const portrait = [
${results.portrait.map((url) => `\t"${url}",`).join("\n")}
];

// Commercial portfolio images
export const commercial = [
${results.commercial.map((url) => `\t"${url}",`).join("\n")}
];

// Weeding portfolio images
export const weeding = [
${results.weeding.map((url) => `\t"${url}",`).join("\n")}
];
`;

	const outputPath = path.join(process.cwd(), "constants", "index.cloudinary.ts");
	fs.writeFileSync(outputPath, fileContent, "utf-8");
	console.log(`\n✅ Generated new constants file: ${outputPath}`);
}

// Main function
async function main() {
	console.log("🚀 Starting Cloudinary upload process...\n");

	// Verify Cloudinary configuration
	const cloudName = process.env.CLOUDINARY_CLOUD_NAME;
	const apiKey = process.env.CLOUDINARY_API_KEY;
	const apiSecret = process.env.CLOUDINARY_API_SECRET;
	
	if (!cloudName || !apiKey || !apiSecret) {
		console.error("❌ Error: Missing Cloudinary credentials!");
		console.error("   Please set CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, and CLOUDINARY_API_SECRET environment variables");
		process.exit(1);
	}
	
	console.log(`✅ Using Cloudinary cloud: ${cloudName}`);

	try {
		// Process all categories sequentially to avoid timeouts and rate limiting
		console.log("\n⚠️  Processing categories sequentially to avoid timeouts...\n");
		
		const babyShowerUrls = await processCategory("baby_shower", baby_shower);
		const eventsUrls = await processCategory("events", events);
		const landscapeUrls = await processCategory("landscape", landscape);
		const maternityUrls = await processCategory("maternity", maternity);
		const portraitUrls = await processCategory("portrait", portrait);
		const commercialUrls = await processCategory("commercial", commercial);
		const weedingUrls = await processCategory("weeding", weeding);

		// Generate new constants file
		generateConstantsFile({
			baby_shower: babyShowerUrls,
			events: eventsUrls,
			landscape: landscapeUrls,
			maternity: maternityUrls,
			portrait: portraitUrls,
			commercial: commercialUrls,
			weeding: weedingUrls,
		});

		console.log("\n🎉 Upload complete!");
		console.log("\nNext steps:");
		console.log("1. Review constants/index.cloudinary.ts");
		console.log("2. If everything looks good, replace constants/index.ts with the new file");
		console.log("3. Update next.config.ts to allow Cloudinary images");
	} catch (error) {
		console.error("\n❌ Error during upload:", error);
		process.exit(1);
	}
}

// Run the script
main();

