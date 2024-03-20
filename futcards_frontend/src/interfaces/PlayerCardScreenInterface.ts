export interface PlayerCardScreenInterface {
    nome: string;
    posicaoJogador: string | undefined;
    altura: number;
    massa: number;
    forca: number;
    velocidadeX: number;
    velocidadeY: number;
    aceleracao: number;
    id: number;
    screenPosition: string
}