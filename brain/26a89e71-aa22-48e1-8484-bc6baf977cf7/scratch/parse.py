import re
import json
import hashlib

def clean_original_title(title):
    # Keep the original title but clean up double/triple spaces and strip leading/trailing whitespace
    res = re.sub(r'\s+', ' ', title)
    res = res.strip()
    return res

def parse_videos():
    with open("c:/Users/user/Desktop/SOMA-AI/brain/26a89e71-aa22-48e1-8484-bc6baf977cf7/scratch/videos_raw.txt", "r", encoding="utf-8") as f:
        content = f.read()
    
    lines = [line.strip() for line in content.split("\n")]
    
    videos = []
    i = 0
    while i < len(lines):
        line = lines[i]
        if not line:
            i += 1
            continue
        
        # Check if line looks like duration: e.g. "9:45" or "10:38" or "28:13" or "1:37"
        if re.match(r'^\d+:\d+$', line):
            duration = line
            # Next line should be title
            if i + 1 < len(lines):
                title = lines[i+1]
                # Search forward for views and time ago
                views = ""
                time_ago = ""
                idx = i + 2
                while idx < len(lines) and idx < i + 10:
                    if "views" in lines[idx]:
                        views = lines[idx]
                        if idx + 2 < len(lines):
                            time_ago = lines[idx+2]
                        break
                    idx += 1
                
                videos.append({
                    "duration": duration,
                    "title": title,
                    "views": views,
                    "time_ago": time_ago
                })
                i = idx + 3
                continue
        i += 1
        
    print(f"Parsed {len(videos)} raw videos.")
    
    # Filter and classify P1 to P6
    classified = []
    
    # default subjects: ["Math", "English", "Science", "Kinyarwanda", "Social"]
    for v in videos:
        title = v["title"]
        title_lower = title.lower()
        raw_duration = v["duration"]
        raw_views = v["views"]
        
        # Extract level (P1-P6)
        level = None
        m_level = re.search(r'\b(P[1-6])\b', title, re.IGNORECASE)
        m_ph_level = re.search(r'\b(PH[1-6])\b', title, re.IGNORECASE)
        m_p_slash = re.search(r'/P([1-6])/', title, re.IGNORECASE)
        m_p_spaced = re.search(r'\|\s*P([1-6])\s*\|', title, re.IGNORECASE)
        m_umwaka = re.search(r'umwaka wa\s*([1-6])', title_lower)
        
        if m_level:
            level = m_level.group(1).upper()
        elif m_ph_level:
            level = "P" + m_ph_level.group(1)[2]
        elif m_p_slash:
            level = "P" + m_p_slash.group(1)
        elif m_p_spaced:
            level = "P" + m_p_spaced.group(1)
        elif m_umwaka:
            level = "P" + m_umwaka.group(1)
        
        # If no level found in title, let's check for specific indicators or skip
        if not level:
            continue
            
        # Determine subject
        subject = "Other"
        
        # Check Kinyarwanda vocabulary first to match Kinyarwanda lessons
        kiny_keywords = [
            "kinyarwanda", "ikinyarwanda", "umuvugo", "inkuru", "ururimi", "umwandiko", 
            "ibihekane", "inyuguti", "inyajwi", "ingombajwi", "ruswa", "imigani", 
            "insigamigani", "igisakuzo", "umwiza", "keza", "bwiza", "ishuri", "ababyeyi",
            "inyamaswa", "umuryango", "inzozi", "nkunda", "imitako", "gukina", "gahunda",
            "urugendo", "uburenganzira", "umutungo", "kwirinda", "biruta", "kwivuza",
            "isuku", "amazi", "isoko", "ubuzima", "umuganura", "imirimo", "akarabo",
            "ikibariko", "umugano"
        ]
        
        if any(w in title_lower for w in ["math", "mathematics", "imibare", "counting", "addition", "subtraction", "multiplication", "division", "fraction", "numbers", "lcm", "gcf", "ratio", "proportion", "inequalities", "equations"]):
            subject = "Math"
        elif any(w in title_lower for w in ["english", "eng", "alphabet", "adventures of mwiza", "greetings", "reading", "possessives", "nouns", "adjectives", "verbs", "daily routine", "pronoun", "connectors", "preposition", "vocabulary", "sentences", "folktales", "lost boy", "magic bag"]):
            subject = "English"
        elif any(w in title_lower for w in ["set", "science", "elementary technology", "plant", "animal", "water", "wind", "soil", "electricity", "computer", "biology", "physics", "digestive", "sensory", "eyes", "ear", "nose", "tongue", "respiratory", "circulatory", "wastes", "environment", "biogas", "cells", "organs"]):
            subject = "Science"
        elif any(w in title_lower for w in ["social", "sst", "social studies", "history", "geography", "civics", "governance", "public property", "sector", "district", "province", "transport", "communication", "infrastructure", "leaders", "national flag", "court meeting", "historical events"]):
            subject = "Social"
        elif any(w in title_lower for w in kiny_keywords):
            subject = "Kinyarwanda"
        elif any(w in title_lower for w in ["creative art", "creative arts", "ca", "drawing", "painting", "embroidery", "weaving", "molding", "music", "songs", "puppet", "puppetry", "drums"]):
            subject = "Social"
        elif any(w in title_lower for w in ["pe", "physical", "movement", "coordination", "ball", "skipping", "circle", "football", "volleyball", "basketball"]):
            subject = "Science"
            
        if subject == "Other":
            if any(char in title_lower for char in ["sh", "gw", "jw", "rw", "nz", "mw", "nt"]):
                subject = "Kinyarwanda"
            else:
                subject = "Science"
            
        m = re.match(r'^(\d+):(\d+)$', raw_duration)
        duration_formatted = "10m"
        if m:
            minutes = int(m.group(1))
            duration_formatted = f"{minutes}m"
            
        teacher_rec = False
        if "k views" in raw_views:
            m_v = re.search(r'([\d.]+)\s*k\s*views', raw_views)
            if m_v:
                val = float(m_v.group(1))
                if val > 8.0:
                    teacher_rec = True
        
        h = hashlib.md5(title.encode('utf-8')).hexdigest()[:11]
        
        cleaned = clean_original_title(title)
        
        classified.append({
            "id": h,
            "title": cleaned,
            "subject": subject,
            "level": level,
            "duration": duration_formatted,
            "teacherRecommended": teacher_rec
        })
        
    print(f"Filtered to {len(classified)} primary videos.")
    
    with open("c:/Users/user/Desktop/SOMA-AI/brain/26a89e71-aa22-48e1-8484-bc6baf977cf7/scratch/classified_videos.json", "w", encoding="utf-8") as f:
        json.dump(classified, f, indent=2)

if __name__ == "__main__":
    parse_videos()
