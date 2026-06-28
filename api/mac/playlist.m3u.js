import fetch from 'node-fetch';
export default async function handler(req, res) {
  try {
    const resp = await fetch('http://4kgood.org/get.php?username=9680723188&password=kyft6ks0g7gr7uw0xio6&type=m3u_plus&output=ts', { headers: { 'User-Agent': 'Mozilla/5.0' } });
    let text = await resp.text();
    const base = 'https://' + req.headers.host;
    text = text.replace(/https?:\/\/[^\s"';,\r\n]+/g, m => base + '/stream?url=' + Buffer.from(m).toString('base64url'));
    res.setHeader('Content-Type', 'application/vnd.apple.mpegurl');
    res.send(text);
  } catch(e) { res.status(500).send('#EXTM3U\n#EXTINF:-1,Error\n'); }
}
