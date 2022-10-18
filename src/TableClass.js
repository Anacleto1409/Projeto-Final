export class Table {
    #players
    #chat
    #bigBlind
    constructor(player, maxPlayers, bigBlind){
        this.#players = [player]
        this.#chat = []
        this.#bigBlind = bigBlind
    }
}