import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Categories, QuizQuestionList, TriviaCategories } from './model/quiz.model'
@Injectable({
  providedIn: 'root'
})
export class QuizService {

  constructor(private http: HttpClient) { }

  getQuizMakertriviaCategories(): Observable<Categories> {
    return this.http.get<Categories>('https://opentdb.com/api_category.php')
  }

  getQuizMakerQuestionList(amount: number, category: number, difficulty: string, type: string): Observable<QuizQuestionList> {
    return this.http.get<QuizQuestionList>(`https://opentdb.com/api.php?amount=${amount}&category=${category}&difficulty=${difficulty}&type=${type}`)
  }
}
