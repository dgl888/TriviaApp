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

  public questions: IQuestion[] = [];
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

    console.log(this.apiUrl)
    this.http.get<any>(this.apiUrl).subscribe((data) => {
      console.log(data)
      this.questions = data.results;
      console.log(this.questions);
    });
  }

  private setupUrl() {
    this.activatedRoute.queryParams.subscribe(data => {
      this.difficulty = data['difficulty'];
      this.category = data['category'];
    })
  }
}
