import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MainComponent } from './components/main/main.component';
import { HeaderComponent } from './components/header/header.component';
import { HttpClientModule } from '@angular/common/http';
import { RecordComponent } from './components/record/record.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { OptionsComponent } from './components/options/options.component';
import { TooltipModule } from 'ng2-tooltip-directive';
import { EditRecordComponent } from './components/edit-record/edit-record.component';

@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    HeaderComponent,
    RecordComponent,
    OptionsComponent,
    EditRecordComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    TooltipModule,
    FormsModule
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
