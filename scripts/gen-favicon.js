// Generate 512x512 PNG from SVG using @resvg/resvg-js
const { Resvg } = require('@resvg/resvg-js')
const fs = require('fs')
const path = require('path')

const svgPath = path.join(
  __dirname,
  '..',
  'content',
  'assets',
  'ramsbaby-j-512.svg'
)
const outPngPath = path.join(
  __dirname,
  '..',
  'content',
  'assets',
  'ramsbaby-j-512.png'
)

function main() {
  const svg = fs.readFileSync(svgPath, 'utf8')
  const resvg = new Resvg(svg, { fitTo: { mode: 'width', value: 512 } })
  const pngData = resvg.render().asPng()
  fs.writeFileSync(outPngPath, pngData)
  console.log('Wrote', outPngPath)
}

main()
