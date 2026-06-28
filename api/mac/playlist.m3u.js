
cat > api/mac/playlist.m3u.js << 'EOF'
export default async function handler(req, res) {
  try {
    const base = 'http://livebox.pro:80/c/';
    const user = '112233';
    const pass = '332211';

    // Get live streams from API
    const resp = await fetch(`${base}/player_api.php?username=${user}&password=${pass}&action=get_live_streams`);
    const data = await resp.json();
    
    let m3u = '#EXTM3U\n';
    
    if (data && Array.isArray(data)) {
      for (const ch of data) {
        const name = (ch.name || 'Unknown').replace(/,/g, '');
        const logo = ch.stream_icon || '';
        const id = ch.stream_id;
        if (!id) continue;
        
        m3u += `#EXTINF:-1 tvg-id="${id}" tvg-name="${name}" tvg-logo="${logo}" group-title="${ch.category_name || 'General'}",${name}\n`;
        m3u += `${base}/live/${user}/${pass}/${id}.ts\n`;
      }
    }

    res.setHeader('Content-Type', 'application/vnd.apple.mpegurl; charset=utf-8');
    res.setHeader('Content-Disposition', 'attachment; filename="playlist.m3u"');
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.send(m3u);

  } catch(e) {
    console.error(e);
    res.status(500).send('#EXTM3U\n#EXTINF:-1,Error fetching playlist\n');
  }
}
EOF
