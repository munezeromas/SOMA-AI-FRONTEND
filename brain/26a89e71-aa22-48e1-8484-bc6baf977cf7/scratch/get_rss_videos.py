import urllib.request
import re
import json

url = "https://www.youtube.com/feeds/videos.xml?channel_id=UCCSm2s9wZC8B611SIslsUWg"
print(f"Fetching RSS feed from: {url}")

try:
    req = urllib.request.Request(
        url, 
        headers={'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)'}
    )
    with urllib.request.urlopen(req) as response:
        xml_content = response.read().decode('utf-8')
        
    print("Successfully read RSS feed. Parsing video IDs and titles...")
    
    # Simple regex to extract <yt:videoId>ID</yt:videoId> and <title>TITLE</title>
    # In YouTube RSS, the structure is:
    # <entry>
    #   <id>yt:video:VIDEO_ID</id>
    #   <yt:videoId>VIDEO_ID</yt:videoId>
    #   <title>TITLE</title>
    #   ...
    # </entry>
    
    entries = re.findall(r'<entry>.*?</entry>', xml_content, re.DOTALL)
    print(f"Found {len(entries)} video entries.")
    
    video_list = []
    for entry in entries:
        id_match = re.search(r'<yt:videoId>(.*?)</yt:videoId>', entry)
        title_match = re.search(r'<title>(.*?)</title>', entry)
        if id_match and title_match:
            v_id = id_match.group(1).strip()
            v_title = title_match.group(1).strip()
            
            # Clean HTML entities if any
            v_title = v_title.replace('&amp;', '&').replace('&quot;', '"').replace('&lt;', '<').replace('&gt;', '>')
            
            video_list.append({
                "id": v_id,
                "title": v_title
            })
            
    print(f"Parsed {len(video_list)} valid YouTube videos!")
    for v in video_list[:5]:
        print(f"  - {v['id']}: {v['title']}")
        
    # Save the parsed list
    with open("c:/Users/user/Desktop/SOMA-AI/brain/26a89e71-aa22-48e1-8484-bc6baf977cf7/scratch/scraped_youtube_videos.json", "w", encoding="utf-8") as f:
        json.dump(video_list, f, indent=2)
    print("Saved to scraped_youtube_videos.json")
    
except Exception as e:
    print(f"Error fetching RSS: {e}")
