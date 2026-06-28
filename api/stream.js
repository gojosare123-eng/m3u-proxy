import fetch from 'node-fetch';
export default async function handler(req, res) {
  try {
    const url = Buffer.from(req.query.url, 'base64url').toString();
    const resp = await fetch(url, { headers: { 'User-Agent': 'Mozilla/5.0' } });
    resp.headers.forEach((v, k) => { if(k==='content-type') res.setHeader(k, v); });
    res.setHeader('Access-Control-Allow-Origin', '*');
    resp.body.pipe(res);
  } catch(e) { res.status(500).send('error'); }
}
