import { readFile, writeFile, mkdir, readdir, rm } from 'node:fs/promises';
import path from 'node:path';
const types={'.html':'text/html; charset=utf-8','.css':'text/css; charset=utf-8','.js':'text/javascript; charset=utf-8','.png':'image/png','.jpg':'image/jpeg','.svg':'image/svg+xml','.ico':'image/x-icon','.webp':'image/webp'};
const assets={};
async function collect(dir){for(const f of await readdir(dir,{withFileTypes:true})){const file=path.join(dir,f.name);if(f.isDirectory())await collect(file);else if(types[path.extname(file)]&&f.name!=='hero.png'){const url='/'+path.relative('public',file).split(path.sep).join('/');assets[url]={type:types[path.extname(file)],body:(await readFile(file)).toString('base64')}}}}
await collect('public');
await rm('dist',{recursive:true,force:true});
await mkdir('dist/server',{recursive:true});await mkdir('dist/.openai',{recursive:true});
await writeFile('dist/server/index.js','const ASSETS='+JSON.stringify(assets)+';\n'+await readFile('worker/index.js','utf8'));
await writeFile('dist/.openai/hosting.json',await readFile('.openai/hosting.json'));
console.log('Built Worker with '+Object.keys(assets).length+' embedded assets.');
