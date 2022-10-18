export function adicionarJogada(jogo, jogador, linha, coluna) {
  return {
    ...jogo,
    tabuleiro: jogo.tabuleiro.map((l, i) =>
      l.map((p, j) => (i === linha && j === coluna && p === "" ? jogador : p))
    ),
    jogadorAtual:
      jogo.tabuleiro[linha][coluna] === ""
        ? jogo.jogadorAtual === "X"
          ? "O"
          : "X"
        : jogo.jogadorAtual,
  };
}

export function obterJogadasPossiveis(jogo) {
  return jogo.tabuleiro.reduce(
    (jogadas, linha, i) =>
      jogadas.concat(
        linha
          .reduce(
            (colunas, pos, j) => (pos === "" ? colunas.concat(j) : colunas),
            []
          )
          .map((j) => ({ linha: i, coluna: j }))
      ),
    []
  );
}

export function verificarVencedor(jogo) {
  const linhas = obterLinhas(jogo);
  return linhas.includes("XXX")
    ? "X"
    : linhas.includes("OOO")
    ? "O"
    : undefined;
}

function obterLinhas(jogo) {
  const tabuleiro = jogo.tabuleiro;
  const linhas = jogo.tabuleiro.map((t) => t.join(""));
  const colunas = [];
  const diagonais = ["", ""];
  for (let i = 0; i < tabuleiro.length; i++) {
    diagonais[0] += tabuleiro[i][i];
    diagonais[1] += tabuleiro[i][tabuleiro.length - 1 - i];
    colunas.push(jogo.tabuleiro.map((l) => l[i]).join(""));
  }
  return linhas.concat(colunas).concat(diagonais);
}

export function verificarFimDoJogo(jogo) {
  return (
    Boolean(verificarVencedor(jogo)) || obterJogadasPossiveis(jogo).length === 0
  );
}

export const JOGO_INICIAL = {
  tabuleiro: [
    ["", "", ""],
    ["", "", ""],
    ["", "", ""],
  ],
  jogadorAtual: "X",
};
