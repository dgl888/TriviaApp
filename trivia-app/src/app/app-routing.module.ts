import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {GradedPageComponent} from './components/graded-page/graded-page.component';
import {LandingPageComponent} from './components/landing-page/landing-page.component';
import {QuizPageComponent} from './components/quiz-page/quiz-page.component';

const routes: Routes = [
  {
    path: '', component: LandingPageComponent
  },
  {
    path: 'quiz', component: QuizPageComponent
  },
  {
    path: 'graded-quiz',component: GradedPageComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
