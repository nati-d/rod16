# Cloudinary Configuration

This project is configured to use Cloudinary for all image hosting and optimization.

## Configuration

### Next.js Configuration (`next.config.ts`)

- ✅ Cloudinary domain (`res.cloudinary.com`) is whitelisted in `remotePatterns`
- ✅ Image optimization enabled with AVIF and WebP formats
- ✅ Extended caching (1 year) for Cloudinary images
- ✅ Responsive image sizes configured

### Image Constants (`constants/index.ts`)

All portfolio images are stored as Cloudinary URLs:
- `baby_shower` - Baby shower photography
- `events` - Event photography
- `landscape` - Landscape photography
- `maternity` - Maternity photography
- `portrait` - Portrait photography
- `weeding` - Wedding photography

## Usage

### Using Images in Components

All images are imported from `@/constants`:

```typescript
import {weeding, portrait, landscape} from "@/constants";

// Use directly in Image component
<Image
  src={weeding[0]}
  alt="Wedding photo"
  fill
  className="object-cover"
/>
```

### Cloudinary URL Helpers (`lib/cloudinary.ts`)

Optional helper functions for Cloudinary transformations:

```typescript
import {getResponsiveImage, getThumbnail} from "@/lib/cloudinary";

// Get responsive image
const optimizedUrl = getResponsiveImage(weeding[0], 800, 600);

// Get thumbnail
const thumbUrl = getThumbnail(portrait[5], 200);
```

## Benefits

1. **Automatic Optimization**: Cloudinary automatically optimizes images
2. **Fast CDN**: Images served from Cloudinary's global CDN
3. **Format Conversion**: Automatic WebP/AVIF conversion
4. **Responsive Images**: Easy transformations for different screen sizes
5. **Compression**: Images are pre-compressed (target: 5MB max)

## Uploading New Images

Use the upload script to add new images:

```bash
npm run upload:cloudinary
```

This will:
1. Read images from `constants/index.ts`
2. Compress images if needed (max 5MB)
3. Upload to Cloudinary
4. Generate `constants/index.cloudinary.ts` with new URLs

## Image Optimization

- Images are automatically compressed before upload
- Target size: 5MB maximum
- Quality: 85% (reduced if needed)
- Format: JPEG/PNG converted to optimized formats

## Components Using Cloudinary

All components now use Cloudinary images:
- ✅ Portfolio page
- ✅ Homepage carousel
- ✅ Wedding showcase
- ✅ Services page
- ✅ Footer gallery
- ✅ Testimonials
- ✅ About QA section

