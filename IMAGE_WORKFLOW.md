Image optimization workflow

1. Install dependencies (on your machine):

```bash
npm install
```

2. Run the optimizer to produce normalized WebP images in `assets/images/normalized`:

```bash
npm run optimize-images
```

Notes:
- The script uses `sharp` to convert images to WebP and resize to a max width of 1200px.
- Originals are left untouched; optimized files are written to `assets/images/normalized/`.
- After verifying the generated images, you can update HTML `src` paths to point to `assets/images/normalized/<file>.webp` (the script provides normalized lower-case, hyphenated filenames).
- The script intentionally does not auto-rewrite HTML to avoid accidental breakage; I can add an optional `--rewrite-html` flag that updates HTML files if you want.
