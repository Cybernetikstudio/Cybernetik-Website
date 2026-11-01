import http from 'node:http';
import {mkdir,readFile,readdir} from 'node:fs/promises';
import {DatabaseSync} from 'node:sqlite';
import worker from '../dist/server/index.js';
await mkdir('.local',{recursive:true});const db=new DatabaseSync('.local/preview.sqlite');
// Apply the generated initial migration to this disposable local preview only.
const exists=db.prepare("SELECT name FROM sqlite_master WHERE name='demo_requests'").get();
if(!exists)for(const file of (await readdir('drizzle')).filter(f=>f.endsWith('.sql')).sort())db.exec(await readFile('drizzle/'+file,'utf8'));
const env={DB:{prepare(sql){return {bind(...values){return {run(){return db.prepare(sql).run(...values)}}}}}}};
http.createServer(async(req,res)=>{try{const chunks=[];for await(const c of req)chunks.push(c);const body=Buffer.concat(chunks);const request=new Request('http://127.0.0.1:8765'+req.url,{method:req.method,headers:req.headers,...(['GET','HEAD'].includes(req.method)?{}:{body})});const result=await worker.fetch(request,env);res.writeHead(result.status,Object.fromEntries(result.headers));res.end(Buffer.from(await result.arrayBuffer()))}catch{res.writeHead(500);res.end('Preview error')}}).listen(8765,'127.0.0.1',()=>console.log('Local: http://127.0.0.1:8765'));
