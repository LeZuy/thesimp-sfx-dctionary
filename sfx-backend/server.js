const express = require("express");
const fs = require("fs");
const csv = require("csv-parser");
const cors = require("cors");

const PORT = process.env.PORT || 5000;

const app = express();
app.use(cors());

let sfxData = [];

fs.createReadStream("./data/sfx_jaded_full.csv", "utf8")
    .pipe(csv())
    .on("data", (row) => sfxData.push(row))
    .on("end", () => {
        console.log("✅ Đã load dữ liệu CSV vào bộ nhớ.");
        console.log(`✅ Đã load ${sfxData.length} dòng dữ liệu từ CSV`);
        
        sfxData = sfxData.map((row) => {
            const cleaned = {};
            Object.keys(row).forEach((key) => {
                const cleanKey = key.trim().replace(/^\uFEFF/, ""); // loại BOM đầu dòng
                cleaned[cleanKey] = row[key];
            });
            return cleaned;
            }
        );

        if(sfxData.length > 0) {
        const columnCount = Object.keys(sfxData[0]).length;
        console.log(`📊 Số cột: ${columnCount}`);
        console.log("🔑 Các cột:", Object.keys(sfxData[0]).join(", "));
        console.log("🧪 Dòng đầu tiên:", sfxData[0]);
        console.log("🧪 Kiểm tra key:", Object.keys(sfxData[0]));
        }
        }
    )

app.get("/search", (req, res) => {
    const q = req.query.q?.toLowerCase();
  
    if (!q) return res.json([]);

    const result = sfxData.filter(item =>
    (item.kana && item.kana.toLowerCase().startsWith(q)) ||
    (item.hina && item.hina.toLowerCase().startsWith(q)) ||
    (item.romaji && item.romaji.toLowerCase().startsWith(q)) 
    );

    res.json(result);
    }
);

app.listen(PORT, () => {
    console.log(`🚀 API đang chạy tại http://localhost:${PORT}`);
    }
);