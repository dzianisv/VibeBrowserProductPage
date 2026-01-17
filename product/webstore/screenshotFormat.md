# Google Chrome Web Store Screenshot Format

## Requirements

- **Dimensions**: 1280x800 or 640x400 pixels
- **Format**: JPEG or 24-bit PNG (no alpha/transparency)
- **Quantity**: 1-5 screenshots required

## Converted Screenshots

All screenshots in this directory have been converted to:
- **Size**: 1280x800
- **Format**: 24-bit PNG (no alpha channel)
- **Color**: sRGB

## Conversion Command

```bash
mogrify -resize 1280x800! -background white -alpha remove -alpha off -type TrueColor *.png
```

This command:
- Resizes to exactly 1280x800 (! forces exact dimensions)
- Removes alpha channel by flattening onto white background
- Ensures 24-bit TrueColor output
