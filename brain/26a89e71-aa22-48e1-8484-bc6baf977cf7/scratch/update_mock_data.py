import re
import json
import requests

# ─────────────────────────────────────────────
#  ORIGINAL VIDEOS  (duplicate ID fixed)
#  3zsNom7t8bI was used twice — corrected below
# ─────────────────────────────────────────────

ORIGINAL_VIDEOS = [
  # ── MATH ──────────────────────────────────
  { "id": "3zsNom7t8bI",  "title": "Fractions for Beginners",                   "subject": "Math",        "level": "P3", "duration": "9m",  "teacherRecommended": True  },
  { "id": "eW2dRLyVMUQ",  "title": "Multiplication Tables 1–10",                "subject": "Math",        "level": "P2", "duration": "10m", "teacherRecommended": True  },
  { "id": "n0JKmTWH1is",  "title": "What Are Fractions? (Math Antics)",         "subject": "Math",        "level": "P4", "duration": "10m", "teacherRecommended": True  },  # ✅ Fixed duplicate
  { "id": "dpzMKV3UeCQ",  "title": "Basic Multiplication (Math Antics)",        "subject": "Math",        "level": "P3", "duration": "11m", "teacherRecommended": False },
  { "id": "q3M31bX2Vsg",  "title": "Long Division (Math Antics)",               "subject": "Math",        "level": "P5", "duration": "11m", "teacherRecommended": True  },
  { "id": "NybHckSEQBI",  "title": "Intro to Algebra (Math Antics)",            "subject": "Math",        "level": "P6", "duration": "12m", "teacherRecommended": True  },
  { "id": "JeVSmq1Nrpw",  "title": "What Are Percentages? (Math Antics)",       "subject": "Math",        "level": "P5", "duration": "10m", "teacherRecommended": False },
  { "id": "ViAmQivKif0",  "title": "Counting to 100 (Numberblocks)",            "subject": "Math",        "level": "P1", "duration": "7m",  "teacherRecommended": True  },
  { "id": "yMc8217w9v4",  "title": "Addition & Subtraction for Kids",           "subject": "Math",        "level": "P2", "duration": "8m",  "teacherRecommended": False },

  # ── NEW MATH ───────────────────────────────
  { "id": "OXi4G2O1LvU",  "title": "Place Value (Math Antics)",                 "subject": "Math",        "level": "P3", "duration": "8m",  "teacherRecommended": True  },
  { "id": "2VhdF-UUKQE",  "title": "Ratios & Proportions (Math Antics)",        "subject": "Math",        "level": "P6", "duration": "10m", "teacherRecommended": True  },
  { "id": "UQCqMbNNNyE",  "title": "What Is Geometry? (Math Antics)",           "subject": "Math",        "level": "P5", "duration": "9m",  "teacherRecommended": True  },
  { "id": "nTm9h9-vaaE",  "title": "Telling Time for Kids",                     "subject": "Math",        "level": "P2", "duration": "6m",  "teacherRecommended": True  },
  { "id": "C9QfFDFLVaA",  "title": "Shapes and Patterns for Kids",              "subject": "Math",        "level": "P1", "duration": "5m",  "teacherRecommended": False },
  { "id": "BFAxBnzpfaU",  "title": "Decimals for Kids (Math Antics)",           "subject": "Math",        "level": "P5", "duration": "9m",  "teacherRecommended": True  },
  { "id": "F5FAlgcfD9E",  "title": "Area and Perimeter (Math Antics)",          "subject": "Math",        "level": "P4", "duration": "10m", "teacherRecommended": True  },
  { "id": "AuX7nPBqDCM",  "title": "Order of Operations – BODMAS",              "subject": "Math",        "level": "P6", "duration": "8m",  "teacherRecommended": True  },

  # ── SCIENCE ───────────────────────────────
  { "id": "D1Ymc311XS8",  "title": "Photosynthesis Explained (SciShow Kids)",   "subject": "Science",     "level": "P4", "duration": "5m",  "teacherRecommended": True  },
  { "id": "ncORPosDrjI",  "title": "The Water Cycle (SciShow Kids)",            "subject": "Science",     "level": "P3", "duration": "5m",  "teacherRecommended": True  },
  { "id": "F2prtmPEjOc",  "title": "The Solar System (Crash Course Kids)",      "subject": "Science",     "level": "P5", "duration": "8m",  "teacherRecommended": True  },
  { "id": "Pasru_D5Z10",  "title": "Food Chains Explained (SciShow Kids)",      "subject": "Science",     "level": "P4", "duration": "5m",  "teacherRecommended": False },
  { "id": "Uf76pThNXZc",  "title": "Electricity for Kids (FreeSchool)",         "subject": "Science",     "level": "P5", "duration": "9m",  "teacherRecommended": True  },
  { "id": "JQ4WduVp9k4",  "title": "States of Matter for Kids",                 "subject": "Science",     "level": "P3", "duration": "6m",  "teacherRecommended": False },
  { "id": "gEUu-A2gBSE",  "title": "Human Body Systems (SciShow Kids)",         "subject": "Science",     "level": "P5", "duration": "6m",  "teacherRecommended": True  },
  { "id": "WgHmqv_-UbQ",  "title": "Why Do We Have Seasons? (TED-Ed)",          "subject": "Science",     "level": "P4", "duration": "5m",  "teacherRecommended": True  },

  # ── NEW SCIENCE ────────────────────────────
  { "id": "RnvCbquYeIM",  "title": "Cells for Kids (SciShow Kids)",             "subject": "Science",     "level": "P4", "duration": "5m",  "teacherRecommended": True  },
  { "id": "XgZMpw6XDjE",  "title": "Volcanoes 101 (Nat Geo)",                   "subject": "Science",     "level": "P5", "duration": "3m",  "teacherRecommended": True  },
  { "id": "VY7G4BEj0es",  "title": "What Is Weather? (SciShow Kids)",           "subject": "Science",     "level": "P3", "duration": "4m",  "teacherRecommended": False },
  { "id": "jAhjPd4MD7E",  "title": "Ecosystems for Kids (FreeSchool)",          "subject": "Science",     "level": "P4", "duration": "6m",  "teacherRecommended": True  },
  { "id": "MmDnrAz4tSg",  "title": "Gravity Explained for Students (TED-Ed)",   "subject": "Science",     "level": "P6", "duration": "5m",  "teacherRecommended": True  },
  { "id": "7TGSbot_5wE",  "title": "Magnets and Magnetism for Kids",            "subject": "Science",     "level": "P3", "duration": "5m",  "teacherRecommended": False },
  { "id": "v95OIzMkzEE",  "title": "The Rock Cycle (Crash Course Kids)",        "subject": "Science",     "level": "P5", "duration": "6m",  "teacherRecommended": True  },
  { "id": "OHo7fPjGAf4",  "title": "Living vs Non-Living Things (SciShow Kids)","subject": "Science",     "level": "P2", "duration": "4m",  "teacherRecommended": True  },

  # ── ENGLISH ───────────────────────────────
  { "id": "hq3yfQnllfQ",  "title": "Alphablocks – Learn to Read (P1)",          "subject": "English",     "level": "P1", "duration": "24m", "teacherRecommended": True  },
  { "id": "75p-N9YKqNo",  "title": "Nouns, Verbs & Adjectives (Schoolhouse Rock)","subject": "English",   "level": "P3", "duration": "10m", "teacherRecommended": True  },
  { "id": "LdCOswQLOUU",  "title": "Punctuation Song for Kids",                 "subject": "English",     "level": "P3", "duration": "4m",  "teacherRecommended": False },
  { "id": "3v8TTiobAnI",  "title": "Short Stories for Kids – Storyline Online", "subject": "English",     "level": "P2", "duration": "18m", "teacherRecommended": True  },
  { "id": "OWJCflt6CYA",  "title": "English Vocabulary – British Council Kids", "subject": "English",     "level": "P4", "duration": "7m",  "teacherRecommended": True  },
  { "id": "h4QEzJEgntc",  "title": "Parts of Speech Explained",                 "subject": "English",     "level": "P5", "duration": "8m",  "teacherRecommended": False },

  # ── NEW ENGLISH ────────────────────────────
  { "id": "Haz2D_jAzOE",  "title": "How to Write a Paragraph",                  "subject": "English",     "level": "P5", "duration": "6m",  "teacherRecommended": True  },
  { "id": "Sz_1gg7fKZk",  "title": "Compound Words for Kids",                   "subject": "English",     "level": "P3", "duration": "5m",  "teacherRecommended": False },
  { "id": "L4lNHMtGkyM",  "title": "Reading Comprehension Strategies",          "subject": "English",     "level": "P5", "duration": "7m",  "teacherRecommended": True  },
  { "id": "3OkwVtGnPyw",  "title": "Synonyms and Antonyms for Kids",            "subject": "English",     "level": "P4", "duration": "5m",  "teacherRecommended": True  },
  { "id": "vdXdxT_nNOw",  "title": "How to Write a Story (KidsAcademy)",        "subject": "English",     "level": "P4", "duration": "6m",  "teacherRecommended": False },
  { "id": "YtCDr2wQB9o",  "title": "Silent Letters in English",                 "subject": "English",     "level": "P5", "duration": "5m",  "teacherRecommended": True  },
  { "id": "TUL0T03Ypbk",  "title": "Phonics – Long and Short Vowels",           "subject": "English",     "level": "P2", "duration": "8m",  "teacherRecommended": True  },

  # ── KINYARWANDA ───────────────────────────
  { "id": "YFzwirfeEiI",  "title": "Kinyarwanda Language Basics",               "subject": "Kinyarwanda", "level": "P2", "duration": "10m", "teacherRecommended": True  },
  { "id": "D3-MkKBhFWA",  "title": "Ubongo Kids – Swahili & Rwanda Stories",    "subject": "Kinyarwanda", "level": "P1", "duration": "12m", "teacherRecommended": True  },
  { "id": "aekTVaRhAD4",  "title": "Akili and Me – African Education (P1–P3)",  "subject": "Kinyarwanda", "level": "P1", "duration": "15m", "teacherRecommended": True  },
  { "id": "9Yf9nGWqyDs",  "title": "Imigani – Rwandan Proverbs & Stories",      "subject": "Kinyarwanda", "level": "P4", "duration": "8m",  "teacherRecommended": False },

  # ── NEW KINYARWANDA ────────────────────────
  { "id": "sFPnJjhQMqQ",  "title": "Kinyarwanda Alphabet Song",                 "subject": "Kinyarwanda", "level": "P1", "duration": "4m",  "teacherRecommended": True  },
  { "id": "Cg4dTpR07OE",  "title": "Ubongo Kids – Numbers in Kinyarwanda",      "subject": "Kinyarwanda", "level": "P2", "duration": "10m", "teacherRecommended": True  },
  { "id": "GwNXt8VWDDE",  "title": "Rwandan Culture and Traditions for Kids",   "subject": "Kinyarwanda", "level": "P3", "duration": "9m",  "teacherRecommended": True  },
  { "id": "qVkMOIQGj0s",  "title": "Imigongo Art & Rwandan Heritage",           "subject": "Kinyarwanda", "level": "P5", "duration": "7m",  "teacherRecommended": False },
  { "id": "P5tA3ZNKmj8",  "title": "Inzira z'ubuzima – Health in Kinyarwanda",  "subject": "Kinyarwanda", "level": "P4", "duration": "6m",  "teacherRecommended": True  },

  # ── SOCIAL STUDIES ────────────────────────
  { "id": "Yocja_N5s2I",  "title": "History of Rwanda (Overview)",              "subject": "Social",      "level": "P6", "duration": "14m", "teacherRecommended": True  },
  { "id": "Kz69f1V9qLI",  "title": "Geography of Africa for Kids",              "subject": "Social",      "level": "P5", "duration": "10m", "teacherRecommended": True  },
  { "id": "O3tY1T6598c",  "title": "How Governments Work – Simple",             "subject": "Social",      "level": "P6", "duration": "9m",  "teacherRecommended": False },
  { "id": "mOJlg8g8_yw",  "title": "Geopolitics of East Africa",                "subject": "Social",      "level": "P6", "duration": "12m", "teacherRecommended": True  },
  { "id": "A2w589bO3uM",  "title": "Ancient Civilizations for Students",        "subject": "Social",      "level": "P5", "duration": "11m", "teacherRecommended": False },

  # ── NEW SOCIAL STUDIES ─────────────────────
  { "id": "1KNJkbAb3mA",  "title": "Map Skills for Kids – Reading Maps",        "subject": "Social",      "level": "P3", "duration": "7m",  "teacherRecommended": True  },
  { "id": "sDqFG7EBXoA",  "title": "Communities Around the World (P2–P3)",      "subject": "Social",      "level": "P2", "duration": "6m",  "teacherRecommended": True  },
  { "id": "TS1oVmURRY0",  "title": "African Countries and Capitals",            "subject": "Social",      "level": "P5", "duration": "8m",  "teacherRecommended": False },
  { "id": "z7y4_b-tGHc",  "title": "Human Rights for Kids (TED-Ed)",            "subject": "Social",      "level": "P6", "duration": "5m",  "teacherRecommended": True  },
  { "id": "YTFQ8Bsep6E",  "title": "The United Nations Explained for Students", "subject": "Social",      "level": "P6", "duration": "7m",  "teacherRecommended": True  },
  { "id": "lPqCZtN_Omo",  "title": "Rwanda: Umuganda & Community Service",      "subject": "Social",      "level": "P4", "duration": "6m",  "teacherRecommended": True  },
  { "id": "V5xCFkQ5tVo",  "title": "Climate Zones of Africa",                   "subject": "Social",      "level": "P5", "duration": "8m",  "teacherRecommended": False },
]


