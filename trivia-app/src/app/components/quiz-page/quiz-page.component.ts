import {HttpClient} from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {IQuestion} from '../../shared/results.model';

@Component({
  selector: 'app-quiz-page',
  templateUrl: './quiz-page.component.html',
  styleUrls: ['./quiz-page.component.scss']
})
export class QuizPageComponent implements OnInit {

  public isSubmitted: boolean = false;
  public questions: IQuestion[] = [];
  public finalScore: number = 0;
  private apiUrl = 'https://opentdb.com/api.php?amount=5';
  private difficulty: string = 'all';
  private category: string = 'all'

  constructor(private http: HttpClient, private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.setupUrl();
    this.fetchData();
  }

  fetchData() {
    if(this.category != 'all') {
      this.apiUrl = this.apiUrl.concat(`&category=${this.category}`);
    }

    if(this.difficulty != 'all') {
      this.apiUrl = this.apiUrl.concat(`&difficulty=${this.difficulty.toLowerCase()}`);
    }

    this.http.get<any>(this.apiUrl).subscribe((data) => {
      this.questions = data.results;
      this.randomizeAnswers();
    });
  }

  private setupUrl() {
    this.activatedRoute.queryParams.subscribe(data => {
      this.difficulty = data['difficulty'];
      this.category = data['category'];
    })
  }

  submit() {
    this.isSubmitted = true;
    if (this.questions.every(question => question.correct_answer == question.selectedAnswer)) {
      this.finalScore ++;
    }
  }

  randomizeAnswers() {
    this.questions.forEach( (question, index) => {
      this.questions[index].selectedAnswer = null;
      this.questions[index].all_answers = [...question.incorrect_answers, question.correct_answer];
      this.questions[index].all_answers.sort(() => Math.random() - 0.5);
    });
  }

  areAllAnswersSelected(): boolean {
    return this.questions.every(question => !!question.selectedAnswer);
  }

  getQuestionClass(answer: string, selectedAnswer: string | null, correct_answer: string) {
    if(this.isSubmitted) {
      if(answer == correct_answer) {
        return 'correct'
      } else if(answer == selectedAnswer && answer != correct_answer){
        return 'incorrect'
      } else {
        return '';
      }
    } else {
      return '';
    }
  }
}
