import {v2 as cloudinary} from "cloudinary";
import * as fs from "fs";
import * as path from "path";
import sharp from "sharp";

// Configure Cloudinary
cloudinary.config({
	cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
	api_key: process.env.CLOUDINARY_API_KEY,
	api_secret: process.env.CLOUDINARY_API_SECRET,
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

// Compress image using sharp to less than 1MB
async function compressImage(imageBuffer: Buffer, maxSizeMB: number = 1): Promise<Buffer> {
	const maxSizeBytes = maxSizeMB * 1024 * 1024; // Convert MB to bytes
	const originalSize = imageBuffer.length;

	// Validate the input image first
	const isValid = await validateImage(imageBuffer);
	if (!isValid) {
		throw new Error("Invalid image file - cannot read image metadata");
	}

	// If image is already small enough, return as is
	if (originalSize <= maxSizeBytes) {
		console.log(`    ✅ Image already under ${maxSizeMB}MB: ${(originalSize / 1024 / 1024).toFixed(2)}MB`);
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
			if (newWidth < 800 || newHeight < 800) {
				console.log(`    ⚠️  Resize would be too small (${newWidth}x${newHeight}), keeping current size`);
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

// Delete all resources in a folder
async function deleteFolder(folderPath: string): Promise<void> {
	try {
		console.log(`🗑️  Deleting folder: ${folderPath}...`);
		
		// List all resources in the folder
		const resources = await cloudinary.search
			.expression(`folder:${folderPath}`)
			.max_results(500)
			.execute();

		if (resources.resources && resources.resources.length > 0) {
			console.log(`   Found ${resources.resources.length} resources to delete`);
			
			// Delete resources in batches
			const publicIds = resources.resources.map((resource: any) => resource.public_id);
			
			// Delete in batches of 100 (Cloudinary limit)
			for (let i = 0; i < publicIds.length; i += 100) {
				const batch = publicIds.slice(i, i + 100);
				await cloudinary.api.delete_resources(batch, {
					type: "upload",
					resource_type: "image",
				});
				console.log(`   Deleted batch ${Math.floor(i / 100) + 1}/${Math.ceil(publicIds.length / 100)}`);
			}
			
			console.log(`   ✅ Deleted ${publicIds.length} resources`);
		} else {
			console.log(`   ℹ️  Folder is empty or doesn't exist`);
		}
	} catch (error: any) {
		console.error(`   ❌ Error deleting folder: ${error.message}`);
		throw error;
	}
}

// Upload image to Cloudinary
async function uploadToCloudinary(
	imagePath: string,
	folder: string,
	index: number
): Promise<UploadResult> {
	try {
		const localPath = path.join(process.cwd(), "public", "baby-shower", imagePath);
		
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

		const compressedBuffer = await compressImage(imageBuffer, 1); // Compress to 1MB

		// Final validation before upload
		const finalIsValid = await validateImage(compressedBuffer);
		if (!finalIsValid) {
			throw new Error(`Compressed image is invalid: ${localPath}`);
		}

		const uploadOptions = {
			folder: `rod16-photography/${folder}`,
			public_id: `${folder}-${index}`,
			overwrite: true,
			resource_type: "image" as const,
			timeout: 180000, // 180 seconds timeout (3 minutes) for large compressed images
		};

		// Upload compressed buffer to Cloudinary with timeout handling
		return new Promise((resolve, reject) => {
			// Set a timeout for the entire upload operation
			const uploadTimeout = setTimeout(() => {
				reject(new Error("Upload timeout after 3 minutes"));
			}, 180000); // 3 minutes

			const uploadStream = cloudinary.uploader.upload_stream(
				uploadOptions,
				(error, result) => {
					clearTimeout(uploadTimeout);
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
	console.log("🚀 Starting Baby Shower Images Upload Process...\n");

	// Verify Cloudinary configuration
	const cloudName = process.env.CLOUDINARY_CLOUD_NAME;
	const apiKey = process.env.CLOUDINARY_API_KEY;
	const apiSecret = process.env.CLOUDINARY_API_SECRET;
	
	if (!cloudName || !apiKey || !apiSecret) {
		console.error("❌ Error: Missing Cloudinary credentials!");
		console.error("   Please set CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, and CLOUDINARY_API_SECRET environment variables");
		process.exit(1);
	}
	
	console.log(`✅ Using Cloudinary cloud: ${cloudName}\n`);

	try {
		// Step 1: Delete the old baby_shower folder (Cloudinary uses underscore)
		const oldFolderPath = "rod16-photography/baby_shower";
		await deleteFolder(oldFolderPath);
		console.log("");

		// Step 2: Get all images from public/baby-shower folder (public folder uses hyphen)
		const babyShowerFolder = path.join(process.cwd(), "public", "baby-shower");
		
		if (!fs.existsSync(babyShowerFolder)) {
			console.error(`❌ Error: Folder not found: ${babyShowerFolder}`);
			process.exit(1);
		}

		// Get all image files
		const allFiles = fs.readdirSync(babyShowerFolder)
			.filter(file => /\.(jpg|jpeg|png|webp)$/i.test(file));

		// Separate files into numbered and non-numbered
		const numberedFiles: string[] = [];
		const otherFiles: string[] = [];

		allFiles.forEach(file => {
			// Check if file starts with a number 1-9 (not 0) followed by .jpg or space
			// This matches: "1.jpg", "2.jpg", "10.jpg", "1 (2).jpg", etc.
			// But NOT: "0R8A1841.jpg", "0S8A0234.jpg", "front0S8A9941.jpg"
			const isNumbered = /^[1-9]\d*(?:\s*\([0-9]+\))?\.(jpg|jpeg|png|webp)$/i.test(file);
			
			if (isNumbered) {
				numberedFiles.push(file);
			} else {
				otherFiles.push(file);
			}
		});

		// Sort numbered files numerically (1.jpg, 2.jpg, 10.jpg, not 1.jpg, 10.jpg, 2.jpg)
		numberedFiles.sort((a, b) => {
			// Extract the leading number from filenames like "1.jpg", "1 (2).jpg", "10.jpg"
			const numA = parseInt(a.match(/^([1-9]\d*)/)?.[1] || "0");
			const numB = parseInt(b.match(/^([1-9]\d*)/)?.[1] || "0");
			
			if (numA !== numB) {
				return numA - numB;
			}
			
			// If same number, sort by variant: "1.jpg" before "1 (2).jpg"
			const variantA = a.match(/\((\d+)\)/)?.[1] || "0";
			const variantB = b.match(/\((\d+)\)/)?.[1] || "0";
			return parseInt(variantA) - parseInt(variantB);
		});

		// Sort other files alphabetically
		otherFiles.sort();

		// Combine: numbered files first, then others
		const files = [...numberedFiles, ...otherFiles];
		
		console.log(`📋 File sorting: ${numberedFiles.length} numbered files, ${otherFiles.length} other files`);

		console.log(`📸 Found ${files.length} images in public/baby-shower folder\n`);

		if (files.length === 0) {
			console.log("⚠️  No images found to upload");
			process.exit(0);
		}

		// Step 3: Upload all images to baby_shower folder (Cloudinary uses underscore)
		console.log(`📤 Uploading ${files.length} images to Cloudinary (baby_shower folder)...\n`);
		
		const results: string[] = [];
		const folderName = "baby_shower"; // Cloudinary folder name uses underscore

		for (let i = 0; i < files.length; i++) {
			const file = files[i];
			console.log(`  [${i + 1}/${files.length}] Uploading ${file}...`);

			// Retry logic for uploads (up to 3 attempts)
			let result;
			let retries = 3;
			let success = false;

			while (retries > 0 && !success) {
				try {
					result = await uploadToCloudinary(file, folderName, i);

					if (result.success) {
						success = true;
						results.push(result.cloudinaryUrl);
						console.log(`  ✅ Success: ${result.cloudinaryUrl}\n`);
					} else {
						retries--;
						if (retries > 0) {
							console.log(`  ⚠️  Failed: ${result.error}, retrying... (${retries} attempts left)`);
							// Wait longer before retrying (10 seconds for timeout errors, 5 for others)
							const waitTime = result.error?.includes("timeout") || result.error?.includes("Timeout") ? 10000 : 5000;
							await new Promise((resolve) => setTimeout(resolve, waitTime));
						} else {
							console.log(`  ❌ Failed after all retries: ${result.error}`);
							console.log(`  ⚠️  Continuing with next image...\n`);
							// Push empty string to maintain index alignment - script will continue
							results.push("");
							success = true; // Set to true so we don't get stuck in loop
						}
					}
				} catch (error: any) {
					retries--;
					if (retries > 0) {
						console.log(`  ⚠️  Exception: ${error.message}, retrying... (${retries} attempts left)`);
						await new Promise((resolve) => setTimeout(resolve, 10000));
					} else {
						console.log(`  ❌ Failed after all retries: ${error.message}`);
						console.log(`  ⚠️  Continuing with next image...\n`);
						results.push("");
						success = true; // Set to true so we don't get stuck in loop
					}
				}
			}

			// Add a delay to avoid rate limiting (longer delay if we had retries or failures)
			if (i < files.length - 1) {
				const delayTime = results[i] ? 1000 : 3000; // Longer delay if upload failed
				await new Promise((resolve) => setTimeout(resolve, delayTime));
			}
		}

		// Step 4: Update constants/index.ts file - replace baby_shower array
		const constantsPath = path.join(process.cwd(), "constants", "index.ts");
		
		if (!fs.existsSync(constantsPath)) {
			console.error(`❌ Error: Constants file not found: ${constantsPath}`);
			process.exit(1);
		}

		// Read the existing constants file
		const constantsContent = fs.readFileSync(constantsPath, "utf-8");
		
		// Generate the new baby_shower array (filter out empty strings from failed uploads)
		const validResults = results.filter(url => url && url.length > 0);
		const newBabyShowerArray = `// Baby shower portfolio images
export const baby_shower = [
${validResults.map((url) => `\t"${url}",`).join("\n")}
];`;
		
		// Replace the baby_shower array in the file
		// Match the baby_shower export section (from "// Baby shower" comment to the closing bracket and semicolon)
		const babyShowerRegex = /\/\/\s*Baby\s+shower[\s\S]*?export const baby_shower = \[[\s\S]*?\];/;
		
		if (babyShowerRegex.test(constantsContent)) {
			const updatedContent = constantsContent.replace(babyShowerRegex, newBabyShowerArray);
			fs.writeFileSync(constantsPath, updatedContent, "utf-8");
			console.log(`✅ Updated constants/index.ts with ${validResults.length} baby_shower image URLs`);
		} else {
			console.error(`❌ Error: Could not find baby_shower array in constants/index.ts`);
			console.log(`Creating backup and appending new array...`);
			
			// Backup original file
			const backupPath = path.join(process.cwd(), "constants", "index.ts.backup");
			fs.writeFileSync(backupPath, constantsContent, "utf-8");
			console.log(`✅ Created backup: ${backupPath}`);
			
			// Append the new array to the end of the file
			const updatedContent = constantsContent.trimEnd() + "\n\n" + newBabyShowerArray + "\n";
			fs.writeFileSync(constantsPath, updatedContent, "utf-8");
			console.log(`✅ Appended new baby_shower array to constants/index.ts`);
		}

		const successfulUploads = results.filter(url => url && url.length > 0).length;
		const failedUploads = results.length - successfulUploads;
		
		console.log(`\n📝 Upload Summary:`);
		console.log(`   ✅ Successful: ${successfulUploads} images`);
		if (failedUploads > 0) {
			console.log(`   ❌ Failed: ${failedUploads} images`);
			console.log(`   💡 Tip: Run the script again to retry failed uploads`);
		}
		console.log(`   📄 Constants file updated with ${validResults.length} entries`);
		
	} catch (error: any) {
		console.error("\n❌ Fatal error during upload:", error.message);
		console.error("   Stack trace:", error.stack);
		console.log("\n⚠️  Script encountered a fatal error. Some images may have been uploaded successfully.");
		process.exit(1);
	}
}

// Run the script
main();

