import React, { useState } from 'react';
import axios from 'axios';
import JapKeyboard from './JapKeyboard.js';
import './App.css';

function App() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [mode, setMode] = useState("katakana");
  const insertChar = (char) => setQuery(query + char);
  const search = async () => {
    const res = await axios.get(`http://localhost:5000/search?q=${query}`);
      setResults(res.data);
      console.log("Tìm kiếm: ", query);
      console.log(`Tìm thấy ${res.data.length} kết quả.`);
  };

  return (
    <div style={{
        padding: '20px',
        fontFamily: '"Noto Sans JP", "Yu Gothic", "Meiryo", sans-serif'
      }}>
      <h1>SFX Dictionary</h1>
      <input
        placeholder="Tìm kiếm sfx"
        value={query}
        onChange={e => setQuery(e.target.value)}
      />
      <button onClick={search}>Tìm</button>
      <button onClick={() => setMode(mode === 'hiragana' ? 'katakana' : 'hiragana')} style={{ marginLeft: '10px' }}>
        Đổi sang {mode === 'hiragana' ? 'Katakana' : 'Hiragana'}
      </button>
      <JapKeyboard onInsert={insertChar} mode={mode} />

      {results.length > 0 && (
        <table border="1" cellPadding="8" style={{ marginTop: '20px', borderCollapse: 'collapse' }}>
        <thead><tr>
          <th>SFX</th>
          <th>Romanji</th>
          <th>Tiếng Anh</th>
          <th>Giải nghĩa</th>
          </tr></thead>
        <tbody>
        {results.map((item, idx) => (
          <tr key={idx}>
            <td><strong>{item.kana}</strong>,<br/> <strong>{item.hina}</strong></td>
            <td>{item.romaji}</td>
            <td>{item.english}</td> 
            <td><em>{item.explanation}</em></td>
          </tr>
        ))}
        </tbody>
      </table>)}
    </div>
  );
}
export default App;
