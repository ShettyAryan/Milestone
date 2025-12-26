# Favicon Setup Guide

## Where to Place Favicon Files

Place all favicon files in the `frontend/public/` directory.

## Required Favicon Files

### Essential Files:
1. **`favicon.ico`** - Main favicon (16x16, 32x32, 48x48 sizes in one file)
   - Size: 16x16, 32x32, or 48x48 pixels
   - Format: .ico

### Recommended Files (for better browser support):
2. **`favicon-16x16.png`** - 16x16 pixels
3. **`favicon-32x32.png`** - 32x32 pixels
4. **`apple-touch-icon.png`** - 180x180 pixels (for iOS devices)
5. **`site.webmanifest`** - Web app manifest (optional but recommended)

## File Structure

```
frontend/
  public/
    favicon.ico          ← Main favicon
    favicon-16x16.png   ← 16x16 PNG
    favicon-32x32.png   ← 32x32 PNG
    apple-touch-icon.png ← 180x180 PNG (iOS)
    site.webmanifest     ← Manifest file (optional)
```

## How to Create Favicons

### Option 1: Online Favicon Generator (Easiest)
1. Go to [favicon.io](https://favicon.io) or [realfavicongenerator.net](https://realfavicongenerator.net)
2. Upload your logo/image
3. Download the generated favicon package
4. Extract and place files in `frontend/public/`

### Option 2: From Existing Logo
1. Use your clinic logo
2. Resize to required dimensions
3. Convert to .ico format (use online converter or image editor)
4. Place in `frontend/public/`

### Option 3: Simple Text Favicon
1. Use [favicon.io text generator](https://favicon.io/favicon-generator/)
2. Enter "MCC" or "MC" (Milestones Clinic)
3. Choose colors matching your brand (#6B4D7C)
4. Download and place in `frontend/public/`

## Quick Setup (Minimal)

If you only have one favicon file:

1. **Rename your favicon file to `favicon.ico`**
2. **Place it in `frontend/public/favicon.ico`**
3. **That's it!** The browser will automatically find it.

The `index.html` already has the favicon links configured, so once you place the files, they'll work automatically.

## Testing

After adding favicons:
1. Clear browser cache (Ctrl+Shift+Delete)
2. Hard refresh (Ctrl+F5)
3. Check browser tab - favicon should appear
4. Check DevTools → Network tab to verify files are loading

## Notes

- Vite automatically serves files from the `public/` directory
- Files in `public/` are accessible at the root URL (e.g., `/favicon.ico`)
- No need to import or reference them in code - just place them in `public/`
- After deployment, favicons will work automatically on Vercel

