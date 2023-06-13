import { Component, OnInit } from '@angular/core';
import { take } from 'rxjs';
import { Question } from './interface/question.interface';
import { QuizOptions } from './quiz-seletor.enum';
import { QuizAppService } from './services/quiz-app.service';
import { QuizFrame } from './quiz-frame.enum';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'quiz-app';
  quizOptions = QuizOptions;
  quizFrame = QuizFrame;
  displayQuizFrame: string = QuizFrame.QA;
  quizSelected: string = this.quizOptions.DESIGN_PATTERNS;
  readyToLoad: boolean = false;
  disableQuizSelector: any = {
    design_patterns: false,
    angular: false,
    java: false
  }

  constructor(private quizAppService: QuizAppService) { }

  ngOnInit() {
    this.resetUserAnswers()
  }

  quizChange(event: any) {
    this.quizSelected = event.target.value;
  }

  /**
   * Fetchs the objects for making userSelectedAnswerId = 0
   */
  resetUserAnswers() {
    this.quizAppService.getQuestions(this.quizOptions.DESIGN_PATTERNS)
      .pipe(take(1))
      .subscribe(res => {
        this.setAnswerstoZero(res, this.quizOptions.DESIGN_PATTERNS);
      })

    this.quizAppService.getQuestions(this.quizOptions.ANGULAR)
      .pipe(take(1))
      .subscribe(res => {
        this.setAnswerstoZero(res, this.quizOptions.ANGULAR);
      })

    this.quizAppService.getQuestions(this.quizOptions.JAVA)
      .pipe(take(1))
      .subscribe(res => {
        this.setAnswerstoZero(res, this.quizOptions.JAVA);
      })
  }

  /**
   * @param questionSet entire set of particular topic
   * @param quizOption a string contaning set keys 
   * Resets all the user answers to zero at the start
   */
  setAnswerstoZero(questionSet: Question[], quizOption: string) {
    questionSet.forEach(questionObj => {
      questionObj.userSelectedAnswerId = 0;
      this.quizAppService.saveUserAnswer(questionObj, quizOption)
        .pipe(take(1))
        .subscribe((res: any) => {
          if (res.id == 5 && this.quizOptions.JAVA == quizOption) {
            this.readyToLoad = true;
          }
        })
    })
  }

  /**
   * @param currentTopic selected topic from dropdown
   * disables the current topic and moves the user to next available topic
   */
  switchToNextQuiz(currentTopic: string) {
    this.disableQuizSelector[currentTopic] = true;
    for (let key in this.disableQuizSelector) {
      if (this.disableQuizSelector[key] == false) {
        this.quizSelected = key;
        break;
      }
    }
  }

  /**
   * toggle between questions frame to result frame
   */
  switchToResults() {
    this.displayQuizFrame = this.quizFrame.RESULT;
  }

  /**
   * @param ev boolean from event emitter
   * navigating back to QA and reset app
   */
  navToQA(ev: boolean) {
    if(ev == false) {
      return;
    }
    this.displayQuizFrame = this.quizFrame.QA;
    this.readyToLoad = false;
    this.disableQuizSelector = {
      design_patterns: false,
      angular: false,
      java: false
    }
    this.quizSelected = this.quizOptions.DESIGN_PATTERNS;
    this.resetUserAnswers();
  }
}
