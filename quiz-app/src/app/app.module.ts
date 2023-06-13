import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { QuizQuestionsComponent } from './quiz-questions/quiz-questions.component';
import { QuizAppService } from './services/quiz-app.service';
import { HttpClientModule } from '@angular/common/http';
import { QuizNavigatorComponent } from './quiz-questions/quiz-navigator/quiz-navigator.component';
import { FormsModule } from '@angular/forms';
import { QuizResultComponent } from './quiz-result/quiz-result.component';

@NgModule({
  declarations: [
    AppComponent,
    QuizQuestionsComponent,
    QuizNavigatorComponent,
    QuizResultComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [QuizAppService],
  bootstrap: [AppComponent]
})
export class AppModule { }
