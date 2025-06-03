export const hiragana = [
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

export const dakuon_hina = [
    ["が", "ぎ", "ぐ", "げ", "ご"],
    ["ざ", "じ", "ず", "ぜ", "ぞ"],
    ["だ", "ぢ", "づ", "で", "ど"],
    ["ば", "び", "ぶ", "べ", "ぼ"],
    ["ぱ", "ぴ", "ぷ", "ぺ", "ぽ"],
    ["ぁ", "ぃ", "ぅ", "ぇ", "ぉ"],
    ["ゃ", "","ゅ","", "ょ"],
    ["ー"] // trường âm
];

export const roma = [
    ["a", "i", "u", "e", "o"],
    ["ka", "ki", "ku", "ke", "ko"],
    ["sa", "shi", "su", "se", "so"],
    ["ta", "chi", "tsu", "te", "to"],
    ["na", "ni", "nu", "ne", "no"],
    ["ha", "hi", "fu", "he", "ho"],
    ["ma", "mi", "mu", "me", "mo"],
    ["ya", "", "yu", "", "yo"],
    ["ra", "ri", "ru", "re", "ro"],
    ["wa", "", "", "", "wo"],
    ["n"]
];

export const dakuon_roma = [
    ["ga", "gi", "gu", "ge", "go"],
    ["za", "ji", "zu", "ze", "zo"],
    ["da", "ji", "dzu", "de", "do"],
    ["ba", "bi", "bu", "be", "bo"],
    ["pa", "pi", "pu", "pe", "po"],
    ["a", "i", "u", "e", "o"],
    ["ya", "","yu","", "yo"],
    ["trường âm"] // trường âm
]

// Hiragana + 60 = Katakana tương ứng
export const toKana = (char) => {
    return typeof char === "string" && char.length > 0 && char !== "ー" ?
    String.fromCharCode(char.charCodeAt(0) + 0x60) : char;
}
