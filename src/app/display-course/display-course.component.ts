import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Course } from '../Model/Course';
import { CourseService } from '../services/course.service';


@Component({
  selector: 'app-display-course',
  templateUrl: './display-course.component.html',
  styles: [
  ]
})

export class DisplayCourseComponent implements OnInit {
  course: Course | any;
  id: number | any;

  constructor(private route: ActivatedRoute, private courseService: CourseService) {
    this.route.params.subscribe(p => {
      this.id = p['id'];
    })
  }

  ngOnInit(): void {
    if (this.id != undefined) {
      this.courseService.GetCoursWithDetail(this.id).subscribe(res => {
        this.course = res;
      })

    }
  }
}
