import React, { useState, useEffect } from 'react';
import axios from 'axios';
import JapKeyboard from './JapKeyboard.js';
import './App.css';

function App() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [mode, setMode] = useState("katakana");
  const insertChar = (char) => setQuery(query + char);
  const search = async () => {
    const res = await axios.get(`${process.env.REACT_APP_API_URL}/search?q=${query}`);
      setResults(res.data);
      console.log("Tìm kiếm: ", query);
      console.log(`Tìm thấy ${res.data.length} kết quả.`);
  };
  useEffect(() => {
    document.title = `Thesimp SFX Dictionary `;
  });

  return (
    <div className='page-container'>
      <div className="main">
        <h1>SFX Dictionary</h1>
        <div>
          <div className="search">
            <input className='search-input' placeholder="Tìm kiếm sfx..." value={query} onChange={e => setQuery(e.target.value)}/>
            <button className='search-button' onClick={(search)}>Search</button>
          </div>

          <div className='kb_r' >

            <div className='keyboard'>

              <h3>Bàn phím {mode === "hiragana" ? "Hiragana" : "Katakana"}</h3>
              
              <button onClick={() => setMode(mode === "hiragana" ? "katakana" : "hiragana")}>
                Đổi sang {mode === "hiragana" ? "Katakana" : "Hiragana"}
              </button>
              
              <JapKeyboard onInsert={insertChar} mode={mode} />

            </div>

            <div className='results'>

              {results.length > 0 && (
                <table className="sfx-table">
                  <thead>
                    <tr>
                      <th>SFX</th>
                      <th>Romaji</th>
                      <th>Tiếng Anh</th>
                      <th>Giải nghĩa</th>
                    </tr>
                  </thead>
                  <tbody>
                    {results.map((item, idx) => (
                      <tr key={idx}>
                        <td>{item.kana}, {item.hina}</td>
                        <td>{item.romaji}</td>
                        <td>{item.english}</td>
                        <td>{item.explanation}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          </div>
        </div>

      </div>
    <footer>
      @TheSimpTranslation 2025
    </footer>
  </div>
  );
}
export default App;
