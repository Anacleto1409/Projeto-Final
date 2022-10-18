import { getForce, handToString } from "./rules"

//recebe cartas comunitarias e um array das cartas dos jogadores e retorna um array dos vencedores
export function getWinners(communityCards, playersCards) {
    const highHand = playersCards.reduce((acc, cards) => getWinner2Players(communityCards, acc, cards) === 1 ? acc : cards)
    return playersCards.filter(cards => getWinner2Players(communityCards, highHand, cards) === 0)
}

//Compara dois jogadores e retorna qual o vencedor, se for empate retorna 0
function getWinner2Players(communityCards, playerOneCards, playerTwoCards) {
    const forceOne = getForce(communityCards, playerOneCards)
    const forceTwo = getForce(communityCards, playerTwoCards)
    if (forceOne === forceTwo)
        return isDraw(communityCards, playerOneCards, playerTwoCards, forceOne)
    return forceOne > forceTwo ? 1 : 2
}

//Se playerOne venceu return 1, se playerTwo venceu return 2, se for empate retorna 0
function isDraw(communityCards, playerOneCards, playerTwoCards, force) {
    const oneCards = communityCards.concat(playerOneCards).map(e => e.value === 1 ? { ...e, value: 14 } : e).sort((a, b) => b.value - a.value)
    const twoCards = communityCards.concat(playerTwoCards).map(e => e.value === 1 ? { ...e, value: 14 } : e).sort((a, b) => b.value - a.value)
    switch (force) {
        case 0: return highCard(5, oneCards, twoCards)
        case 1: return highPair(oneCards, twoCards)
        case 2: return highTwoPair(oneCards, twoCards)
        case 3: return highThreeOfAKind(oneCards, twoCards)
        case 4: return highStraight(oneCards, twoCards)
        case 5: return highFlush(oneCards, twoCards)
        case 6: return highFullHouse(oneCards, twoCards)
        case 7: return highFourOfAKind(oneCards, twoCards)
        case 8: return highStraightFlush(oneCards, twoCards)
    }
}

function highCard(totalCards, oneCards, twoCards) {
    for (let i = 0; i < totalCards; i++) {
        if (oneCards[i].value > twoCards[i].value)
            return 1
        else if (oneCards[i].value < twoCards[i].value)
            return 2
    }
    return 0
}

function highPair(oneCards, twoCards) {
    const pairValueOne = oneCards.filter((card, i, array) => array.filter(e => e.value === card.value).length > 1)[0]
    const pairValueTwo = twoCards.filter((card, i, array) => array.filter(e => e.value === card.value).length > 1)[0]
    if (pairValueOne.value === pairValueTwo.value)
        return highCard(
            3,
            oneCards.filter((card, i, array) => array.filter(e => e.value === card.value).length === 1),
            twoCards.filter((card, i, array) => array.filter(e => e.value === card.value).length === 1)
        )
    return pairValueOne.value > pairValueTwo.value ? 1 : 2
}

function highTwoPair(oneCards, twoCards) {
    const firstPairValueOne = oneCards.filter((card, i, array) => array.filter(e => e.value === card.value).length > 1)[0]
    const firstPairValueTwo = twoCards.filter((card, i, array) => array.filter(e => e.value === card.value).length > 1)[0]
    const secondPairValueOne = oneCards.filter((card, i, array) => array.filter(e => e.value === card.value).length > 1)[2]
    const secondPairValueTwo = twoCards.filter((card, i, array) => array.filter(e => e.value === card.value).length > 1)[2]
    const kickerOne = oneCards.filter((card, i, array) => array.filter(e => e.value === card.value).length === 1)[0]
    const kickerTwo = twoCards.filter((card, i, array) => array.filter(e => e.value === card.value).length === 1)[0]
    if (firstPairValueOne.value === firstPairValueTwo.value) {
        if (secondPairValueOne.value === secondPairValueTwo.value) {
            if (kickerOne.value === kickerTwo.value)
                return 0
            return kickerOne.value > kickerTwo.value ? 1 : 2
        }
        return secondPairValueOne.value > secondPairValueTwo.value ? 1 : 2
    }
    return firstPairValueOne.value > firstPairValueTwo.value ? 1 : 2
}

