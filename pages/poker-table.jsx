import react from "react";
import { useRouter } from "next/router";
import { func } from "prop-types";
import { useEffect, useState } from "react";
import { Deck } from "../src/deck";
import { getWinners } from "../src/drawsValidations";
import { handToString } from "../src/rules";
import Link from "next/link";

const DECK_DEFAULT = [
  { value: 1, suit: "hearts" },
  { value: 2, suit: "hearts" },
  { value: 3, suit: "hearts" },
  { value: 4, suit: "hearts" },
  { value: 5, suit: "hearts" },
  { value: 6, suit: "hearts" },
  { value: 7, suit: "hearts" },
  { value: 8, suit: "hearts" },
  { value: 9, suit: "hearts" },
  { value: 10, suit: "hearts" },
  { value: 11, suit: "hearts" },
  { value: 12, suit: "hearts" },
  { value: 13, suit: "hearts" },
  { value: 1, suit: "spades" },
  { value: 2, suit: "spades" },
  { value: 3, suit: "spades" },
  { value: 4, suit: "spades" },
  { value: 5, suit: "spades" },
  { value: 6, suit: "spades" },
  { value: 7, suit: "spades" },
  { value: 8, suit: "spades" },
  { value: 9, suit: "spades" },
  { value: 10, suit: "spades" },
  { value: 11, suit: "spades" },
  { value: 12, suit: "spades" },
  { value: 13, suit: "spades" },
  { value: 1, suit: "clubs" },
  { value: 2, suit: "clubs" },
  { value: 3, suit: "clubs" },
  { value: 4, suit: "clubs" },
  { value: 5, suit: "clubs" },
  { value: 6, suit: "clubs" },
  { value: 7, suit: "clubs" },
  { value: 8, suit: "clubs" },
  { value: 9, suit: "clubs" },
  { value: 10, suit: "clubs" },
  { value: 11, suit: "clubs" },
  { value: 12, suit: "clubs" },
  { value: 13, suit: "clubs" },
  { value: 1, suit: "diamonds" },
  { value: 2, suit: "diamonds" },
  { value: 3, suit: "diamonds" },
  { value: 4, suit: "diamonds" },
  { value: 5, suit: "diamonds" },
  { value: 6, suit: "diamonds" },
  { value: 7, suit: "diamonds" },
  { value: 8, suit: "diamonds" },
  { value: 9, suit: "diamonds" },
  { value: 10, suit: "diamonds" },
  { value: 11, suit: "diamonds" },
  { value: 12, suit: "diamonds" },
  { value: 13, suit: "diamonds" },
];
const DECK_DEBUGGING = [
  { value: 13, suit: "spades" },
  { value: 10, suit: "clubs" },
  { value: 2, suit: "spades" },
  { value: 3, suit: "spades" },
  { value: 10, suit: "diamonds" },
  { value: 11, suit: "diamonds" },
  { value: 7, suit: "spades" },
  { value: 3, suit: "clubs" },
  { value: 11, suit: "clubs" },
  { value: 6, suit: "diamonds" },
  { value: 5, suit: "spades" },
  { value: 12, suit: "diamonds" },
  { value: 1, suit: "clubs" },
  { value: 12, suit: "spades" },
  { value: 13, suit: "hearts" },
  { value: 2, suit: "diamonds" },
  { value: 13, suit: "diamonds" },
];
const playerPosition = new Map([
  [1, [[800, 800]]],
  [2, [[160, 500], [1250, 320]]],
  [3, [[620, 670], [320, 190], [920, 190]]],
  [4, [[320, 670], [320, 190], [920, 190], [920, 670]]],
  [5, [[470, 670], [130, 300], [620, 190], [1100, 300], [770, 670]]],
  [6, [[470, 670], [100, 450], [470, 190], [770, 190], [1130, 450], [770, 670]]],
  [7, [[470, 670], [100, 450], [470, 190], [770, 190], [1130, 450], [770, 670], [100, 350]]],
  [8, [[470, 670], [100, 550], [100, 350], [470, 190], [770, 190], [1130, 450], [1130, 550], [770, 670]]],
  [9, [[470, 670], [100, 550], [100, 350], [470, 190], [770, 190], [1130, 450], [1130, 550], [770, 670], 770, 470]],
])

