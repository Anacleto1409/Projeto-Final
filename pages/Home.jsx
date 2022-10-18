import { useState, useEffect } from "react";
import { Deck } from "../src/deck";
import { getWinners } from "../src/drawsValidations";
import { handToString } from "../src/rules";
import Link from 'next/link'

export default function Home() {
  const [isLogged, setIsLogged] = useState()
  
  useEffect(() => {
    setIsLogged(localStorage.length > 0)
  }, []);

  return (
    <div className="mainHome">
      <h2>Games</h2>
      <div className="games">
        <div className="poker">
          <Link href={isLogged ? "/poker-menu" : ""}>
            <a>
              <img
                src="/games-assets/poker.jpg"
                alt="Poker Game"
                className={isLogged? "gamePokerImg" : "disableGames"}
              />
              <h3>Poker Texas Hold'em</h3>
            </a>
          </Link>
        </div>
        <div className="roulette">
          <img
            src="/games-assets/roulette.jpg"
            alt="Roulette"
            className="disableGames"
          />
          <h3>Roulette</h3>
        </div>
        <div className="pool">
          <img
            src="/games-assets/8-ball-pool.png"
            alt="8 Ball Poll"
            className="disableGames"
          />
          <h3>8 Ball Poll</h3>
        </div>
        <div className="blackjack">
          <img
            src="/games-assets/blackjack.png"
            alt="Blackjack"
            className="disableGames"
          />
          <h3>Blackjack</h3>
        </div>
        <div className="ticTacToe">
          <Link href={isLogged ? "/tic-tac-toe" : ""}>
            <a>
              <img
                src="/games-assets/tic-tac-toe.jpg"
                alt="Tic Tac Toe"
                className={isLogged ? "gamePokerImg" : "disableGames"}
              />
              <h3>Tic Tac Toe</h3>
            </a>
          </Link>
        </div>
        <div className="chess">
          <img
            src="/games-assets/chess.jpg"
            alt="Chess"
            className="disableGames"
          />
          <h3>Chess</h3>
        </div>
      </div>
    </div>
  );
}
