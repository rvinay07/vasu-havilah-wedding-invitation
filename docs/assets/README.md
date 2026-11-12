# Wedding invitation assets

Use these relative paths so the website works unchanged on GitHub Pages.

## Images

Place all supplied photographs in `assets/images/`. Every photo should be exported in a **16:9 landscape ratio** and compressed for web use.

| File | Used for | Recommended export |
| --- | --- | --- |
| `hero.jpg` | Cinematic opening image | 1920 × 1080 px, JPG/WebP, ideally under 500 KB |
| `groom.jpg` | Groom portrait | 1600 × 900 px, JPG/WebP |
| `bride.jpg` | Bride portrait | 1600 × 900 px, JPG/WebP |
| `groom-parents.jpg` | Groom's family card | 1600 × 900 px, JPG/WebP |
| `bride-parents.jpg` | Bride's family card | 1600 × 900 px, JPG/WebP |
| `gallery-1.jpg` to `gallery-6.jpg` | Pre-wedding and family gallery | 1600 × 900 px, JPG/WebP |

The website will never distort these images. It uses `object-fit: cover`, so keep faces near the middle or update the matching `...Position` value in `index.html` if a crop needs adjustment.

## Music

Place a light, licensed instrumental track at:

`assets/music/wedding.mp3`

Use MP3 for broad mobile support. Music never autoplays; guests choose to play it with the floating music control.

## Optional video

Place a pre-wedding film at:

`assets/videos/wedding.mp4`

Use an H.264 MP4 in 16:9, ideally 1080p or lower and compressed for the web. To remove the section entirely, change `video` to an empty string in `weddingConfig`.

## Icons

`assets/icons/` is reserved for future optional custom SVG icons. The current website uses lightweight built-in symbols, so no icon files are required.

## Before publishing

- Use only photographs, music, and video you are permitted to share.
- Prefer lowercase filenames exactly as listed above.
- Test the final GitHub Pages link from a phone on mobile data.
