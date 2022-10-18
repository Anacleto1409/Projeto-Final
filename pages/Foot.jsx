import { useState } from "react";
import { Deck } from "../src/deck";
import { getWinners } from "../src/drawsValidations";
import { handToString } from "../src/rules";

export default function Foot() {
  return (
    <div className="footer">
      <p>Copyright 2022 © Bytes4Gamers</p>
    </div>
  );
}
