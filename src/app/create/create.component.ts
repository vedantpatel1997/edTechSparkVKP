import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Category } from '../Model/Category';
import { Course } from '../Model/Course';
import { Mentor } from '../Model/Mentor';
import { CourseService } from '../services/course.service';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styles: [
  ]
})

export class CreateComponent implements OnInit {
  id: number | undefined;
  userForm: FormGroup
  course: Course | any;
  mentors: Mentor[] | any;
  categories: Category[] | any;

  constructor(private fb: FormBuilder, private route: ActivatedRoute, private courseService: CourseService, private router: Router) {

    this.route.params.subscribe(p => {
      this.id = p['id'];
    })

    this.userForm = fb.group({
      name: [null, [Validators.required]],
      summary: [null, [Validators.required]],
      description: [null, [Validators.required]],
      difficultyType: [null, [Validators.required]],
      unitPrice: [null, [Validators.required]],
      demoUrl: [null, [Validators.required]],
      url: [null, [Validators.required]],
      imageUrl: [null, [Validators.required]],
      categoryId: [null, [Validators.required]],
      mentorId: [null, [Validators.required]],
    })
  }

  ngOnInit(): void {

    this.courseService.GetCategories().subscribe(res => {
      this.categories = res;
    })

    this.courseService.GetMentors().subscribe(res => {
      this.mentors = res;
    })

    if (this.id !== undefined) {
      this.courseService.GetCoursWithDetail(this.id).subscribe(res => {
        this.course = res;

        this.userForm.setValue({
          name: this.course.name,
          summary: this.course.summary,
          description: this.course.description,
          difficultyType: this.course.difficultyType,
          unitPrice: this.course.unitPrice,
          demoUrl: this.course.demoUrl,
          url: this.course.url,
          imageUrl: this.course.imageUrl,
          categoryId: this.course.categoryId,
          mentorId: this.course.mentorId
        })
      })
    }
  }

  SaveData() {
    if (this.id !== undefined && this.id > 0) {
      // this.course.name = this.userForm.value.name;
      // this.course.summary = this.userForm.value.summary;
      // this.course.description = this.userForm.value.description;
      // this.course.imageUrl = this.userForm.value.imageUrl;
      // this.course.demoUrl = this.userForm.value.demoUrl;
      // this.course.unitPrice = this.userForm.value.unitPrice;
      // this.course.difficultyType = this.userForm.value.difficultyType;
      // this.course.categoryId = this.userForm.value.categoryId;
      // this.course.mentorId = this.userForm.value.mentorId;

      this.course = this.userForm.value;
      this.course.id = this.id;
      console.log(this.course)
      this.courseService.UpdateCourse(this.course).subscribe(res => {
        if (res.status == 200) {
          alert(`Course is updated.`)
          this.router.navigateByUrl('')
        }
      })
    }

    if (this.id == undefined) {
      if (this.userForm.valid) {
        this.course = this.userForm.value
        this.courseService.AddCourse(this.course).subscribe(res => {
          if (res.status == 201) {
            alert(`Course is Successfully added.`)
            this.router.navigateByUrl('')
          }
        })
      } else {
        alert('Form is Invalid');
      }
    }
  }
}


