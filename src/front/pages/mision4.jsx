import React, { useEffect, useState, useRef } from "react";
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";

export const Mision4 = () => {
    const { dispatch } = useGlobalReducer();

    const lines = [
        "",
        "El último fragmento no está",
        "tan desprotegido.",
        "Se oculta donde el frío no es ",
        "sino custodio.",

        "",
        "Allí, en un santuario pálido",
        "como el alba,",

        "reposan los hijos más frágiles",
        "de un cascarón perdido.",

        "",
        "Busca el nido artificial donde",
        "cada cuna es idéntica,",

        "y cada morada espera rompersE",
        " para cumplir su destino.",

        "",
        "No fuerces nada.",
        "Lo que buscas no está dentro ",
        " e lo quebradizo,",

        "sino entre sus sombras.",
        "",
    ];

    const [displayText, setDisplayText] = useState("");
    const [lineIndex, setLineIndex] = useState(0);
    const [charIndex, setCharIndex] = useState(0);
    const [typing, setTyping] = useState(true);

    const [message, setMessage] = useState("");
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
        const correctMessage = "AISHITEMASU"; // Mensaje descifrado esperado
        if (message.toUpperCase() === correctMessage) {
            alert(
                "✅ FELICITACIONES, AGENTE.\n\n" +
                "Has completado todas las misiones de la Operación FXXXX-01.\n" +
                "Tu desempeño ha sido ejemplar y de gran valor para el equipo S.H.A.D.O.W.\n\n" +
                "Nuestro agente encubierto entregará el obsequio correspondiente a tu éxito.\n" +
                "Gracias por tu dedicación y profesionalismo.\n\n" +
                "OPERACIÓN FXXXX-01: COMPLETADA ✅"
            );

            // Aquí podrías redirigir a Misión 5 o mostrar final
            // window.location.href = "/mision5";
        } else {
            setError("Mensaje incorrecto. Intenta de nuevo.");
            setMessage("");
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

                    {!typing && (
                        <div className="mt-4 flex flex-col gap-2">
                            <input
                                type="text"
                                ref={inputRef}
                                placeholder="Introduce el mensaje descifrado"
                                value={message}
                                onChange={(e) => setMessage(e.target.value)}
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
