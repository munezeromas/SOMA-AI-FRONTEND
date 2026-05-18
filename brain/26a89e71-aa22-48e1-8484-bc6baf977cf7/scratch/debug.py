import re

with open("c:/Users/user/Desktop/SOMA-AI/brain/26a89e71-aa22-48e1-8484-bc6baf977cf7/scratch/videos_raw.txt", "r", encoding="utf-8") as f:
    content = f.read()

lines = [line.strip() for line in content.split("\n")]

print("First 30 lines:")
for idx, line in enumerate(lines[:30]):
    print(f"{idx}: {line}")
