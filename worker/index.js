const json = (body, status=200) => Response.json(body, {status, headers:{'Cache-Control':'no-store'}});
export default {
 async fetch(request, env) {
  const url=new URL(request.url);
  if(url.pathname==='/api/demo-requests') {
   if(request.method!=='POST') return json({error:'Method not allowed'},405);
   if(request.headers.get('Origin')!==url.origin) return json({error:'Request not allowed'},403);
   if(!request.headers.get('Content-Type')?.startsWith('application/json')) return json({error:'Expected JSON'},415);
   if(Number(request.headers.get('Content-Length')||0)>2048) return json({error:'Request too large'},413);
   try {
    const reader=request.body?.getReader(); if(!reader)return json({error:'Missing request'},400);
    const chunks=[];let size=0;
    while(true){const {done,value}=await reader.read();if(done)break;size+=value.byteLength;if(size>2048){await reader.cancel();return json({error:'Request too large'},413)}chunks.push(value)}
    const bytes=new Uint8Array(size);let offset=0;for(const chunk of chunks){bytes.set(chunk,offset);offset+=chunk.length}
    let data;try{data=JSON.parse(new TextDecoder().decode(bytes))}catch{return json({error:'Invalid request'},400)}
    if(!data||typeof data!=='object')return json({error:'Invalid request'},400);
    if(data.website) return json({ok:true});
    const email=typeof data.email==='string'?data.email.trim().toLowerCase():'';
    if(email.length>254||! /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))return json({error:'Please enter a valid email address.'},400);
    await env.DB.prepare('INSERT INTO demo_requests (email, requested_at, source) VALUES (?, ?, ?) ON CONFLICT(email) DO NOTHING').bind(email,new Date().toISOString(),'landing-page-demo').run();
    return json({ok:true},201);
   } catch {return json({error:'Your request could not be saved. Please try again.'},503)}
  }
  if(!['GET','HEAD'].includes(request.method))return new Response('Method not allowed',{status:405});
  const path=url.pathname==='/'?'/index.html':url.pathname;
  const asset=ASSETS[path];
  if(!asset)return new Response('Not found',{status:404});
  const headers={'Content-Type':asset.type,'Cache-Control':path.endsWith('.html')?'no-cache':'public, max-age=300','X-Content-Type-Options':'nosniff'};
  return new Response(request.method==='HEAD'?null:Uint8Array.from(atob(asset.body),c=>c.charCodeAt(0)),{headers});
 }
};
