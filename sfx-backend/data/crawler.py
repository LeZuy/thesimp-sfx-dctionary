import os
import re
import time
import random
import requests
import pandas as pd
from bs4 import BeautifulSoup

BASE_URL = "http://thejadednetwork.com/sfx/index/"
HEADERS = {
    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36",
    "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
    "Accept-Encoding": "gzip, deflate",
    "Accept-Language": "en-US,en;q=0.5",
    "Connection": "keep-alive"
    }
CHARACTERS = ["a", "i", "u", "e", "o",
              "ka", "ki", "ku", "ke", "ko",
              "sa", "shi", "su", "se", "so",
              "ta", "chi", "tsu", "te", "to",
              "na", "ni", "nu", "ne", "no",
              "ha", "hi", "fu", "he", "ho",
              "ma", "mi", "mu", "me", "mo",
              "ya", "yu", "yo",
              "ra", "re",
              "wa",
              "n"
              ]
PROGRESS_FILE = "progress.log"
OUTPUT_FILE = "sfx_jaded_full.csv"

def load_progress():
    if not os.path.exists(PROGRESS_FILE):
        return None, 1
    with open(PROGRESS_FILE, "r") as f:
        line = f.readline().strip()
        if line:
            parts = line.split(",")
            return parts[0], int(parts[1])
    return None, 1

def save_progress(letter, page):
    with open(PROGRESS_FILE, "w") as f:
        f.write(f"{letter},{page}")

if __name__ == "__main__":
    data = []
    last_letter, last_page = load_progress()

    resume = False if last_letter is None else True

    for letter in CHARACTERS:
        if resume:
            if letter != last_letter:
                continue
            page = last_page
            resume = False  # resume done after this letter
        else:
            page = 1

        while True:
            url = f"{BASE_URL}{letter}/" if page == 1 else f"{BASE_URL}{letter}/{page}/"

            response = requests.get(url, headers=HEADERS, timeout=10)
            if response.status_code != 200:
                print(f" HTTP error {response.status_code}")
                break
            
            soup = BeautifulSoup(response.content, "html.parser")

            tables = soup.select("table.definitions")

            if not tables or all(len(table.find_all("tr")) <= 1 for table in tables):
                print(f"No more sfx(s) of letter '{letter}'.")
                break

            print(f"Loading: {url}")
            save_progress(letter, page)

            for table in tables:
                rows =  table.find_all("tr")
                print(f"Found: {len(rows)} sfx(s).")
                for row in rows:
                    cells = row.find_all("td")
                    if(cells[0].get("class")[0] != "title"):
                        japs = cells[0].get_text(strip=True).split(",")
                        kana = japs[0]
                        hina = japs[1] if len(japs) > 1 else ""
                        roma = cells[1].get_text(strip = True)
                        english = cells[2].get_text(strip = True)
                        explain = cells[3].get_text(strip = True)
                        explain = re.sub(r"More »$", "", explain).strip()
                        data.append({
                            "kana": kana,
                            "hina": hina,
                            "romaji": roma,
                            "english": english,
                            "explanation": explain
                        })
            page += 1
            time.sleep(random.uniform(2, 4))
    df = pd.DataFrame(data)
    df.to_csv(OUTPUT_FILE, index=False, encoding="utf-8-sig")
    print(f"Saved to {OUTPUT_FILE} with {len(df)} sfx(s).")