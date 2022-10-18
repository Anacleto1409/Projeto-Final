import { func } from "prop-types";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Link from "next/link";

export default function NewTable() {
  const [maxPlayers, setMaxPlayers] = useState("2");
  const [bigBlind, setBigBlind] = useState("10");
  const [playerChips, setPlayerChips] = useState("500");
  const router = useRouter();

  async function setForm() {
    const options = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        players: [],
        maxPlayers: Number(maxPlayers),
        dealer: 0,
        playerBB: 0,
        playerSB: 0,
        playerAtual: 0,
        pot: [],
        deck: [],
        deckIndice: 0,
        flop: [],
        turn: [],
        river: [],
        roundWinners: [],
        bigBlind: Number(bigBlind),
      }),
    };

    const response = await fetch("/api/table", options);
    const json = await response.json();
    console.log(json);
    router.push(`/poker-table?game=${json._id}`);
  }

  function updateMaxPlayers() {
    setMaxPlayers(document.getElementById("maxPlayers").value);
  }
  function updateBigBlind() {
    const newBB = document.getElementById("bigBlind").value;
    setBigBlind(newBB);
    setPlayerChips(String(Number(newBB) * 50));
  }

  return (
    <div className="createNewTable">
      <h2>Create new table</h2>
      <div className="createTableBody">
        <form>
          <label>Max players: </label>
          <select id="maxPlayers" onChange={() => updateMaxPlayers()}>
            <option value={2}>2</option>
            <option value={3}>3</option>
            <option value={4}>4</option>
            <option value={5}>5</option>
            <option value={6}>6</option>
            <option value={7}>7</option>
            <option value={8}>8</option>
            <option value={9}>9</option>
          </select>
          <br />
          <label>Big Blind: </label>
          <select id="bigBlind" onChange={() => updateBigBlind()}>
            <option value={10}>10</option>
            <option value={50}>50</option>
            <option value={100}>100</option>
            <option value={250}>250</option>
            <option value={500}>500</option>
            <option value={1000}>1000</option>
            <option value={1500}>1500</option>
            <option value={3000}>3000</option>
            <option value={10000}>10000</option>
          </select>
          <br />
        </form>
        <br />
        <button onClick={() => setForm()}>Create</button>
      </div>
      <Link href={"/poker-menu"}>
        <a>
          <button className="backButton">Go back</button>
        </a>
      </Link>
    </div>
  );
}