export default function PokerTable() {
  const router = useRouter();
  const [userLogado, setUserLogado] = useState({ username: "" });
  const [tableInfos, setTableInfos] = useState();
  const [jogadores, setJogadores] = useState([]);
  const [vencedoresRodada, setVencedoresRodada] = useState([]);
  const [deck, setDeck] = useState(DECK_DEFAULT);
  const [flop, setFlop] = useState([]);
  const [turn, setTurn] = useState([]);
  const [river, setRiver] = useState([]);
  const [seated, setSeated] = useState(false);
  const [joinChips, setJoinChips] = useState(0);

  const getUserLogado = () => {
    const userToken = localStorage.getItem("token");
    if (userToken === null || userToken === undefined) {
      return;
    }
    const options = { method: "GET", headers: { token: userToken } };
    fetch("/api/login", options)
      .then((response) => response.json())
      .then((response) => setUserLogado(response.user))
      .catch((err) => console.error(err));
  };

  function addPlayer(player) {
    /*     if (
          !tableInfos.players
            .map((p) => p.user.username)
            .includes(player.user.username) &&
          tableInfos.players.length < tableInfos.maxPlayers
        ) { */
    setTableInfos((prev) => ({
      ...prev,
      players: [...prev.players, player],
    }));

  }

  function updateTable() {
    const options = {
      method: "GET",
      headers: { id: window.location.search.substring(1).split("=")[1] },
    };
    fetch("/api/table", options)
      .then((response) => response.json())
      .then((response) => {
        setJogadores(response.table.players);
        setTableInfos(response.table);
        setFlop(response.table.flop);
        setTurn(response.table.turn);
        setRiver(response.table.river);
        setVencedoresRodada(response.table.roundWinners);
      })
      .catch((err) => console.error(err));
  }


  async function updateNewTable() {
    const options = {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ jogoAtualizado: { ...tableInfos } }),
    };

    const response = await fetch("/api/table", options);
    const json = await response.json();
  }

  useEffect(() => {
    if (tableInfos) {
      setSeated(tableInfos.players.map(player => player.user.username).includes(userLogado.username))
      updateNewTable();
    }
  }, [tableInfos]);

  useEffect(() => {
    updateTable();
    getUserLogado();
    const interval = setInterval(updateTable, 1000);
    return () => clearInterval(interval);
  }, []);

  const shuffle = () => {
    let newDeck = DECK_DEFAULT;
    setTableInfos((prev) => ({
      ...prev,
      deck: newDeck.sort(() => Math.random() - 0.5),
    }));
  };

  const deal = () => {
    let newDeck = DECK_DEFAULT;
    for (let i = 0; i < 2 * jogadores.length; i++) {
      if (i < jogadores.length)
        setTableInfos((prev) => ({
          ...prev,
          players: prev.players.map((player, j) =>
            j === i ? { ...player, cards: [deck[i], ""] } : player
          ),
          deck: newDeck.sort(() => Math.random() - 0.5)
        }));
      else
        setTableInfos((prev) => ({
          ...prev,
          players: prev.players.map((player, j) =>
            j === i - jogadores.length
              ? { ...player, cards: [player.cards[0], deck[i]], inRound: true }
              : player
          ),
        }));
    }
  };

  const handleJoin = () => {
    addPlayer({
      user: userLogado,
      cards: ["", ""],
      tableChips: joinChips,
      inRound: false,
    });
  };

  const sitOut = () => {
    setTableInfos((prev) => ({
      ...prev,
      players: prev.players.filter(
        (player) => player.user.username !== userLogado.username
      ),
    }));
  };

  const dealFlop = () => {
    for (let i = jogadores.length * 2; i < 2 * jogadores.length + 3; i++) {
      setTableInfos((prev) => ({ ...prev, flop: [...prev.flop, deck[i]] }));
    }
  };

  const fold = () => {
    setTableInfos((prev) => ({
      ...prev,
      players: prev.players.map((player) =>
        player.user.username === userLogado.username
          ? { ...player, cards: ["", ""], inRound: false }
          : player
      ),
    }));
  };

  const dealTurn = () => {
    for (let i = 3 + jogadores.length * 2; i < 2 * jogadores.length + 4; i++) {
      setTableInfos((prev) => ({ ...prev, turn: [...prev.turn, deck[i]] }));
    }
  };
  const dealRiver = () => {
    for (let i = 4 + jogadores.length * 2; i < 2 * jogadores.length + 5; i++) {
      setTableInfos((prev) => ({ ...prev, river: [...prev.river, deck[i]] }));
    }
  };

  const vencedor = () => {
    setTableInfos((prev) => ({
      ...prev,
      roundWinners: getWinners(
        flop.concat(turn).concat(river),
        jogadores
          .filter((player) => player.inRound)
          .map((player) => player.cards)
      ),
    }));
  };

  const getPlayerUsername = (cards) => {
    return jogadores.find(
      (player) =>
        player.cards[0]?.value === cards[0]?.value &&
        player.cards[0]?.suit === cards[0]?.suit &&
        player.cards[1]?.value === cards[1]?.value &&
        player.cards[1]?.suit === cards[1]?.suit
    )?.user.username;
  };

  const resetRound = () => {
    setTableInfos((prev) => ({
      ...prev,
      roundWinner: [],
      flop: [],
      turn: [],
      river: [],
      playerBB:
        prev.players.length === 2 ? (prev.dealer === 0 ? 0 : 1) : (prev.playerSB + 2 === prev.players.length ? 0 : (prev.playerSB + 2 === prev.players.length + 1 ? 1 : prev.playerSB + 2)),
      playerSB:
        prev.players.length === 2 ? (prev.dealer + 1 >= prev.players.length ? 0 : prev.dealer + 1) : (prev.dealer + 2 === prev.players.length ? 0 : (prev.dealer + 2 === prev.players.length + 1 ? 1 : prev.dealer + 2)),
      dealer: prev.dealer + 1 >= prev.players.length ? 0 : prev.dealer + 1,
      players: tableInfos.players.map((player) => ({
        ...player,
        cards: ["", ""],
      })),
      roundWinners: [],
    }));
  };

  return (
    <div className="mainPoker">
      <div className="table">
        <div className="players">
          {jogadores.map((player, i) => (
            <div className="player" key={`Player ${i}`}
              style={tableInfos ? {
                left: `${playerPosition.get(tableInfos.players.length)[i][0]}px`,
                top: `${playerPosition.get(tableInfos.players.length)[i][1]}px`
              } : {}} >
              <div className="insidePlayer">
                <h2 className="playerNameTable">{player.user.username}</h2>
                <div className="playerChipsBox">
                  <img src={'/chips-assets/ficha-gold-As.png'} className={'playerChipIcon'} alt="chips" />
                  <h4>{player.tableChips}</h4>
                </div>
              </div>
              <div className="twoCards">
                <div
                  className="card1"
                  style={{
                    backgroundImage:
                      player.cards[0] === ""
                        ? "none"
                        : player.user.username !== userLogado.username
                          ? "url(/cards-assets/back-cards.png)"
                          : `url(/cards-assets/${player.cards[0].value}_of_${player.cards[0].suit}.png`,
                  }}
                ></div>
                <div
                  className="card2"
                  style={{
                    backgroundImage:
                      player.cards[1] === ""
                        ? "none"
                        : player.user.username !== userLogado.username
                          ? "url(/cards-assets/back-cards.png)"
                          : `url(/cards-assets/${player.cards[1].value}_of_${player.cards[1].suit}.png`,
                  }}
                ></div>
              </div>
            </div>
          ))}
        </div>
        <div className="communityCards">
          <div className="flop">
            {flop?.map((community, i) => (
              <div
                key={`Community ${i}`}
                className="communityCard"
                style={{
                  backgroundImage: `url(/cards-assets/${community.value}_of_${community.suit}.png`,
                }}
              ></div>
            ))}
          </div>
          <div className="turn">
            {turn?.map((community, i) => (
              <div
                key={`Community ${i}`}
                className="communityCard"
                style={{
                  backgroundImage: `url(/cards-assets/${community.value}_of_${community.suit}.png`,
                }}
              ></div>
            ))}
          </div>
          <div className="river">
            {river?.map((community, i) => (
              <div
                key={`Community ${i}`}
                className="communityCard"
                style={{
                  backgroundImage: `url(/cards-assets/${community.value}_of_${community.suit}.png`,
                }}
              ></div>
            ))}
          </div>
        </div>
      </div>
      <div>
        <Link href={"/poker-menu"}>
          <a>
            <button className="backButton">Go back</button>
          </a>
        </Link>
        {seated && (
          <div>
            <button onClick={() => deal()}>Deal Player Cards</button>
            <button onClick={() => dealFlop()}>Deal Flop</button>
            <button onClick={() => dealTurn()}>Deal Turn</button>
            <button onClick={() => dealRiver()}>Deal River</button>
            <button onClick={() => vencedor()}>Vencedor</button>
            <button onClick={() => resetRound()}>New Round</button>
            {/*             <button onClick={() => fold()}>Fold</button>
 */}            <button onClick={() => sitOut()}>Leave Table</button>
          </div>
        )}
        {/* !seated &&  */(
          <div>
            <button onClick={() => handleJoin()}>Join</button>
            <div className="joinChips">
              <h4>{joinChips}</h4>
              <input
                type={"range"}
                id={"chips"}
                onChange={() =>
                  setJoinChips(document.getElementById("chips").value)
                }
                name={"chips"}
                min={
                  tableInfos?.bigBlind === undefined
                    ? 0
                    : tableInfos.bigBlind * 10
                }
                max={
                  tableInfos?.bigBlind === undefined
                    ? 1
                    : tableInfos.bigBlind * 100
                }
              />
            </div>
          </div>
        )}
      </div>
      {/* <h2>dealer: {tableInfos?.players[tableInfos?.dealer]?.user?.username}</h2>
      <h3>
        Small Blind: {tableInfos?.players[tableInfos?.playerSB]?.user?.username}
      </h3>
      <h1>
        Big Blind: {tableInfos?.players[tableInfos?.playerBB]?.user?.username}
      </h1> */}
      {vencedoresRodada.length !== 0 && (
        <div>
          Vencerdor(es):{" "}
          {vencedoresRodada.map((vencedor, i) => (
            <p key={i}>{`${getPlayerUsername(vencedor)} ${handToString(
              flop.concat(turn).concat(river),
              vencedor
            )}`}</p>
          ))}
        </div>
      )}
    </div>
  );
}
