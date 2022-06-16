import Option from "./Option";

export default interface Question {
    areas: string[];
    enum: string;
    filename: string;
    number: string;
    options: Option[];
    valid: boolean | null;
    id: number;
}