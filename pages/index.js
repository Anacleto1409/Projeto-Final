import Head from "next/head";
import { useState } from "react";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import PokerTable from "./poker-table";
import PokerMenu from "./poker-menu";
import HowToPlay from "./how-to-play";
import Menu from "./menu";
import Foot from "./foot";
import Home from "./home";
import AboutUs from "./about-us";
import Rules from "./rules";
import SignUp from "./register";
import Login from "./login";
import { TicTacToe } from "./tic-tac-toe";

export default function Main() {

  return (
    <div>
      <div className="middle">
        <Home />
      </div>
    </div>
  );
}
