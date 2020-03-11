import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

// Modules
import { SharedModule } from './shared/shared.module';
// Services
import { SchoolService } from './services/school.service';

import { AppComponent } from './app.component';
import { AddSchoolFormComponent } from './add-school-form/add-school-form.component';
import { SchoolGridComponent } from './school-grid/school-grid.component';

@NgModule({
  declarations: [
    AppComponent,
    AddSchoolFormComponent,
    SchoolGridComponent,
  ],
  imports: [
    SharedModule,
    BrowserModule
  ],
  providers: [
    SchoolService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
