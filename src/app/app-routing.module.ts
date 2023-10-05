import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainComponent } from './components/main/main.component';
import { RecordComponent } from './components/record/record.component';
import { EditRecordComponent } from './components/edit-record/edit-record.component';

const routes: Routes = [
  { path: 'main'    , component: MainComponent},
  { path: 'record'    , component: RecordComponent},
  { path: 'record/edit/:id'    , component: EditRecordComponent},
  { path: '**', redirectTo: 'main' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
