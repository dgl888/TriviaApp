import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {LandingPageComponent} from './components/landing-page/landing-page.component';
import {QuizPageComponent} from './components/quiz-page/quiz-page.component';

const routes: Routes = [
  {
    path: '', component: LandingPageComponent
  },
  {
    path: 'quiz', component: QuizPageComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
