import { useState } from "react";
import styles from "../styles/tabuleiro.module.css";
import {
  adicionarJogada,
  JOGO_INICIAL,
  verificarFimDoJogo,
  verificarVencedor,
} from "../src/jogo-do-galo";

export default function TicTacToe() {
  const [jogoDoGalo, setJogoDoGalo] = useState(JOGO_INICIAL);
  const vencedor = verificarVencedor(jogoDoGalo);
  const registaJogada = (i, j) => {
    if (!verificarFimDoJogo(jogoDoGalo)) {
      console.log(jogoDoGalo.jogada);
      setJogoDoGalo((jogo) => {
        const jog = adicionarJogada(jogo, jogo.jogadorAtual, i, j);
        return jog;
      });
    }
  };

  return (
    <div className={styles.tabuleiroGalo}>
      <div>
        {jogoDoGalo.tabuleiro.map((linha, i) => (
          <div className={styles.row} key={`${i}`}>
            {linha.map((casa, j) => (
              <div
                onMouseEnter={() => {}}
                onClick={() => {
                  registaJogada(i, j);
                }}
                className={styles.cell}
                key={`${i}${j}`}
                data-testid={`l${i}c${j}`}
              >
                {casa}
              </div>
            ))}
          </div>
        ))}
      </div>
      <div>
        {verificarFimDoJogo(jogoDoGalo) ? (
          <p data-testid="gameover">Game Over!</p>
        ) : (
          <p>
            Current Player:{" "}
            <span data-testid="turn">{jogoDoGalo.jogadorAtual}</span>
          </p>
        )}
        {vencedor && (
          <p>
            Winner: <span data-testid="winner">{vencedor}</span>
          </p>
        )}
      </div>
      <button onClick={() => setJogoDoGalo(JOGO_INICIAL)} data-testid="restart">
        Restart Game
      </button>
    </div>
  );
}
