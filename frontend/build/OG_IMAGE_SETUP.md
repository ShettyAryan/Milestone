# Open Graph Image Setup Guide

## What is an OG Image?

The Open Graph (OG) image is the preview image that appears when your website is shared on social media platforms like Facebook, LinkedIn, Twitter, WhatsApp, etc.

## Image Requirements

### Recommended Specifications:
- **Dimensions**: 1200 x 630 pixels (1.91:1 aspect ratio)
- **Format**: JPG or PNG
- **File Size**: Under 1MB (optimize for web)
- **File Name**: `og-image.jpg` or `og-image.png`

### Why These Dimensions?
- Facebook recommends: 1200 x 630px
- Twitter large card: 1200 x 628px
- LinkedIn: 1200 x 627px
- WhatsApp: 1200 x 630px

## Where to Place the Image

Place your OG image in the `frontend/public/` directory:

```
frontend/
  public/
    og-image.jpg    ← Your OG image here
    favicon.ico
    ...
```

## What Should the Image Contain?

### Recommended Content:
1. **Clinic Logo** - Prominently displayed
2. **Clinic Name** - "Milestones Child Clinic"
3. **Doctor Name** - "Dr. Vinay H. Joshi"
4. **Tagline** - "Expert Pediatric Care" or similar
5. **Visual Elements** - Use your brand colors (#6B4D7C)

### Design Tips:
- Keep text large and readable (at least 24px font size)
- Use high contrast for text
- Include your brand colors
- Make it visually appealing and professional
- Avoid too much text (keep it simple)

## How to Create the OG Image

### Option 1: Design Tools
1. **Canva** (Free):
   - Go to [canva.com](https://canva.com)
   - Create custom size: 1200 x 630px
   - Design with clinic logo and information
   - Download as JPG

2. **Figma** (Free):
   - Create 1200 x 630px frame
   - Design your OG image
   - Export as PNG or JPG

3. **Photoshop/GIMP**:
   - Create new document: 1200 x 630px
   - Design and export

### Option 2: Online Generators
- [og-image.vercel.app](https://og-image.vercel.app) - Generate programmatically
- [Bannerbear](https://bannerbear.com) - Automated OG image generation

### Option 3: Use Existing Clinic Image
- Use a high-quality clinic photo
- Add text overlay with clinic name
- Ensure it's 1200 x 630px

## Quick Template Example

```
┌─────────────────────────────────────────┐
│                                         │
│     [Clinic Logo]                       │
│                                         │
│     MILESTONES CHILD CLINIC             │
│     Expert Pediatric Care               │
│                                         │
│     Dr. Vinay H. Joshi                  │
│     MBBS, MD (Pediatrics), DM (Neonatology) │
│                                         │
│     Book Your Appointment Today         │
│                                         │
└─────────────────────────────────────────┘
```

## Testing Your OG Image

### 1. Facebook Debugger
- Go to [developers.facebook.com/tools/debug](https://developers.facebook.com/tools/debug)
- Enter your website URL
- Click "Scrape Again" to refresh
- Check the preview

### 2. Twitter Card Validator
- Go to [cards-dev.twitter.com/validator](https://cards-dev.twitter.com/validator)
- Enter your website URL
- Check the preview

### 3. LinkedIn Post Inspector
- Go to [linkedin.com/post-inspector](https://www.linkedin.com/post-inspector)
- Enter your website URL
- Check the preview

### 4. WhatsApp
- Share your website link in WhatsApp
- Check the preview card

## Important Notes

1. **Update URL in index.html**: 
   - The OG image URL in `index.html` is set to `https://milestoneschildclinic.com/og-image.jpg`
   - **Update this** with your actual domain after deployment

2. **File Path**:
   - Files in `public/` are served at root URL
   - `/og-image.jpg` = `frontend/public/og-image.jpg`

3. **After Deployment**:
   - Clear social media cache using the debuggers above
   - Social platforms cache OG images, so you may need to refresh

4. **Multiple Images** (Optional):
   - You can create different images for different pages
   - Update the `og:image` meta tag per page if needed

## Current Configuration

The `index.html` file is already configured with:
- ✅ OG image meta tags
- ✅ Twitter Card meta tags
- ✅ Image dimensions specified
- ✅ Alt text included

**You just need to:**
1. Create your OG image (1200 x 630px)
2. Save it as `og-image.jpg` in `frontend/public/`
3. Update the domain URL in `index.html` after deployment

## Example OG Image URLs

After deployment, your OG image will be accessible at:
- `https://your-domain.vercel.app/og-image.jpg`
- Update the `og:image` and `twitter:image` meta tags with your actual domain

---

**Need help?** Check the design examples or use online OG image generators for quick results!

