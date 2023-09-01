export interface TriviaCategories {
    id: number,
    name: string
}

export interface Categories {
    trivia_categories: TriviaCategories[]

}

export interface DifficultyLevel {
    level: string
}

export interface QuizQuestionList {
    response_code: number,
    results: Results[];
}

export interface Results {
    category: string,
    correct_answer: string,
    difficulty: string,
    incorrect_answers: Array<string>,
    question: string,
    type: string
}

export interface selectedAns {
    que: string,
    ans: string,
    queIndex: number,
    ansIndex: number
}