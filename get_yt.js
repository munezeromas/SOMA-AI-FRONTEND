const fs = require('fs');

async function getIds() {
  console.log("Fetching youtube...");
  const res = await fetch("https://www.youtube.com/results?search_query=math+antics+fractions");
  const text = await res.text();
  const ids = [...text.matchAll(/watch\?v=([a-zA-Z0-9_-]{11})/g)].map(m => m[1]);
  const uniqueIds = [...new Set(ids)].slice(0, 5);
  console.log("Math:", uniqueIds);
}
getIds();
