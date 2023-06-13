import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { ReplaySubject, takeUntil } from 'rxjs';
import { Question } from '../interface/question.interface';
import { QuizOptions } from '../quiz-seletor.enum';
import { QuizAppService } from '../services/quiz-app.service';

@Component({
  selector: 'app-quiz-questions',
  templateUrl: './quiz-questions.component.html',
  styleUrls: ['./quiz-questions.component.css']
})
export class QuizQuestionsComponent implements OnInit, OnChanges {

  private destroyed$: ReplaySubject<boolean> = new ReplaySubject(1);
  questions: Question[] = [];
  selectedQuestion: Question = <Question>{};
  selectedAnswerId: number | undefined;

  @Input()
  quizSelected: string = QuizOptions.DESIGN_PATTERNS;

  @Output()
  submittedPage: EventEmitter<string> = new EventEmitter;

  @Output()
  submittedAll: EventEmitter<boolean> = new EventEmitter;

  constructor(private quizAppService: QuizAppService) { }

  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes?.["quizSelected"].currentValue) {
      this.getQuestions(this.quizSelected)
    }
  }

  /**
   * @param selectedQuiz  gets questions based on selected quiz
   * defaulted to design pattern
   */
  getQuestions(selectedQuiz: string = "design_patterns") {
    this.quizAppService.getQuestions(selectedQuiz)
      .pipe(takeUntil(this.destroyed$))
      .subscribe((res: Question[]) => {
        this.questions = res;
        this.selectedQuestion = res[0];
      })
  }

  /**
   * @param id questions id
   * trigger for id change
   */
  navIdChanged(id: number) {
    this.setQuestionById(id);
  }

  /**
   * takes to previous Questions
   * least possible is 1st question
   */
  preQuestion() {
    let prevId = this.selectedQuestion.id - 1;

    if (prevId < 1) {
      prevId = 1;
    }
    this.setQuestionById(prevId);
  }

   /**
   * takes to next Questions
   * Maximum possible is 5th question
   */
  nextQuestion() {
    let nextId = this.selectedQuestion.id + 1;

    if (nextId > 5) {
      nextId = 5;
    }
    this.setQuestionById(nextId);
  }

  /**
   * @param id question id
   * Changes the selected question w.r.t id
   */
  setQuestionById(id: number) {
    this.questions.forEach((obj) => {
      if (obj.id == id) this.selectedQuestion = obj;
    })
  }

  /**
   * @param selectedQuestion question obj
   * @param userAnswerId user selected answer id
   */
  answerSelected(selectedQuestion: Question, userAnswerId: number) {
    selectedQuestion.userSelectedAnswerId = userAnswerId;
    this.quizAppService.saveUserAnswer(selectedQuestion, this.quizSelected)
      .pipe(takeUntil(this.destroyed$))
      .subscribe((res) => {
      })
  }

  submitPage() {
    this.submittedPage.emit(this.quizSelected);
  }

  submitAll() {
    this.submittedAll.emit(true);
  }

  /**
   * @returns string of quiz title
   */
  getQuizTitle(): string {
    let title = "";
    switch (this.quizSelected) {
      case QuizOptions.DESIGN_PATTERNS:
        title = "Design Patterns";
        break;
      case QuizOptions.ANGULAR:
        title = "Angular";
        break;
      case QuizOptions.JAVA:
        title = "Java";
        break;
    }
    return title;
  }

  ngOnDestroy() {
    this.destroyed$.next(true);
    this.destroyed$.complete();
  }
}