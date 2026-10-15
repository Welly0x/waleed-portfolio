import { Resvg } from '@resvg/resvg-js';
import fs from 'fs';
import path from 'path';

const svgPath = path.join(process.cwd(), 'public', 'me.svg');
const svg = fs.readFileSync(svgPath, 'utf8');

const resvg = new Resvg(svg, {
  fitTo: {
    mode: 'width',
    value: 1200,
  },
});

const pngData = resvg.render();
const pngBuffer = pngData.asPng();

fs.writeFileSync(path.join(process.cwd(), 'public', 'me.png'), pngBuffer);
fs.writeFileSync(path.join(process.cwd(), 'public', 'me.jpg'), pngBuffer);
console.log('Successfully rasterized me.svg to me.png and me.jpg (1200px width high res)');
