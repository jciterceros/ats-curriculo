export function sanitizeForATS(text) {
    if (!text) return text;

  // Mapeamento de caracteres especiais para suas versões ASCII
  const replacements = {
    "∑": "SUM",
    "≤": "<=",
    "≥": ">=",
    "≠": "!=",
    "―": "-",
    "–": "-",
    "—": "-",
    "“": '"',
    "”": '"',
    "‘": "'",
    "’": "'",
    "…": "...",
    "•": "-",
    "→": "->",
    "←": "<-",
    "±": "+/-",
    μ: "u",
    "°": "deg",
  };

  // Substitui caracteres especiais e remove outros não suportados
  return text
    .replace(/[∑≤≥≠―–—“”‘’…•→←±μ°]/g, (char) => replacements[char] || "")
    .normalize("NFKD")
    .replace(/[^\x20-\x7E]/g, ""); // Remove caracteres não-ASCII imprimíveis
}