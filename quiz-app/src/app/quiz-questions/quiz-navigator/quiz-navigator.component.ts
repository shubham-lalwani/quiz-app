import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-quiz-navigator',
  templateUrl: './quiz-navigator.component.html',
  styleUrls: ['./quiz-navigator.component.css']
})

export class QuizNavigatorComponent {

  @Output()
  selectedNavId: EventEmitter<number> = new EventEmitter();

  /**
   * @param id question id
   * trigger to change the question
   */
  navCliked(id:number) {
    this.selectedNavId.emit(id);
  }
}
