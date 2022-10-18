
export class Player {
    #username
    #chips
    #cards
    constructor(username, chips){
        this.#username = username
        this.#chips = chips
        this.#cards = []
    }

    giveCard(card) {
        this.#cards.push(card)
    }

    takeCardsBack(){
        this.#cards = []
    }

    takePot(pot){
        this.#chips += pot
    }

    bet(amount){
        this.#chips -= amount
    }

    getUsername() {
        return this.#username
    }

    getChips() {
        return this.#chips
    }
    
    getCards() {
        return this.#cards
    }
}