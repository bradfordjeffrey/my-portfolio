// Resizes photos for the website.
//
// 1. Put your full-size photos (jpg, png, webp, tiff, avif) in client/photo-originals/
// 2. Run:  npm run photos   (from the client folder)
// 3. Web-ready copies are written to client/public/photography/ as .webp,
//    with the longest side at most MAX_SIZE px. The shape is never changed or cropped.
//
// Originals are left untouched (and are not committed to Git).
// Photos that were already converted are skipped unless the original is newer.

import { existsSync, mkdirSync, readdirSync, statSync } from 'node:fs'
import { basename, extname, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import sharp from 'sharp'

const MAX_SIZE = 1600 // px, longest side
const QUALITY = 80 // webp quality (0-100)

const inputDir = fileURLToPath(new URL('../photo-originals/', import.meta.url))
const outputDir = fileURLToPath(new URL('../public/photography/', import.meta.url))
const supported = new Set(['.jpg', '.jpeg', '.png', '.webp', '.tif', '.tiff', '.avif'])

mkdirSync(outputDir, { recursive: true })
if (!existsSync(inputDir)) {
  mkdirSync(inputDir, { recursive: true })
  console.log('Created client/photo-originals/. Put your photos there and run this again.')
  process.exit(0)
}

const files = readdirSync(inputDir).filter((f) => supported.has(extname(f).toLowerCase()))
if (files.length === 0) console.log('No photos found in client/photo-originals/.')

for (const file of files) {
  const input = join(inputDir, file)
  const output = join(outputDir, `${basename(file, extname(file))}.webp`)

  if (existsSync(output) && statSync(output).mtimeMs > statSync(input).mtimeMs) {
    console.log(`skip  ${file} (already done)`)
    continue
  }

  const info = await sharp(input)
    .rotate() // apply the camera's orientation so portrait photos stay upright
    .resize({ width: MAX_SIZE, height: MAX_SIZE, fit: 'inside', withoutEnlargement: true })
    .webp({ quality: QUALITY })
    .toFile(output)

  const before = (statSync(input).size / 1024 / 1024).toFixed(1)
  const after = (info.size / 1024).toFixed(0)
  console.log(`done  ${file} -> ${basename(output)}  ${info.width}x${info.height}  ${before} MB -> ${after} KB`)
}