# ─────────────────────────────────────────────
#  OPTIONAL: YouTube Data API v3 availability checker
#  Set your API key to use this feature.
#  Get a free key at: https://console.cloud.google.com/
# ─────────────────────────────────────────────

YOUTUBE_API_KEY = ""  # ← paste your API key here to enable


def check_videos_available(videos, api_key):
    """
    Checks which video IDs are still live on YouTube using the Data API v3.
    Returns a dict of {video_id: True/False}.
    Batches up to 50 IDs per request.
    """
    if not api_key:
        print("⚠️  No API key set — skipping availability check.")
        return {}

    ids = list({v["id"] for v in videos})  # deduplicate
    results = {}

    for i in range(0, len(ids), 50):
        batch = ids[i:i+50]
        url = (
            "https://www.googleapis.com/youtube/v3/videos"
            f"?part=status&id={','.join(batch)}&key={api_key}"
        )
        resp = requests.get(url, timeout=10).json()
        found_ids = {item["id"] for item in resp.get("items", [])}
        for vid_id in batch:
            results[vid_id] = vid_id in found_ids

    unavailable = [vid_id for vid_id, ok in results.items() if not ok]
    print(f"\n📺 Availability check complete.")
    print(f"   ✅ Available : {sum(results.values())}")
    print(f"   ❌ Unavailable: {len(unavailable)}")
    if unavailable:
        print(f"   Dead IDs: {unavailable}")
    return results


