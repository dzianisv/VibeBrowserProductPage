---
name: content-video
description: Video conversion and hosting workflow using ffmpeg and git-lfs for Next.js/React projects
license: MIT
 compatibility: opencode
metadata:
  audience: developer
  workflow: video-production
---

# Content Video - Conversion & Hosting Guide

## Overview

This skill provides instructions for converting video files to web-optimized MP4 format and hosting them via git-lfs in a Next.js project.

## Workflow Summary

1. **Check for ffmpeg** - Ensure ffmpeg is installed
2. **Analyze source video** - Get video dimensions, duration, and quality
3. **Convert to MP4** - Use appropriate encoding settings
4. **Add to git-lfs** - Track and commit the video file
5. **Reference in code** - Use in video components

## Prerequisites

### Install ffmpeg (macOS)
```bash
brew install ffmpeg
```

### Verify installation
```bash
ffmpeg -version
ffprobe -version
```

## Step 1: Analyze Source Video

Before converting, check video properties:

```bash
ffprobe -i "/path/to/video.mov" 2>&1 | grep -E "Duration|Video|Audio|Stream|kb/s"
```

Key info to extract:
- **Resolution**: e.g., 2880x1800 (reduce for web)
- **Duration**: e.g., 00:00:12.38 (affects file size)
- **Bitrate**: e.g., 12602 kb/s (high = quality but large)
- **FPS**: e.g., 60 fps (can reduce to 30 for web)
- **Audio**: e.g., aac 44100 Hz stereo

## Step 2: Convert to Web-Optimized MP4

### Recommended Settings

**For screen recordings (primary use case):**
```bash
ffmpeg -i "/path/to/input.mov" \
  -vf "scale=1920:1200:force_original_aspect_ratio=decrease,pad=1920:1200:(ow-iw)/2:(oh-ih)/2" \
  -c:v libx264 -preset medium -crf 28 \
  -c:a aac -b:a 128k \
  -movflags +faststart \
  "/path/to/output.mp4" -y
```

**Explanation of flags:**
- `-vf scale=...` - Resizes to 1920x1200 max, maintains aspect ratio with padding
- `-c:v libx264` - H.264 encoding (broad browser support)
- `-preset medium` - Balance between speed and compression
- `-crf 28` - Constant Rate Factor (lower = better quality, 23-28 is good range)
- `-c:a aac -b:a 128k` - AAC audio at 128kbps
- `-movflags +faststart` - Enables streaming/buffering for web
- `-y` - Overwrites output without asking

### Alternative: Higher Quality
```bash
ffmpeg -i "/path/to/input.mov" \
  -vf "scale=1920:1080:force_original_aspect_ratio=decrease" \
  -c:v libx264 -preset slow -crf 23 \
  -c:a aac -b:a 192k \
  -movflags +faststart \
  "/path/to/output.mp4" -y
```

### Alternative: Smaller File (faster load)
```bash
ffmpeg -i "/path/to/input.mov" \
  -vf "scale=1280:720:force_original_aspect_ratio=decrease" \
  -c:v libx264 -preset fast -crf 30 \
  -c:a aac -b:a 96k \
  -movflags +faststart \
  "/path/to/output.mp4" -y
```

## Step 3: Check Output Size

```bash
ls -lh /path/to/output.mp4
```

Target: Under 1MB for quick loading, under 5MB is acceptable.

## Step 4: Add to Git LFS

### Check if already tracking
```bash
git lfs ls-files
```

### Track mp4 files (if not already)
```bash
git lfs track "*.mp4"
```

### Add and commit
```bash
git add path/to/video.mp4
git commit -m "Add demo video: [description]"
git push
```

### Verify
```bash
git lfs ls-files
```

Should show `* path/to/video.mp4`

## Step 5: Use in Next.js/React

### Video component pattern (from landing-page.tsx)
```tsx
<video
  ref={videoRef}
  key={currentDemo}
  className="absolute inset-0 w-full h-full object-cover"
  autoPlay
  loop
  muted
  playsInline
  preload="auto"
  src={`${videoSrc}.mp4`}
>
  Your browser does not support the video tag.
</video>
```

### In page config (for profession templates)
```tsx
demos: [
  {
    id: 'demo-name',
    title: 'Demo Title',
    subtitle: 'Demo subtitle',
    description: 'Demo description',
    badges: ['Tag1', 'Tag2'],
    videoSrc: '/demo-video',  // No .mp4 extension
  },
],
```

## Best Practices

1. **Keep videos short**: Under 30 seconds for demos
2. **Mute by default**: Always use `muted` for autoplay
3. **Add playsInline**: Required for iOS
4. **Use loop**: For continuous demo playback
5. **Add faststart**: Enables progressive loading
6. **Maintain aspect ratio**: Use scale+pad, not just scale

## Troubleshooting

### Video won't autoplay
- Ensure `muted` attribute is present
- Some browsers require `playsInline` for mobile

### Video shows black
- Check that `-c:v libx264` encoding succeeded
- Verify file exists: `ls -la /path/to/video.mp4`

### Large file size
- Increase CRF value (e.g., 28 → 32)
- Reduce resolution
- Reduce FPS with `-r 30`

### Git LFS not tracking
- Ensure you're in git repo root
- Check .gitattributes: `cat .gitattributes`

## Quick Reference

| Task | Command |
|------|---------|
| Check video info | `ffprobe -i file.mov 2>&1` |
| Convert to MP4 | `ffmpeg -i file.mov -c:v libx264 -crf 28 -c:a aac file.mp4 -y` |
| Track with LFS | `git lfs track "*.mp4"` |
| List LFS files | `git lfs ls-files` |
