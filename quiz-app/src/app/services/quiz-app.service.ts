import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Question } from '../interface/question.interface';

@Injectable({
  providedIn: 'root'
})
export class QuizAppService {

  private host_url = "http://localhost:3000/";

  constructor(private httpClient: HttpClient) { }

  // gets all the questions based on selected quiz
  getQuestions(selectedQuiz: string): Observable<Question[]> {
    const question_endpoint_url = this.host_url + selectedQuiz;
    return this.httpClient.get<Question[]>(question_endpoint_url);
  }

  // uppdates user answer based on selected quiz and id
  saveUserAnswer(selectedAnswerObj: Question, selectedQuiz: string) {
    const update_endpoint_url = this.host_url + selectedQuiz + "/" + selectedAnswerObj.id;
    return this.httpClient.put(update_endpoint_url, selectedAnswerObj);
  }
}
