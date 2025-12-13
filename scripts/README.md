# Cloudinary Upload Script

This script uploads all images from `constants/index.ts` to Cloudinary and generates a new constants file with Cloudinary URLs.

## Prerequisites

1. **Cloudinary Account**: Sign up at [cloudinary.com](https://cloudinary.com) if you don't have one
2. **Get Your Credentials**: 
   - Go to [Cloudinary Console](https://console.cloudinary.com/settings/api-keys)
   - Copy your `Cloud Name`, `API Key`, and `API Secret`

## Setup

1. **Create `.env` file** in the root directory:
```bash
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

2. **Make sure your images are ready**:
   - The script reads from `constants/index.ts`
   - It supports:
     - Local file paths (e.g., `/images/portrait/image.jpg`)
     - Google Drive URLs (e.g., `https://drive.google.com/file/d/...`)
     - Direct image URLs

## Usage

Run the upload script:

```bash
npm run upload:cloudinary
```

## What It Does

1. **Reads all images** from `constants/index.ts` (baby_shower, events, landscape, maternity, portrait, weeding)
2. **Uploads each image** to Cloudinary in organized folders:
   - `rod16-photography/baby_shower/`
   - `rod16-photography/events/`
   - `rod16-photography/landscape/`
   - `rod16-photography/maternity/`
   - `rod16-photography/portrait/`
   - `rod16-photography/weeding/`
3. **Generates a new file** `constants/index.cloudinary.ts` with all Cloudinary URLs
4. **Shows progress** for each upload

## After Upload

1. **Review** `constants/index.cloudinary.ts` to verify all URLs
2. **Replace** `constants/index.ts` with the new file (or manually copy the URLs)
3. **Update** `next.config.ts` - Already done! Cloudinary is already configured ✅

## Features

- ✅ Supports local files and Google Drive URLs
- ✅ Organized folder structure in Cloudinary
- ✅ Progress tracking with success/failure indicators
- ✅ Error handling - keeps original URLs if upload fails
- ✅ Rate limiting protection (500ms delay between uploads)

## Troubleshooting

### Missing Environment Variables
Make sure your `.env` file has all three Cloudinary credentials.

### Local Files Not Found
Ensure your images are in the `public/images/` directory matching the paths in `constants/index.ts`.

### Google Drive Downloads Failing
Some Google Drive files may require authentication. Consider:
- Making files publicly accessible, or
- Using local file paths instead

### Rate Limiting
If you get rate limit errors, increase the delay in the script (currently 500ms).

