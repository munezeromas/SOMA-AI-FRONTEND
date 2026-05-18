import scrapetube
import json

channel_id = "UCCSm2s9wZC8B611SIslsUWg"
print("Starting to fetch videos from REB eLearning YouTube channel...")

try:
    videos = scrapetube.get_channel(channel_id)
    video_list = []
    count = 0
    
    for video in videos:
        try:
            video_id = video.get("videoId")
            # Parse title safely
            title = ""
            title_data = video.get("title", {})
            if isinstance(title_data, dict):
                runs = title_data.get("runs", [])
                if runs and isinstance(runs, list):
                    title = runs[0].get("text", "")
                else:
                    title = title_data.get("accessibility", {}).get("accessibilityData", {}).get("label", "")
            elif isinstance(title_data, str):
                title = title_data
                
            if video_id and title:
                video_list.append({
                    "id": video_id,
                    "title": title
                })
                count += 1
                if count % 50 == 0:
                    print(f"Fetched {count} videos...")
                if count >= 300: # We fetch 300 working videos to map
                    break
        except Exception as e:
            print(f"Error parsing video: {e}")
            continue
            
    print(f"Successfully fetched {len(video_list)} videos from YouTube channel!")
    
    # Save the scraped list
    with open("c:/Users/user/Desktop/SOMA-AI/brain/26a89e71-aa22-48e1-8484-bc6baf977cf7/scratch/scraped_youtube_videos.json", "w", encoding="utf-8") as f:
        json.dump(video_list, f, indent=2)
    print("Saved to scraped_youtube_videos.json")
    
except Exception as e:
    print(f"Error fetching channel: {e}")
