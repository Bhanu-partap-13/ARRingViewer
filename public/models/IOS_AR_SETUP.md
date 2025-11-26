# AR Viewer Setup for iOS

## Important: iOS AR Requirements

iOS devices (iPhone/iPad) use **Quick Look** for AR, which requires **USDZ** format files, not GLB.

### Current Status:
- ✅ Android AR works with GLB files
- ⚠️ iOS AR requires USDZ conversion

### Solutions for iOS AR:

#### Option 1: Use Online Converter
1. Go to https://www.vectary.com/3d-modeling-news/glb-to-usdz/
2. Or use: https://products.aspose.app/3d/conversion/glb-to-usdz
3. Upload your `gem_ring1.glb` file
4. Download the converted `gem_ring1.usdz` file
5. Place it in `public/models/` folder
6. Update the code to use USDZ for iOS

#### Option 2: Use Model Viewer's Auto-Conversion (Recommended)
Model-viewer can auto-generate USDZ from GLB files. The current setup should work if:
- Your GLB file is properly formatted
- The model is not too complex
- Safari browser is up-to-date

#### Option 3: Manual USDZ Creation
Use Apple's Reality Converter (Mac only):
1. Download Reality Converter from Apple
2. Import `gem_ring1.glb`
3. Export as USDZ
4. Upload to `public/models/`

### Testing on iPhone:

1. Open Safari on your iPhone (Chrome doesn't support Quick Look AR)
2. Navigate to your Vercel site
3. Go to any product page
4. Look for the AR QuickLook icon (cube icon)
5. Tap it to enter AR mode
6. Point camera at a flat surface
7. Tap to place the ring

### Troubleshooting:

- **AR button doesn't appear**: Make sure you're using Safari, not Chrome
- **Model doesn't load**: GLB file might be too large or have issues
- **AR icon is greyed out**: Model format not compatible with iOS
- **Nothing happens**: Check browser console for errors

### Current Implementation:
The code is configured to auto-convert GLB to USDZ format. Model-viewer handles this automatically for supported models.

If AR still doesn't work, you'll need to manually convert your GLB file to USDZ format using one of the methods above.
