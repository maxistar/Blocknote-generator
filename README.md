# Blocknote Generator

A small web app to generate printable **A6 blocknote pages** as PDF.

It creates A4 sheets with 4 A6 sections and supports these page styles:
- Lines (ruled)
- Grid (squares)
- Dots (dot grid)
- Blank

You can also toggle **cutting rulers** on/off before exporting.

## Live Version

- https://blocknote.maxistar.me

## How to use

1. Select pattern type
2. Set number of pages
3. (Optional) Toggle `Show cutting rulers`
4. Click **Generate PDF**
5. Print on A4 and cut into A6 sheets

## 3D-printable notebook covers

If you want a full printed notebook setup, STL files for A6 covers are here:

- https://www.printables.com/model/1436723-a6-printed-notebook

## Development

```bash
npm install
npm run dev
```

Build for production:

```bash
npm run build
```
