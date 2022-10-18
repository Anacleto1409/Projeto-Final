import { useState } from "react";
import { Deck } from "../src/deck";
import { getWinners } from "../src/drawsValidations";
import { handToString } from "../src/rules";

export default function HowToPlay() {
  return (
    <div className="mainHowToPlay">
      <img
        className="howToPlayImg"
        src="/howtoplay-assets/how-to-play.jpg"
        alt="How to play"
      />
      <div className="learn">
        <h2>Learn how to play poker</h2>
        <p>
          Whether you are new to the game of poker, or just need a refresher,
          PokerStars has what you need to learn how to play.
        </p>
        <ul>
          <li>
            Learn what beats what: We’ve got a handy guide to the hierarchy of
            poker hands, so you’ll always know when you’re holding the nuts!
          </li>
          <li>
            We’ve got links to help you learn different types of poker game,
            plus free strategy advice.
          </li>
        </ul>
      </div>
      <div className="handRanking">
        <h2>Texas Hold’em - Hand Ranking</h2>
        <p>
          Before you hit the online poker tables, you’ll need to familiarise
          yourself with the basic hand rankings and rules that govern Texas
          Hold’em. <br/>Here are the 10 hands every player should know before joining
          the action.
        </p>
        <div className="hands">
          <div>
            <img
              className="handExemple"
              src="/howtoplay-assets/royal-flush.png"
              alt="Royal Straight Flush"
            />
            <h3>Royal Straight Flush</h3>
            <p>
              Poker’s most famous hand, a royal straight flush, cannot be
              beaten. It consists of the ace, king, queen, jack and ten of a
              single suit.
            </p>
          </div>
          <div>
            <img
              className="handExemple"
              src="/howtoplay-assets/straight-flush.webp"
              alt="Straight Flush"
            />
            <h3>Straight Flush</h3>
            <p>
              Five cards in sequence, of the same suit. In the event of a tie,
              the highest rank at the top of the sequence wins.
            </p>
          </div>
          <div>
            <img
              className="handExemple"
              src="/howtoplay-assets/four-of-a-kind.webp"
              alt="Four of a Kind"
            />
            <h3>Four of a Kind</h3>
            <p>
              Four cards of the same rank, and one side card or ‘kicker’. In the
              event of a tie, the player with the highest side card (‘kicker’)
              wins.
            </p>
          </div>
          <div>
            <img
              className="handExemple"
              src="/howtoplay-assets/full-house.png"
              alt="Full House"
            />
            <h3>Full House</h3>
            <p>
              Three cards of the same rank, and two cards of a different,
              matching rank. In the event of a tie, the highest three matching
              cards wins.
            </p>
          </div>
          <div>
            <img
              className="handExemple"
              src="/howtoplay-assets/flush.webp"
              alt="Flush"
            />
            <h3>Flush</h3>
            <p>
              Five cards of the same suit, not in sequence. In the event of a
              tie, the player holding the highest ranked card wins.
            </p>
          </div>
          <div>
            <img
              className="handExemple"
              src="/howtoplay-assets/Straight.webp"
              alt="Straight"
            />
            <h3>Straight</h3>
            <p>
              Five non-suited cards in sequence. In the event of a tie, the
              highest ranking card at the top of the sequence wins.
            </p>
          </div>
          <div>
            <img
              className="handExemple"
              src="/howtoplay-assets/three-of-a-kind.png"
              alt="Three of a Kind"
            />
            <h3>Three of a Kind</h3>
            <p>
              Three cards of the same rank, and two unrelated side cards. In the
              event of a tie, the player with the highest, and if necessary,
              second-highest side card (‘kicker’) wins.
            </p>
          </div>
          <div>
            <img
              className="handExemple"
              src="/howtoplay-assets/two-pair.webp"
              alt="Two Pair"
            />
            <h3>Two Pair</h3>
            <p>
              Two cards of matching rank, two cards of different matching rank,
              and one kicker. If both players have an identical Two Pair, the
              highest kicker wins.
            </p>
          </div>
          <div>
            <img
              className="handExemple"
              src="/howtoplay-assets/pair.webp"
              alt="Pair"
            />
            <h3>Pair</h3>
            <p>
              Two cards of matching rank, and three unrelated side cards. In the
              event of a tie, the player with the highest, and if necessary,
              second or third-highest side card wins.
            </p>
          </div>
          <div>
            <img
              className="handExemple"
              src="/howtoplay-assets/high-card.png"
              alt="High Card"
            />
            <h3>High Card</h3>
            <p>
              Any hand that does not qualify under the categories listed. In the
              event of a tie, the highest card wins, such as ‘ace-high’.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
