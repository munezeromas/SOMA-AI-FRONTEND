import puppeteer from 'puppeteer';

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  page.on('console', msg => console.log('PAGE LOG:', msg.text()));
  page.on('pageerror', error => console.log('PAGE ERROR:', error.message));
  page.on('requestfailed', request => console.log('REQUEST FAILED:', request.url(), request.failure()?.errorText));
  
  try {
    const appUrl = process.env.APP_URL || 'http://localhost:5173';
    console.log('Navigating to:', `${appUrl}/student/tutor`);
    await page.goto(`${appUrl}/student/tutor`, { waitUntil: 'networkidle2' });
  } catch(e) {
    console.log('Nav error:', e);
  }
  
  await browser.close();
})();
