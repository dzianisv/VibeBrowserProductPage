# New session - 2026-02-20T04:37:47.829Z

**Session ID:** ses_386a90b4affetB8hwkLJETRIfk
**Created:** 2/19/2026, 8:37:47 PM
**Updated:** 2/19/2026, 8:41:23 PM

---

## User

Investigate why on vercel git lfs video are not displayed, even thought git lfs is enabled on vercel.

---

## Assistant (Code · openai/gpt-5.2)

_Thinking:_

We already confirmed production serves Git LFS pointer files (not real MP4 data), which means the Vercel build did not fetch LFS objects. Even with the Git LFS toggle enabled in Vercel settings, deployments can still skip LFS unless the build explicitly enables it.

Most reliable fix on Vercel is to set the environment variable `GIT_LFS_ENABLED=1` (for Production/Preview/Development) and redeploy. This forces Vercel to pull LFS objects during the checkout phase. After redeploy, the `/public/*.mp4` files should be real binaries and the video tag will render normally.

If that env var is already set, the remaining likely causes are:
1. The deployment is using a source archive (no LFS fetch) instead of a git clone.
2. The GitHub App lacks LFS permissions.
3. The LFS objects aren’t available in GitHub LFS (quota or upload issue).

**Next steps to validate:**
- In Vercel → Project Settings → Environment Variables, add `GIT_LFS_ENABLED=1` and redeploy.
- Check build logs for a line indicating LFS objects are being downloaded.
- Verify file content type after deploy with `curl -I https://vibebrowser.app/linkedin-demo.mp4` (should be `video/mp4` and not the LFS pointer text).

If you want, I can also document this requirement in `README.md`.

---
