import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { take } from 'rxjs';
import { Question } from '../interface/question.interface';
import { CategoryResults } from '../interface/result.interface';
import { QuizOptions } from '../quiz-seletor.enum';
import { QuizAppService } from '../services/quiz-app.service';

@Component({
  selector: 'app-quiz-result',
  templateUrl: './quiz-result.component.html',
  styleUrls: ['./quiz-result.component.css']
})
export class QuizResultComponent implements OnInit {

  @Output()
  navToQA: EventEmitter<boolean> = new EventEmitter();

  quizOptions = QuizOptions;
  correctAnswers: CategoryResults = {
    designPattern: { text: "Design Patterns", score: 0, total: 5 },
    angular: { text: "Angular", score: 0, total: 5 },
    java: { text: "Java", score: 0, total: 5 },
  }
  correctCount: number = 0;

  constructor(private quizAppService: QuizAppService) { }

  ngOnInit() {
    this.getCorrectCount();
  }

  /**
   * Calculates all the Individual count and summ for total count
   */
  getCorrectCount() {
    this.quizAppService.getQuestions(this.quizOptions.DESIGN_PATTERNS)
      .pipe(take(1))
      .subscribe(res => {
        this.getIndividualCount(res, this.quizOptions.DESIGN_PATTERNS);
      })

    this.quizAppService.getQuestions(this.quizOptions.ANGULAR)
      .pipe(take(1))
      .subscribe(res => {
        this.getIndividualCount(res, this.quizOptions.ANGULAR);
      })

    this.quizAppService.getQuestions(this.quizOptions.JAVA)
      .pipe(take(1))
      .subscribe(res => {
        this.getIndividualCount(res, this.quizOptions.JAVA);
        this.correctCount = this.correctAnswers.designPattern.score + this.correctAnswers.angular.score + this.correctAnswers.java.score;
      })
  }

  /**
   * @param set all the questions from a topic
   * @param quizOption a string contaning set keys
   * compares the user answers with correct id and stores in object
   */
  getIndividualCount(set: Question[], quizOption: string) {
    set.forEach(question => {
      if (question.answerId == question.userSelectedAnswerId) {
        switch (quizOption) {
          case this.quizOptions.DESIGN_PATTERNS:
            this.correctAnswers.designPattern.score++;
            break;

          case this.quizOptions.ANGULAR:
            this.correctAnswers.angular.score++;
            break;

          case this.quizOptions.JAVA:
            this.correctAnswers.java.score++;
            break;
        }
      }
    })
  }

  displayQA() {
    // Nav to required page
  }

}