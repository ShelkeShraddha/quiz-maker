import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { QuizMakerComponent } from './quiz-maker/quiz-maker.component';
import { QuizResultsComponent } from './quiz-results/quiz-results.component';

const routes: Routes = [
  {
    path: 'quiz-maker',
    component: QuizMakerComponent
  },
  {
    path: 'quiz-result',
    component: QuizResultsComponent,
    
  },
  { path: '', redirectTo: 'quiz-maker', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
