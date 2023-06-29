import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {IQuestion} from '../../shared/results.model';

@Component({
  selector: 'app-graded-page',
  templateUrl: './graded-page.component.html',
  styleUrls: ['./graded-page.component.scss']
})
export class GradedPageComponent implements OnInit {
  public questions: IQuestion[] = [];
  public finalScore: number = 0;

  constructor(private router: Router) {
    let state = this.router.getCurrentNavigation()?.extras.state;
    if (state) {
      console.log(state);
      console.log(state);
      this.questions = state['questions'];
      this.finalScore = state['finalScore'];
    }
  }

  ngOnInit(): void {
  }

  getQuestionClass(answer: string, selectedAnswer: string | null, correct_answer: string) {
    if(answer == correct_answer) {
      return 'correct'
    } else if(answer == selectedAnswer && answer != correct_answer){
      return 'incorrect'
    } else {
      return '';
    }
  }

  setClass() {
    return this.finalScore === 0 || this.finalScore === 1 ? 'fail' : this.finalScore === 2 || this.finalScore === 3 ? 'pass' : 'success';
  }
}
