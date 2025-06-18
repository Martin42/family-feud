import "./App.css";
import BG from "./assets/FF-BG.jpg";
import { useRoundStore } from "../store/roundConfig";
import gameData from "../data/game.json";
import { useState, useEffect } from "react";

function App() {
  const round = useRoundStore((s) => s.currentRound);
  const nextRound = useRoundStore((s) => s.nextRound);
  const prevRound = useRoundStore((s) => s.prevRound);

  // Encontrar a ronda atual (id == round)
  const current = gameData.find((r) => r.id === round);

  // Estado para respostas visíveis
  const [revealed, setRevealed] = useState<number[]>([]);

  // Resetar respostas ao mudar de ronda
  // (opcional, mas recomendado)
  useEffect(() => {
    setRevealed([]);
  }, [round]);

  return (
    <main>
      <img src={BG} alt="family feud set" className="background-img" />
      <div className="round-div">
        <h1>RONDA {round}</h1>
        <div className="game-div">
          {current ? (
            <>
              <h2>{current.question}</h2>
              <ul>
                {current.answers.map((ans, idx) => (
                  <li
                    key={idx}
                    style={{
                      listStyle: "none",
                      margin: "1rem 0",
                      cursor: "pointer",
                      background: "#fff2",
                      borderRadius: "0.25rem",
                      padding: "0.5rem 1rem",
                      color: revealed.includes(idx) ? "white" : "#fff8",
                      border: "1px solid #fff4",
                    }}
                    onClick={() =>
                      setRevealed((r) => (r.includes(idx) ? r : [...r, idx]))
                    }
                  >
                    {revealed.includes(idx) ? (
                      <>
                        <b>{ans.text}</b> — <span>{ans.points} pts</span>
                      </>
                    ) : (
                      <span>Resposta #{idx + 1}</span>
                    )}
                  </li>
                ))}
              </ul>
            </>
          ) : (
            <p>Sem questão para esta ronda.</p>
          )}
        </div>
        <div className="controls-div">
          <button type="button" onClick={prevRound}>
            Ronda Anterior
          </button>
          <button type="button" onClick={nextRound}>
            Proxima Ronda
          </button>
        </div>
      </div>
    </main>
  );
}

export default App;
