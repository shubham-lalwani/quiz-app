export interface CategoryResults {
    designPattern: Category;
    angular: Category;
    java: Category;
}

export interface Category {
    text: string;
    score: number;
    total: number;
}