function highThreeOfAKind(oneCards, twoCards) {
    const threeValueOne = oneCards.filter((card, i, array) => array.filter(e => e.value === card.value).length > 1)[0]
    const threeValueTwo = twoCards.filter((card, i, array) => array.filter(e => e.value === card.value).length > 1)[0]
    if (threeValueOne.value === threeValueTwo.value)
        return highCard(
            2,
            oneCards.filter((card, i, array) => array.filter(e => e.value === card.value).length === 1),
            twoCards.filter((card, i, array) => array.filter(e => e.value === card.value).length === 1)
        )
    return threeValueOne.value > threeValueTwo.value ? 1 : 2
}

function highStraight(oneCards, twoCards) {
    const straightOne = getStraight(oneCards)
    const straightTwo = getStraight(twoCards)
    if (straightOne[0].value === straightTwo[0].value)
        return 0
    return straightOne[0].value > straightTwo[0].value ? 1 : 2
}

function getStraight(allCards) {
    let straight = []
    for (let i = 0; i < allCards.length; i++) {
        if (allCards[i].value === allCards[i + 1]?.value + 1) {
            straight.push(allCards[i])
            straight.push(allCards[i + 1])
        }
        else if (allCards[i].value === 2 && allCards[0].value === 14) {
            straight.push(allCards[i])
            straight.push(allCards[0])
        }
        else
            straight = []
        const filterStraight = [...new Set(straight)]
        if (filterStraight.length === 5) {
            return filterStraight
        }
    }
    return "Error"
}

function highFlush(oneCards, twoCards) {
    const flushOne = oneCards.filter(card => oneCards.filter(e => e.suit === card.suit).length >= 5)
    const flushTwo = twoCards.filter(card => twoCards.filter(e => e.suit === card.suit).length >= 5)
    return highCard(5, flushOne, flushTwo)
}

function highFullHouse(oneCards, twoCards) {
    const fullHouseOne = oneCards.filter((card, i, array) => array.filter(e => e.value === card.value).length > 1).slice(0, 5)
    const fullHouseTwo = twoCards.filter((card, i, array) => array.filter(e => e.value === card.value).length > 1).slice(0, 5)
    const threeOne = fullHouseOne.filter((card, i, array) => array.filter(e => e.value === card.value).length === 3)[0]
    const threeTwo = fullHouseTwo.filter((card, i, array) => array.filter(e => e.value === card.value).length === 3)[0]
    const pairOne = fullHouseOne.filter((card, i, array) => array.filter(e => e.value === card.value).length === 2)[0]
    const pairTwo = fullHouseTwo.filter((card, i, array) => array.filter(e => e.value === card.value).length === 2)[0]
    if (threeOne.value === threeTwo.value) {
        if (pairOne.value === pairTwo.value)
            return 0
        return pairOne.value > pairTwo.value ? 1 : 2
    }
    return threeOne.value > threeTwo.value ? 1 : 2
}

function highFourOfAKind(oneCards, twoCards) {
    const fourValueOne = oneCards.filter((card, i, array) => array.filter(e => e.value === card.value).length > 1)[0]
    const fourValueTwo = twoCards.filter((card, i, array) => array.filter(e => e.value === card.value).length > 1)[0]
    if (fourValueOne.value === fourValueTwo.value)
        return highCard(
            1,
            oneCards.filter((card, i, array) => array.filter(e => e.value === card.value).length === 1),
            twoCards.filter((card, i, array) => array.filter(e => e.value === card.value).length === 1)
        )
    return fourValueOne.value > fourValueTwo.value ? 1 : 2
}

function highStraightFlush(oneCards, twoCards) {
    const suitsOne = oneCards.filter(card => oneCards.filter(e => e.suit === card.suit).length >= 5)
    const suitsTwo = twoCards.filter(card => twoCards.filter(e => e.suit === card.suit).length >= 5)
    const straightFlushOne = getStraight(suitsOne)
    const straightFlushTwo = getStraight(suitsTwo)
    for (let i = 0; i < 5; i++) {
        if (straightFlushOne[i].value !== straightFlushTwo[i].value)
            return straightFlushOne[i].value > straightFlushTwo[i].value ? 1 : 2
    }
    return 0
}
