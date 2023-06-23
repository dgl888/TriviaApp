import {HttpClient} from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {ICategory} from '../../shared/category.model';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.scss']
})
export class LandingPageComponent implements OnInit {
  public categories: ICategory[] = [];
  public difficulties = [
    'Easy',
    'Medium',
    'Hard'
  ]

  public selectedCategory!: string;
  public selectedDifficulty!: string;

  private apiUrl = 'https://opentdb.com/api_category.php';

  constructor(private http: HttpClient, private router: Router) { }

  ngOnInit(): void {
    this.fetchData();
  }

  fetchData() {
    this.http.get<any>(this.apiUrl).subscribe((data) => {
      this.categories = data.trivia_categories;
    });
  }

  createQuiz() {
    this.router.navigate(['quiz'], {queryParams: {
      category: this.selectedCategory, difficulty: this.selectedDifficulty
    }});
  }

  onCategorySelected(value: string) {
    this.selectedCategory = value;
  }


  onDifficultySelected(value: string) {
    this.selectedDifficulty = value;
  }
}
