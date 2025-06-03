import React from 'react';
import {
  hiragana,
  dakuon_hina,
  roma,
  dakuon_roma,
  toKana
} from './JapAlphabet';

export default function JapKeyboard({ onInsert, mode = "katakana" }) {

  const layout = mode === "katakana"
    ? hiragana.map(row => Array.isArray(row) ? row.map(toKana) : [])
    : hiragana;

  const dakuonLayout = mode === "katakana"
    ? dakuon_hina.map(row => Array.isArray(row) ? row.map(toKana) : [])
    : dakuon_hina;

  const renderRow = (row, rowIndex, isDakuon = false) => {
    if (!Array.isArray(row)) return null;

    return (
      <div key={rowIndex} style={{ marginBottom: "4px" }}>
        {row.map((char, idx) => {
          if (!char) {
            return (
              <span key={idx} style={{ display: "inline-block", width: "32px" }} />
            );
          }

          const romanized = isDakuon
            ? dakuon_roma?.[rowIndex]?.[idx] ?? ""
            : roma?.[rowIndex]?.[idx] ?? "";

          return (
            <button
              key={idx}
              title={romanized}
              style={{
                fontSize: "18px",
                margin: "2px",
                padding: "5px 8px",
                minWidth: "36px",
                cursor: "pointer"
              }}
              onClick={() => onInsert(char)}
            >
              {char}
            </button>
          );
        })}
      </div>
    );
  };

  return (
    <div style={{ marginTop: "10px" }}>
      <div
        style={{
          display: "flex",
          gap: "40px",
          alignItems: "flex-start",
          flexWrap: "wrap"
        }}
      >
        <div>
          <strong>Âm gốc</strong>
          {layout?.map((row, idx) => renderRow(row, idx, false))}
        </div>
        <div>
          <strong>Âm mở rộng</strong>
          {dakuonLayout?.map((row, idx) => renderRow(row, idx, true))}
        </div>
      </div>
    </div>
  );
}
