export interface Question {
    id: number;
    question: string;
    options: option[];
    answerId: number;
    userSelectedAnswerId: number;
}

export interface option{
    id: number;
    value: string;
}