import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, } from '@angular/router';
import { QuizQuestionList, Results, selectedAns } from '../model/quiz.model';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-quiz-results',
  templateUrl: './quiz-results.component.html',
  styleUrls: ['./quiz-results.component.scss']
})

export class QuizResultsComponent implements OnInit {

  constructor(private router: Router) {

  }

  givenAnswer: selectedAns[] = [];
  questionList: Results[] = []
  ans = new BehaviorSubject<selectedAns[]>([]);
  que = new BehaviorSubject<Results[]>([]);
  correctAnsCount: number = 0


  ngOnInit(): void {
    this.ans = new BehaviorSubject(JSON.parse(localStorage.getItem('givenAns') ?? '{}'));
    this.ans.pipe().subscribe(val => {
      this.givenAnswer = val
    })
    this.que = new BehaviorSubject(JSON.parse(localStorage.getItem('question-list') ?? '{}'));
    this.que.pipe().subscribe(val => {
      this.questionList = val
    })

    this.questionList.filter((val, index) => {
      if (val.correct_answer === this.givenAnswer[index].ans) {
        this.correctAnsCount++
      }
    })
  }

  createNewQuiz() {
    this.router.navigate(['/quiz-maker']);
  }

}
