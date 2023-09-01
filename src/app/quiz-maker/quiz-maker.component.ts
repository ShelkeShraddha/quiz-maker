import { AfterViewInit, ChangeDetectionStrategy, Component, DoCheck, ElementRef, OnInit, QueryList, Renderer2, ViewChild, ViewChildren } from '@angular/core';
import { QuizService } from '../quiz.service';
import { DifficultyLevel, QuizQuestionList, Results, TriviaCategories, selectedAns } from '../model/quiz.model';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-quiz-maker',
  templateUrl: './quiz-maker.component.html',
  styleUrls: ['./quiz-maker.component.scss'],

})
export class QuizMakerComponent implements OnInit {
  triviaCategories: TriviaCategories[] = [];
  quizQuestionList: Results[] = [];
  activeAns: boolean = false;
  selectedAnsArr: selectedAns[] = []
  difficultyLevel: DifficultyLevel[] = [{ level: 'easy' }, { level: 'medium' }, { level: 'hard' }]
  difficultyFormControl = new FormControl();
  categoryFormControl = new FormControl();
  selectedAns: string = '';
  answerClicked: boolean = false;
  clickedAns: string = '';
  submitAns: boolean = true;
  element: HTMLElement;


  

  constructor(private quizService: QuizService, private router: Router, private ele: ElementRef, private renderer: Renderer2) {

  }
  ngOnInit(): void {
    this.selectedAnsArr = []
    this.quizService.getQuizMakertriviaCategories().subscribe(res => {
      this.triviaCategories = res.trivia_categories;
    })

  }

  



  onCreateClick() {
    this.selectedAnsArr = []
    this.quizService.getQuizMakerQuestionList(5, this.categoryFormControl.value, this.difficultyFormControl.value, 'multiple').subscribe(res => {
      this.quizQuestionList = res.results;
      this.quizQuestionList.map(ele => {
        ele.incorrect_answers.splice((ele.incorrect_answers.length + 1) * Math.random() | 0, 0, ele.correct_answer)
      })
    })
  }

  onAnsClick(que: string, ans: string, queIndex: number, ansIndex: number) {
    const btnIndex = queIndex.toString() + ansIndex.toString()
    let abc: selectedAns = { que: que, ans: ans, queIndex: queIndex, ansIndex: ansIndex }
    const itemIndex = this.selectedAnsArr.findIndex(o => o.queIndex === abc.queIndex);
    if (itemIndex > -1) {
      (<HTMLInputElement>document.getElementById(this.selectedAnsArr[itemIndex].queIndex.toString() + this.selectedAnsArr[itemIndex].ansIndex.toString())).className = 'nonSelectedBtn';
      this.selectedAnsArr[itemIndex] = abc;
      (<HTMLInputElement>document.getElementById(btnIndex)).className = 'selectedBtn';
    } else {
      this.selectedAnsArr.push(abc);
      (<HTMLInputElement>document.getElementById(btnIndex)).className = 'selectedBtn';
    }
    this.selectedAns = ans
    this.activeAns = true
    if (this.selectedAnsArr.length === this.quizQuestionList.length) {
      this.submitAns = false
    }
  }

  onSubmit() {
    localStorage.setItem('question-list', JSON.stringify(this.quizQuestionList))
    localStorage.setItem('givenAns', JSON.stringify(this.selectedAnsArr))
    this.router.navigate(['/quiz-result']);
  }
}
