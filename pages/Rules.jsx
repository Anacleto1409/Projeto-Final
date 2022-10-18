import { useState } from "react";
import { Deck } from "../src/deck";
import { getWinners } from "../src/drawsValidations";
import { handToString } from "../src/rules";

export default function Rules() {
  return (
    <div className="Rules">
      <img
        className="howToPlayImg"
        src="/howtoplay-assets/how-to-play.jpg"
        alt="How to play"
      />
      <div className="OnlineRules">
        <h2>The Rules of Online Poker</h2>
        <p>
          At our site you’ll find all the world’s most popular poker games,
          including Texas Hold’em, Omaha and many more. The tutorial below will
          give you a good idea of how to play if you’ve never played poker
          before, and you can find detailed rules for each different kind of
          game on our Poker Games page. Try the quick tutorial, then read on for
          an overview of how poker is played.
        </p>
        <h3>How Do You Win?</h3>
        <p>
          Typically, the winner of each hand of poker is the player that holds
          the highest ranked hand when all cards are shown at the end of the
          hand –known as the ‘showdown’ – or the player that makes the last
          uncalled bet, thus winning without needing to reach a showdown. Not
          sure whether a flush beats a straight? Can’t remember how to make a
          full house? You can find all the information you need to know about
          hand rankings in the table below (click here for more). The strongest
          hands are in the top row, running from left to right, with the weakest
          possible hand being simply a high card.
        </p>
      </div>
      <div className="handRanking">
        <h2>Texas Hold’em - Hand Ranking</h2>
        <p>
          Before you hit the online poker tables, you’ll need to familiarise
          yourself with the basic hand rankings and rules that govern Texas
          Hold’em.<br/> Here are the 10 hands every player should know before joining
          the action.
        </p>
        <div className="hands">
          <div>
            <h3>Royal Straight Flush</h3>
            <img
              className="ruleExemple"
              src="/howtoplay-assets/royal-flush.png"
              alt="Royal Straight Flush"
            />
          </div>
          <div>
            <h3>Straight Flush</h3>
            <img
              className="ruleExemple"
              src="/howtoplay-assets/straight-flush.webp"
              alt="Straight Flush"
            />
          </div>
          <div>
            <h3>Four of a Kind</h3>
            <img
              className="ruleExemple"
              src="/howtoplay-assets/four-of-a-kind.webp"
              alt="Four of a Kind"
            />
          </div>
          <div>
            <h3>Full House</h3>
            <img
              className="ruleExemple"
              src="/howtoplay-assets/full-house.png"
              alt="Full House"
            />
          </div>
          <div>
            <h3>Flush</h3>
            <img
              className="ruleExemple"
              src="/howtoplay-assets/flush.webp"
              alt="Flush"
            />
          </div>
          <div>
            <h3>Straight</h3>
            <img
              className="ruleExemple"
              src="/howtoplay-assets/Straight.webp"
              alt="Straight"
            />
          </div>
          <div>
            <h3>Three of a Kind</h3>
            <img
              className="ruleExemple"
              src="/howtoplay-assets/three-of-a-kind.png"
              alt="Three of a Kind"
            />
          </div>
          <div>
            <h3>Two Pair</h3>
            <img
              className="ruleExemple"
              src="/howtoplay-assets/two-pair.webp"
              alt="Two Pair"
            />
          </div>
          <div>
            <h3>Pair</h3>
            <img
              className="ruleExemple"
              src="/howtoplay-assets/pair.webp"
              alt="Pair"
            />
          </div>
          <div>
            <h3>High Card</h3>
            <img
              className="ruleExemple"
              src="/howtoplay-assets/high-card.png"
              alt="High Card"
            />
          </div>
        </div>
        <div className="gettingStarted">
          <h3>Getting Started</h3>
          <p>
            Poker games typically feature a forced bet, such as the Big Blind
            and Small Blind in Hold’em and Omaha.<br/> These forced bets comprise the
            starting pot in any given hand of poker, which is the first
            incentive players have to win the hand.<br/> Action arising from the
            subsequent rounds of betting further increases the size of the pot.
          </p>
        </div>
        <div className="dealingCards">
          <h3>Dealing Cards and Betting Rounds</h3>
          <p>
            After any initial cards are dealt, players are usually called upon
            to act in turn, moving clockwise around the table.<br/> Each player can
            usually take one of the following actions when it is their turn to
            act:
          </p>
          <ul>
            <li>
              <b>Check</b> – To check is to decline the opportunity to open the
              betting. Players can only check when there is no bet during the
              current round, and the act of checking passes the action clockwise
              to the next person in the hand. <br/>If all active players check, those
              players remain in the hand and the round is considered complete.
            </li>
            <li>
              <b>Bet</b> – Players may bet if no other players have bet during
              the current round. Once a bet has been made, other players must
              ‘call’ by matching the amount bet, in order to remain in the hand.
            </li>
            <li>
              <b>Fold</b> – Players who fold forfeit their cards and cannot win
              or act again during the current hand.
            </li>
            <li>
              <b>Call</b> – Players can call if other players have bet during
              the current round; this requires the calling player to match the
              highest bet made.
            </li>
            <li>
              <b>Raise</b> – Players may raise if other players have bet during
              the current round; this requires the raising player to match the
              highest bet made, and then make a greater one. <br/>All subsequent
              players are required to call the raise or raise again (‘re-raise’)
              to stay in the hand.
            </li>
          </ul>
          <p>
            Different variants of poker have different betting rounds.<br/> Texas
            Hold’em and Omaha are the two most popular poker games in the world
            and have identical betting structures, with four rounds of betting
            known as pre-flop, the flop, the turn and the river.
          </p>
          <p>
            The <b>pre-flop</b> betting round begins as soon as all players have
            received their hole cards, before any community cards have been<br/>
            dealt; betting on <b>the flop</b> occurs after the first three
            community cards are dealt; on <b>the turn</b> after the fourth
            community card; and on
            <b>the river</b> after the fifth and final community card.
          </p>
          <p>
            On each betting round, betting continues until every player has
            either matched the bets made or folded<br/> (if no bets are made, the
            round is complete when every player has checked). When the betting
            round is completed, the next dealing/betting round begins, or the
            hand is complete.
          </p>
          <p>
            Here’s an example of a Texas Hold’em hand after all the cards have
            been dealt. As you can see, players may use any of their two hole
            cards with any of the five community cards to make the best<br/>
            five-card hand they can make - in this case, you can use both your
            hole cards and three of the shared community cards to make a
            straight.
          </p>
          <img
            className="tableExample"
            src="/rules-assets/table.png"
            alt="Table Example"
          />
          <ol>
            <li>Your opponents’ hole cards</li>
            <li>Community Cards</li>
            <li>Your hole cards</li>
          </ol>
        </div>
        <div className="showdown">
          <h3>Showdown</h3>
          <p>
            Once the last bet or raise has been called during the final round of
            betting, a showdown occurs; the remaining active players must show
            or ‘declare’ their hands, and the player(s) with the best <br/>ranking
            hand(s) win the pot.
          </p>
          <p>
            Players often show their hands in order, rather than all at the same
            time. Multiple players can share a single pot, with the pot divided
            in different ways depending on the game rules and how each<br/> player’s
            hand ranks against their opponents.
          </p>
        </div>
        <div className="bettingLimits">
          <h3>Betting Limits</h3>
          <p>
            Betting limits refer to the amount players may open and raise.
            Typically, poker games are of the following types; no limit, pot
            limit or fixed limit.
          </p>
          <ul>
            <li>
              No Limit – in poker games with a no limit betting structure, each
              player can bet or raise by any amount up to and including their
              full stack (the total number of chips they possess at any given
              time) in any betting round, whenever it is their turn to act.
            </li>
            <li>
              Pot Limit – in poker games with a pot limit betting structure,
              each player can bet or raise by any amount up to and including the
              size of the total pot at that time.
            </li>
            <li>
              Fixed Limit – in poker games with a fixed limit betting structure,
              each player can choose to call, bet or raise, but only by a fixed
              amount. The fixed amount for any given betting round is set in
              advance.
            </li>
            <p>
              For No Limit and Pot Limit games, the ‘Stakes’ column in the
              PokerStars lobby indicates the Small Blind and Big Blind in that
              game, while for Mixed Games, the Stakes listed in the lobby are
              the betting amounts for Limit games; in Pot Limit and No Limit
              rounds, the blinds are usually half of the blinds in limit games.
            </p>
          </ul>
        </div>
        <div className="tableStakes">
          <h3>Table Stakes and All-in</h3>
          <p>
            You may have seen a poker scene in a movie or on TV where a player
            is faced with a bet for more chips than they have at the table, and
            is forced to wager a watch, a car or some other possession<br/> in order
            to stay in the hand. This may make for good drama, but it is not
            generally the way poker is played in real life!
          </p>
          <p>
            All games on our site are played ‘table stakes’, meaning only the
            chips in play at the beginning of each hand can be used during the
            hand.<br/> The table stakes rule has an application called the ‘All-In’
            rule, which states that a player cannot be forced to forfeit a poker
            hand because the player does not have enough chips to call a bet.
          </p>
          <p>
            A player who does not have enough chips to call a bet is declared
            All-In. The player is eligible for the portion of the pot up to the
            point of his final wager. All<br/> further action involving other players
            takes place in a ‘side pot’, which the All-In player is not eligible
            to win. If more than one player goes All-In during a hand, there
            could be more than one side pot.
          </p>
        </div>
      </div>
    </div>
  );
}
