import React, { useEffect, useState } from "react";
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";

export const Home = () => {
  const { dispatch } = useGlobalReducer();

  // --- Texto máquina de escribir ---
  const lines = [
    "▲ ACCESO NO AUTORIZADO",
    "",
    "Su dispositivo ha sido infiltrado",
    "por la agencia S.H.A.D.O.W.",
    "Tranquilo/a... no es peligroso.",
    "",
    "Pero sí MUY importante.",
    "",
    "Hemos detectado un objeto único",
    "escondido cerca de usted.",
	"",
    "Para desbloquear su ubicación",
    "exacta deberá completar",
	"La Operación FXXXX-01.",
	"",
    "Pulse INICIAR MISIÓN para continuar.",
  ];

  const [displayText, setDisplayText] = useState("");
  const [lineIndex, setLineIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [typing, setTyping] = useState(true);

  useEffect(() => {
    if (!typing || lineIndex >= lines.length) return;

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
  }, [charIndex, lineIndex, typing]);

  const handleStart = () => {
    window.location.href = "/mision";
  };

  return (
    <div className=" bg-black text-white p-4">
      <div className=" w-full max-w-md rounded-2xl overflow-hidden shadow-2xl border border-white/10 pb-2">

        {/* Cabecera estilo FBI */}
        <div className="relative z-10 p-4 bg-black/60 backdrop-blur-sm">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 flex items-center justify-center rounded bg-red-700/90 text-white font-bold">
                FBI
              </div>
              <div>
                <div className="text-xs text-red-400">SISTEMA</div>
                <div className="text-sm font-semibold tracking-wide">
                  ACCESO RESTRINGIDO
                </div>
              </div>
            </div>
            <div className="text-xs text-gray-400">MÓVIL — MODO INVASIÓN</div>
          </div>
        </div>

        {/* Terminal */}
        <div className="relative z-10 p-6 pb-8 bg-black/75">
<div className="w-full max-w-full px-2 mx-auto">
           <pre
  aria-live="polite"
  className="whitespace-pre-wrap break-words break-all overflow-hidden max-w-full text-sm leading-relaxed font-mono text-green-300/90"
  style={{ minHeight: 220 }}
>

              {displayText}
              <span
                className={`inline-block ml-1 ${typing ? "animate-pulse" : "opacity-60"}`}
              >
                █
              </span>
            </pre>
          </div>
        </div>

        {/* Botón */}
        <div className="relative z-10 p-4 bg-gradient-to-t from-black/60 to-transparent flex items-center justify-center">
          <button
            onClick={handleStart}
            className="w-full py-3 rounded-xl text-lg font-bold uppercase tracking-wide bg-red-600/95 hover:bg-red-700 active:scale-95 transition-transform shadow-lg"
          >
            INICIAR MISIÓN
          </button>
        </div>

        {/* Footer */}
        <div className="text-center text-[10px] text-gray-500 py-2">
          Operación FXXXX-01 • Confidencial — Agencia S.H.A.D.O.W.
        </div>

      </div>
    </div>
  );
};
