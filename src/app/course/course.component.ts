
import { Course } from '../Model/Course';
import { CourseService } from '../services/course.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-course',
  templateUrl: './course.component.html',
  styles: [
  ]
})

export class CourseComponent implements OnInit {
  courses: Course[] | any;
  constructor(private courseService: CourseService) { }

  ngOnInit(): void {
    this.courseService.GetCourses().subscribe(res => {
      this.courses = res
      // console.log("Courses", this.courses)
    })

  }

  DeleteCourse(id: number) {
    this.courseService.DeleteCourse(id).subscribe(res => {
      if (res.status == 200) {        
        this.courseService.GetCourses().subscribe(res => {
          this.courses = res
        })
      }
    })
  }
}

console.log(`Hello Vedant Patel`)
