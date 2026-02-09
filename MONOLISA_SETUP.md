# MonoLisa Font Setup

To integrate the MonoLisa font into your portfolio, please follow these steps:

## 1. Add MonoLisa Font Files

Place your MonoLisa font files in the `public/fonts/` directory. You'll need:

- `MonoLisa-Regular.ttf` (or .woff/.woff2)
- `MonoLisa-Bold.ttf` (or .woff/.woff2)
- `MonoLisa-Italic.ttf` (or .woff/.woff2)

## 2. Supported Font Formats

The project is configured to use these font formats in order of preference:
1. WOFF2 (recommended - smallest file size)
2. WOFF
3. TTF

If you have different font file formats, update the `@font-face` declarations in `app/globals.css`.

## 3. Update Font Declarations (if needed)

If your font files have different names, update the font-face declarations in `app/globals.css`:

```css
@font-face {
    font-family: 'MonoLisa';
    src: url('/fonts/YOUR-FONT-FILE-NAME.woff2') format('woff2'),
         url('/fonts/YOUR-FONT-FILE-NAME.woff') format('woff'),
         url('/fonts/YOUR-FONT-FILE-NAME.ttf') format('truetype');
    font-weight: normal;
    font-style: normal;
    font-display: swap;
}
```

## Font Already Configured

The MonoLisa font is already configured throughout the application:
- ✅ Layout updated to use MonoLisa
- ✅ Global CSS configured with font-face declarations
- ✅ Tailwind config updated
- ✅ All text elements will use MonoLisa by default

Once you add the font files to `public/fonts/`, the font will automatically load and apply to all text on your portfolio landing page!
