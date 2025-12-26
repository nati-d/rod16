import {v2 as cloudinary} from "cloudinary";
import * as fs from "fs";
import * as path from "path";
import sharp from "sharp";
import {commercial} from "../constants/index";

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

// Compress image using sharp
async function compressImage(imageBuffer: Buffer, maxSizeMB: number = 2): Promise<Buffer> {
	const maxSizeBytes = maxSizeMB * 1024 * 1024;
	const originalSize = imageBuffer.length;

	const isValid = await validateImage(imageBuffer);
	if (!isValid) {
		throw new Error("Invalid image file - cannot read image metadata");
	}

	if (originalSize <= maxSizeBytes) {
		return imageBuffer;
	}

	console.log(`    📦 Compressing image: ${(originalSize / 1024 / 1024).toFixed(2)}MB -> target: ${maxSizeMB}MB`);

	try {
		const metadata = await sharp(imageBuffer).metadata();
		const format = metadata.format || "jpeg";

		let quality = 85;
		let compressedBuffer = imageBuffer;

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
				} else {
					compressedBuffer = await sharp(imageBuffer)
						.jpeg({ quality, mozjpeg: true })
						.toBuffer();
				}

				const isValidCompressed = await validateImage(compressedBuffer);
				if (!isValidCompressed) {
					break;
				}
			} catch (compressionError) {
				break;
			}
		}

		if (compressedBuffer.length > maxSizeBytes && metadata.width && metadata.height) {
			const scaleFactor = Math.sqrt(maxSizeBytes / compressedBuffer.length);
			const newWidth = Math.floor((metadata.width || 2000) * scaleFactor);
			const newHeight = Math.floor((metadata.height || 2000) * scaleFactor);

			if (newWidth >= 100 && newHeight >= 100) {
				console.log(`    📐 Resizing: ${metadata.width}x${metadata.height} -> ${newWidth}x${newHeight}`);

				try {
					compressedBuffer = await sharp(imageBuffer)
						.resize(newWidth, newHeight, { fit: "inside", withoutEnlargement: true })
						.jpeg({ quality: 80, mozjpeg: true })
						.toBuffer();

					const isValidResized = await validateImage(compressedBuffer);
					if (!isValidResized) {
						console.log(`    ⚠️  Resize produced invalid image, using compressed version`);
					}
				} catch (resizeError) {
					console.log(`    ⚠️  Resize error, using compressed version`);
				}
			}
		}

		const finalIsValid = await validateImage(compressedBuffer);
		if (!finalIsValid) {
			return imageBuffer;
		}

		const finalSize = compressedBuffer.length;
		const compressionRatio = ((1 - finalSize / originalSize) * 100).toFixed(1);
		console.log(`    ✅ Compressed: ${(finalSize / 1024 / 1024).toFixed(2)}MB (${compressionRatio}% reduction)`);

		return compressedBuffer;
	} catch (error: any) {
		console.error(`    ⚠️  Compression failed: ${error.message}`);
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
	index: number
): Promise<UploadResult> {
	try {
		const localPath = path.join(process.cwd(), "public", imagePath);
		
		if (!fs.existsSync(localPath)) {
			throw new Error(`Local file not found: ${localPath}`);
		}

		const imageBuffer = fs.readFileSync(localPath);
		
		const isValid = await validateImage(imageBuffer);
		if (!isValid) {
			throw new Error(`Invalid image file: ${localPath}`);
		}

		const compressedBuffer = await compressImage(imageBuffer);

		const finalIsValid = await validateImage(compressedBuffer);
		if (!finalIsValid) {
			throw new Error(`Compressed image is invalid: ${localPath}`);
		}

		const uploadOptions: any = {
			folder: `rod16-photography/commercial`,
			public_id: `commercial-${index}`,
			overwrite: false,
			resource_type: "image",
			timeout: 60000,
		};

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

// Main function
async function main() {
	console.log("🚀 Starting Commercial images upload to Cloudinary...\n");

	const cloudName = process.env.CLOUDINARY_CLOUD_NAME || "dm9wxgkgg";
	const apiKey = process.env.CLOUDINARY_API_KEY || "611977875687454";
	const apiSecret = process.env.CLOUDINARY_API_SECRET || "b90DM4PVCFT8ILwFFTA7rBVpBdE";
	
	if (!cloudName || !apiKey || !apiSecret) {
		console.error("❌ Error: Missing Cloudinary credentials!");
		process.exit(1);
	}
	
	console.log(`✅ Using Cloudinary cloud: ${cloudName}`);
	console.log(`📸 Processing Commercial (${commercial.length} images)...\n`);

	const results: string[] = [];

	for (let i = 0; i < commercial.length; i++) {
		const image = commercial[i];
		console.log(`  [${i + 1}/${commercial.length}] Uploading ${image}...`);

		const result = await uploadToCloudinary(image, i);

		if (result.success) {
			results.push(result.cloudinaryUrl);
			console.log(`  ✅ Success: ${result.cloudinaryUrl}`);
		} else {
			console.log(`  ❌ Failed: ${result.error}`);
			results.push(image); // Keep original path if upload fails
		}

		// Add a delay to avoid rate limiting
		await new Promise((resolve) => setTimeout(resolve, 1000));
	}

	// Update constants file with Cloudinary URLs
	const constantsPath = path.join(process.cwd(), "constants", "index.ts");
	let constantsContent = fs.readFileSync(constantsPath, "utf-8");

	// Replace commercial array with new URLs
	const commercialStart = constantsContent.indexOf("// Commercial portfolio images");
	const commercialEnd = constantsContent.indexOf("];", constantsContent.indexOf("export const commercial = [")) + 2;
	
	const newCommercialArray = `// Commercial portfolio images
export const commercial = [
${results.map((url) => `\t"${url}",`).join("\n")}
];`;

	constantsContent = constantsContent.substring(0, commercialStart) + newCommercialArray + "\n\n" + constantsContent.substring(commercialEnd + 1);

	fs.writeFileSync(constantsPath, constantsContent, "utf-8");

	console.log("\n🎉 Upload complete!");
	console.log(`✅ Updated constants/index.ts with ${results.length} Cloudinary URLs`);
}

main().catch((error) => {
	console.error("\n❌ Error during upload:", error);
	process.exit(1);
});

