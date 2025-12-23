import {v2 as cloudinary} from "cloudinary";
import * as fs from "fs";
import * as path from "path";
import sharp from "sharp";

// Configure Cloudinary
cloudinary.config({
	cloud_name: process.env.CLOUDINARY_CLOUD_NAME || "dm9wxgkgg",
	api_key: process.env.CLOUDINARY_API_KEY || "611977875687454",
	api_secret: process.env.CLOUDINARY_API_SECRET || "b90DM4PVCFT8ILwFFTA7rBVpBdE",
});

interface UploadResult {
	originalPath: string;
	cloudinaryUrl: string;
	success: boolean;
	error?: string;
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

// Compress image using sharp to less than 2MB while maintaining quality
async function compressImage(imageBuffer: Buffer, maxSizeMB: number = 2): Promise<Buffer> {
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
		let quality = 90; // Start with high quality
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

		// If still too large, resize the image while maintaining aspect ratio
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
							.jpeg({ quality: 85, mozjpeg: true })
							.toBuffer();
					} else if (format === "png") {
						compressedBuffer = await sharp(imageBuffer)
							.resize(newWidth, newHeight, { fit: "inside", withoutEnlargement: true })
							.png({ quality: 85, compressionLevel: 9 })
							.toBuffer();
					} else {
						compressedBuffer = await sharp(imageBuffer)
							.resize(newWidth, newHeight, { fit: "inside", withoutEnlargement: true })
							.jpeg({ quality: 85, mozjpeg: true })
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
	imagePath: string,
	displayIndex: number // Only used for logging, not for naming
): Promise<UploadResult> {
	try {
		const localPath = path.join(process.cwd(), "public", "images", imagePath);
		
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

		// Compress to less than 2MB
		const compressedBuffer = await compressImage(imageBuffer, 2);

		// Final validation before upload
		const finalIsValid = await validateImage(compressedBuffer);
		if (!finalIsValid) {
			throw new Error(`Compressed image is invalid: ${localPath}`);
		}

		// Extract the number from the filename (e.g., "17.jpg" -> 17)
		const fileNumber = parseInt(imagePath.match(/\d+/)?.[0] || "0");
		
		const uploadOptions: any = {
			folder: `rod16-photography/home`,
			public_id: `home-${fileNumber}`, // Use actual file number, not sequential index
			overwrite: true, // Overwrite existing images with the same name
			resource_type: "image",
			timeout: 60000, // 60 seconds timeout
		};

		// Upload compressed buffer to Cloudinary
		return new Promise((resolve, reject) => {
			const uploadStream = cloudinary.uploader.upload_stream(
				uploadOptions,
				(error, result) => {
					if (error) {
						reject(error);
					} else if (result) {
						resolve({
							originalPath: imagePath,
							cloudinaryUrl: result.secure_url,
							success: true,
						});
					}
				}
			);
			uploadStream.end(compressedBuffer);
		});
	} catch (error: any) {
		return {
			originalPath: imagePath,
			cloudinaryUrl: "",
			success: false,
			error: error.message || "Unknown error",
		};
	}
}

// Get all image files from public/images folder and sort them numerically
function getImageFiles(): string[] {
	const imagesDir = path.join(process.cwd(), "public", "images");
	
	if (!fs.existsSync(imagesDir)) {
		throw new Error(`Images directory not found: ${imagesDir}`);
	}

	const files = fs.readdirSync(imagesDir)
		.filter(file => /\.(jpg|jpeg|png|webp)$/i.test(file))
		.sort((a, b) => {
			// Extract numbers from filenames for proper numeric sorting
			const numA = parseInt(a.match(/\d+/)?.[0] || "0");
			const numB = parseInt(b.match(/\d+/)?.[0] || "0");
			return numA - numB;
		});

	return files;
}

// Generate constants file with Home array
function generateConstantsFile(homeUrls: string[]) {
	const fileContent = `// Home images (hero carousel and other home page images)
export const home = [
${homeUrls.map((url) => `\t"${url}",`).join("\n")}
];
`;

	const outputPath = path.join(process.cwd(), "constants", "index.home.ts");
	fs.writeFileSync(outputPath, fileContent, "utf-8");
	console.log(`\n✅ Generated constants file: ${outputPath}`);
}

// Main function
async function main() {
	console.log("🚀 Starting Home Images upload to Cloudinary...\n");

	// Verify Cloudinary configuration
	const cloudName = process.env.CLOUDINARY_CLOUD_NAME || "dm9wxgkgg";
	const apiKey = process.env.CLOUDINARY_API_KEY || "611977875687454";
	const apiSecret = process.env.CLOUDINARY_API_SECRET || "b90DM4PVCFT8ILwFFTA7rBVpBdE";
	
	if (!cloudName || !apiKey || !apiSecret) {
		console.error("❌ Error: Missing Cloudinary credentials!");
		process.exit(1);
	}
	
	console.log(`✅ Using Cloudinary cloud: ${cloudName}`);

	try {
		// Get all image files sorted numerically
		const imageFiles = getImageFiles();
		
		if (imageFiles.length === 0) {
			console.error("❌ No image files found in public/images folder!");
			process.exit(1);
		}

		console.log(`\n📸 Found ${imageFiles.length} images to upload:`);
		imageFiles.forEach((file, index) => {
			console.log(`  ${index + 1}. ${file}`);
		});

		console.log(`\n⚠️  Uploading images sequentially to avoid timeouts...\n`);
		
		const homeUrls: string[] = [];

		// Upload each image in order
		for (let i = 0; i < imageFiles.length; i++) {
			const imageFile = imageFiles[i];
			const displayIndex = i + 1; // For display purposes
			
			console.log(`  [${displayIndex}/${imageFiles.length}] Uploading ${imageFile}...`);

			const result = await uploadToCloudinary(imageFile, displayIndex);

			if (result.success) {
				homeUrls.push(result.cloudinaryUrl);
				console.log(`  ✅ Success: ${result.cloudinaryUrl}`);
			} else {
				console.log(`  ❌ Failed: ${result.error}`);
				// Keep placeholder or skip - you might want to handle this differently
				console.log(`  ⚠️  Skipping this image in the array`);
			}

			// Add a delay to avoid rate limiting and timeouts
			if (i < imageFiles.length - 1) {
				await new Promise((resolve) => setTimeout(resolve, 1000));
			}
		}

		// Generate constants file
		generateConstantsFile(homeUrls);

		console.log("\n🎉 Upload complete!");
		console.log(`\n✅ Uploaded ${homeUrls.length} images to Cloudinary`);
		console.log("\nNext steps:");
		console.log("1. Review constants/index.home.ts");
		console.log("2. Import and use the 'home' array in your components");
	} catch (error) {
		console.error("\n❌ Error during upload:", error);
		process.exit(1);
	}
}

// Run the script
main();

