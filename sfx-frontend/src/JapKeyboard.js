import React from 'react';

export default function KanaKeyboard({ onInsert, mode = "katakana" }) {

    const hiragana = [
        ["あ", "い", "う", "え", "お"],
        ["か", "き", "く", "け", "こ"],
        ["さ", "し", "す", "せ", "そ"],
        ["た", "ち", "つ", "て", "と"],
        ["な", "に", "ぬ", "ね", "の"],
        ["は", "ひ", "ふ", "へ", "ほ"],
        ["ま", "み", "む", "め", "も"],
        ["や", "", "ゆ", "", "よ"],
        ["ら", "り", "る", "れ", "ろ"],
        ["わ", "", "", "", "を"],
        ["ん"]
    ];

    const dakuonHina = [
        ["が", "ぎ", "ぐ", "げ", "ご"],
        ["ざ", "じ", "ず", "ぜ", "ぞ"],
        ["だ", "ぢ", "づ", "で", "ど"],
        ["ば", "び", "ぶ", "べ", "ぼ"],
        ["ぱ", "ぴ", "ぷ", "ぺ", "ぽ"],
        ["ぁ", "ぃ", "ぅ", "ぇ", "ぉ"],
        ["ゃ", "ゅ", "ょ"],
        ["ー"] // trường âm
    ];

    // Hiragana + 60 = Katakana tương ứng
    const toKana = (char) =>
        typeof char === "string" && char.length > 0 ?
        String.fromCharCode(char.charCodeAt(0) + 0x60) : "";

    const layout = mode === "katakana" ? hiragana.map(row => Array.isArray(row) ? row.map(toKana) : []) : hiragana;
    const dakuonLayout = mode === "katakana" ? dakuonHina.map(row => Array.isArray(row) ? row.map(toKana) : []) : dakuonHina;

    const renderRow = (row, rowIndex) => (
        <div key={rowIndex}>
            {row.map((char, idx) =>
                char ? (
                <button
                    key={idx}
                    style={{ fontSize: "18px", margin: "2px", padding: "5px" }}
                    onClick={() => onInsert(char)}
                >
                    {char}
                </button>
                ) : (
                <span key={idx} style={{ display: "inline-block", width: "32px" }} />
                )
            )}
        </div>
    );
    return (
        <div style={{ marginTop: "10px" }}>
        <h4>Bàn phím {mode === "hiragana" ? "Hiragana" : "Katakana"}</h4>
        <div  style={{ display: "flex", gap: "40px", alignItems: "flex-start", flexWrap: "wrap"}}>

            <div style={{ marginTop: "10px" }}>
                <strong>Âm gốc </strong>
                {layout.map(renderRow)}
            </div>
            <div style={{ marginTop: "10px" }}>
                <strong>Âm mở rộng</strong>
                {dakuonLayout.map(renderRow)}
            </div>
        </div>
        </div>
    );
}