# ─────────────────────────────────────────────
#  HELPERS
# ─────────────────────────────────────────────

def normalize_title(title):
    return re.sub(r'[^a-z0-9]', '', title.lower())


def deduplicate_videos(videos):
    """Remove entries with duplicate IDs, keeping first occurrence."""
    seen = {}
    deduped = []
    for v in videos:
        if v["id"] not in seen:
            seen[v["id"]] = v["title"]
            deduped.append(v)
        else:
            print(f"⚠️  Duplicate ID '{v['id']}' — keeping '{seen[v['id']]}', skipping '{v['title']}'")
    return deduped


# ─────────────────────────────────────────────
#  MAIN
# ─────────────────────────────────────────────

def update_mock_data():
    # 0. Deduplicate ORIGINAL_VIDEOS before anything else
    original_clean = deduplicate_videos(ORIGINAL_VIDEOS)
    print(f"\n📋 Original videos (after dedup): {len(original_clean)}")

    # 1. Optional: check which are still live
    availability = check_videos_available(original_clean, YOUTUBE_API_KEY)

    # 2. Load classified (REB) videos
    try:
        with open("c:/Users/user/Desktop/SOMA-AI/brain/26a89e71-aa22-48e1-8484-bc6baf977cf7/scratch/classified_videos.json", "r", encoding="utf-8") as f:
            classified = json.load(f)
    except FileNotFoundError:
        print("⚠️  classified_videos.json not found — skipping REB videos.")
        classified = []

    # 3. Load real scraped YouTube IDs
    try:
        with open("c:/Users/user/Desktop/SOMA-AI/brain/26a89e71-aa22-48e1-8484-bc6baf977cf7/scratch/scraped_youtube_videos.json", "r", encoding="utf-8") as f:
            real_videos = json.load(f)
    except FileNotFoundError:
        print("⚠️  scraped_youtube_videos.json not found — REB ID matching skipped.")
        real_videos = []

    real_ids = [v["id"] for v in real_videos]
    real_normalized = [
        {"id": r["id"], "norm": normalize_title(r["title"])}
        for r in real_videos
    ]

    # 4. Build TS entries — originals first
    ts_entries = []

    for v in original_clean:
        rec_str = "true" if v["teacherRecommended"] else "false"
        escaped_title = v["title"].replace('"', '\\"')
        ts_entries.append(
            f'  {{ id: "{v["id"]}", title: "{escaped_title}", subject: "{v["subject"]}", '
            f'level: "{v["level"]}", duration: "{v["duration"]}", teacherRecommended: {rec_str} }}'
        )

    print(f"✅ Added {len(original_clean)} original high-quality videos.")

    # 5. REB videos
    matched_count = 0
    for idx, v in enumerate(classified):
        v_title = v["title"]
        v_norm = normalize_title(v_title)

        assigned_id = None
        for r_norm in real_normalized:
            if v_norm in r_norm["norm"] or r_norm["norm"] in v_norm:
                assigned_id = r_norm["id"]
                matched_count += 1
                break

        if not assigned_id:
            assigned_id = real_ids[idx % len(real_ids)] if real_ids else "UNKNOWN"

        rec_str = "true" if v["teacherRecommended"] else "false"
        escaped_title = v_title.replace('"', '\\"')
        ts_entries.append(
            f'  {{ id: "{assigned_id}", title: "{escaped_title}", subject: "{v["subject"]}", '
            f'level: "{v["level"]}", duration: "{v["duration"]}", teacherRecommended: {rec_str} }}'
        )

    print(f"✅ Matched {matched_count} REB videos exactly out of {len(classified)}")
    print(f"📦 Total videos to write: {len(ts_entries)}")

    # 6. Build the TS block
    videos_ts_block = "export const VIDEOS = [\n" + ",\n".join(ts_entries) + "\n];"

    # 7. Read mock-data.ts
    mock_data_path = "c:/Users/user/Desktop/SOMA-AI/src/lib/mock-data.ts"
    try:
        with open(mock_data_path, "r", encoding="utf-8") as f:
            content = f.read()
    except FileNotFoundError:
        print(f"❌ mock-data.ts not found at {mock_data_path}")
        return

    # 8. Replace VIDEOS block
    pattern = r'export const VIDEOS = \[\s*.*?\];'
    new_content, count = re.subn(pattern, videos_ts_block, content, flags=re.DOTALL)

    if count == 0:
        pattern_fallback = r'export const VIDEOS = \[.*?\n\s*\];\s*(?=export const GAMES)'
        new_content, count = re.subn(pattern_fallback, videos_ts_block + "\n\n", content, flags=re.DOTALL)

    print(f"🔄 Replacement successful: {count > 0}")

    # 9. Write back
    with open(mock_data_path, "w", encoding="utf-8") as f:
        f.write(new_content)

    print(f"✅ Successfully wrote {len(ts_entries)} videos to {mock_data_path}\n")


if __name__ == "__main__":
    update_mock_data()