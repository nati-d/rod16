# Required Images for SEO

This directory should contain the following images for optimal SEO and social sharing:

## 1. og-image.jpg
- **Size**: 1200x630 pixels
- **Format**: JPG or PNG
- **Purpose**: Open Graph image for social media sharing (Facebook, Twitter, LinkedIn, etc.)
- **Content**: Should represent your brand - consider using a beautiful hero image from your portfolio or a branded image with your logo
- **Location**: `/public/og-image.jpg`

## 2. logo.png
- **Size**: At least 512x512 pixels (square format recommended)
- **Format**: PNG with transparent background preferred
- **Purpose**: Used in structured data (Schema.org) for organization logo
- **Content**: Your Rod16 Photography logo
- **Location**: `/public/logo.png`

## Notes:
- These images are referenced in:
  - `app/layout.tsx` (metadata and structured data)
  - All page metadata for social sharing
- Make sure images are optimized for web (compressed but high quality)
- The og-image.jpg will appear when your site is shared on social media platforms
- The logo.png is used in search engine structured data

