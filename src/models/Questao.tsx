import Opcao from "./Opcao";

export default interface Questao {
    areas: string[];
    enum: string;
    filename: string;
    number: string;
    options: Opcao[];
}