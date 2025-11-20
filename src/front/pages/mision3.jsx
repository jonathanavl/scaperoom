import React, { useEffect, useState, useRef } from "react";
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";

export const Mision3 = () => {
  const { dispatch } = useGlobalReducer();

  const lines = [
    "",
    "Has avanzado más de lo previsto.",
    "Pero aún queda un fragmento oculto.",
    "",
    "Lo encontrarás donde la realidad",
    "se parte en dos,",
    "donde una superficie fria",
    "imita tus gestos",
    "pero jamás revela ",
    "sus propios secretos.",
    "",
    "No sigas tu sombra esta vez...",
    "Sigue tu reflejo.",
    "",
    "Cuando estés frente a él, busca",
    "donde la imagen se sostiene.",
    "Allí se oculta lo que necesitas.",
    "",
  ];

  const [displayText, setDisplayText] = useState("");
  const [lineIndex, setLineIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [typing, setTyping] = useState(true);

  const [pin, setPin] = useState("");
  const [error, setError] = useState("");

  const inputRef = useRef(null);

  useEffect(() => {
    if (lineIndex >= lines.length) {
      setTyping(false);
      // Enfocar input automáticamente
      setTimeout(() => {
        if (inputRef.current) inputRef.current.focus();
      }, 100);
      return;
    }

    const currentLine = lines[lineIndex];
    const timeout = setTimeout(() => {
      if (charIndex < currentLine.length) {
        setDisplayText((d) => d + currentLine[charIndex]);
        setCharIndex((c) => c + 1);
      } else {
        setDisplayText((d) => d + "\n");
        setLineIndex((l) => l + 1);
        setCharIndex(0);
      }
    }, currentLine === "" ? 300 : 45);

    return () => clearTimeout(timeout);
  }, [charIndex, lineIndex]);

  const handleSubmit = () => {
    const correctPin = "9751"; // PIN correcto de Misión 3
    if (pin === correctPin) {
      window.location.href = "/mision4"; // Redirige a la siguiente misión
    } else {
      setError("PIN incorrecto. Intenta de nuevo.");
      setPin("");
      if (inputRef.current) inputRef.current.focus();
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") handleSubmit();
  };

  return (
    <div className="bg-black text-white px-4 py-4 min-h-screen flex flex-col items-center justify-center">
      <div className="w-full max-w-md rounded-2xl overflow-hidden shadow-2xl border border-white/10 pb-2">
        
        {/* Terminal */}
        <div className="relative z-10 p-6 pb-8 bg-black/75">
          <div className="w-full max-w-full px-2 mx-auto">
            <pre
              aria-live="polite"
              className="whitespace-pre-wrap break-words overflow-hidden max-w-full text-sm leading-relaxed font-mono text-green-300/90"
              style={{ minHeight: 300 }}
            >
              {displayText}
              <span
                className={`inline-block ml-1 ${typing ? "animate-pulse" : "opacity-60"}`}
              >
                █
              </span>
            </pre>
          </div>

          {/* Input y botón */}
          {!typing && (
            <div className="mt-4 flex flex-col gap-2">
              <input
                type="text"
                ref={inputRef}
                placeholder="Introduce el contenido del sobre"
                value={pin}
                onChange={(e) => setPin(e.target.value)}
                onKeyDown={handleKeyPress}
                className="w-full px-3 py-2 rounded-lg bg-black/80 border border-green-300 text-green-200 font-mono focus:outline-none focus:ring-2 focus:ring-green-500"
              />
              {error && <div className="text-red-500 text-sm">{error}</div>}
              <button
                onClick={handleSubmit}
                className="w-full py-3 rounded-xl text-lg font-bold uppercase tracking-wide bg-red-600/95 hover:bg-red-700 active:scale-95 transition-transform shadow-lg"
              >
                ENTER
              </button>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="text-center text-[10px] text-gray-500 py-2">
          Operación FXXXX-01 • Confidencial — Agencia S.H.A.D.O.W.
        </div>
      </div>
    </div>
  );
};
