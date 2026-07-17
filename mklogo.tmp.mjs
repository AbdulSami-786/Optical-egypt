import puppeteer from 'puppeteer-core'

// Renders a TEMPORARY stand-in logo at roughly the real logo's proportions
// (round glasses above an Arabic wordmark, square-ish) purely to check that the
// header/footer layout holds once a real file is present. Deleted afterwards.
const html = `<html><body style="margin:0;width:600px;height:560px;background:#fff;display:flex;flex-direction:column;align-items:center;justify-content:center;font-family:'Segoe UI',Tahoma,sans-serif">
<svg width="440" height="300" viewBox="0 0 220 150">
  <g fill="none" stroke="#111" stroke-width="7">
    <circle cx="58" cy="72" r="46"/><circle cx="162" cy="72" r="46"/>
    <path d="M110 68c-4-5-8-5-12 0M12 56 4 50M208 56l8-6" stroke-linecap="round"/>
  </g>
  <circle cx="58" cy="72" r="26" fill="#c8102e"/><circle cx="162" cy="72" r="26" fill="#c8102e"/>
  <circle cx="50" cy="64" r="9" fill="#fff"/><circle cx="154" cy="64" r="9" fill="#fff"/>
</svg>
<div style="color:#c8102e;font-size:54px;direction:rtl;margin-top:16px">العالمية للنظارات</div>
</body></html>`

const b = await puppeteer.launch({
  executablePath: 'C:/Program Files/Google/Chrome/Application/chrome.exe',
  headless: 'new',
  args: ['--no-sandbox'],
})
const p = await b.newPage()
await p.setViewport({ width: 600, height: 560, deviceScaleFactor: 2 })
await p.setContent(html, { waitUntil: 'load' })
await new Promise((r) => setTimeout(r, 600))
await p.screenshot({ path: 'public/logo.png' })
await b.close()
console.log('wrote placeholder public/logo.png')
