import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CourseComponent } from './course/course.component';
import { CreateComponent } from './create/create.component';
import { DisplayCourseComponent } from './display-course/display-course.component';
import { Course } from './Model/Course';


const routes: Routes = [
  { path: 'displayCourse/:id', component: DisplayCourseComponent },
  { path: '', component: CourseComponent },
  { path: 'create', component: CreateComponent },
  { path: 'create/:id', component: CreateComponent }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
