import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http'

import { environment } from 'src/environments/environment';
import { Course } from '../Model/Course';
import { Category } from '../Model/Category';
import { Mentor } from '../Model/Mentor';

@Injectable({
  providedIn: 'root'
})
export class CourseService {

  headers: HttpHeaders;

  constructor(private client: HttpClient) {
    this.headers = new HttpHeaders({ 'Content-Type': 'application/json' });
  }

  GetCourses(): Observable<Course[]> {
    return this.client.get<Course[]>(environment.apiAddress + 'Course/Getall');
  }
  GetCoursWithDetail(ID: number): Observable<Course> {
    return this.client.get<Course>(environment.apiAddress + 'Course/Get/' + ID);
  }

  AddCourse(course: Course): Observable<HttpResponse<any>> {
    return this.client.post<HttpResponse<any>>(environment.apiAddress + "Course/Add", course, { headers: this.headers, observe: 'response' });
  }

  UpdateCourse(course : Course): Observable<HttpResponse<any>> {
    return this.client.put<HttpResponse<any>>(environment.apiAddress + "Course/Update/" + course.id,
    course,{ headers :this.headers, observe:'response' });
  }

  DeleteCourse(id: number): Observable<HttpResponse<any>> {
    
    return this.client.delete<HttpResponse<any>>(environment.apiAddress + "Course/Delete/" + id, { observe: 'response' });
  }

  ////////////////////////////////////////////

  GetCategories(): Observable<Category[]> {
    return this.client.get<Category[]>(environment.apiAddress + 'Category/Getall');
  }

  ////////////////////////////////////////////
  GetMentors(): Observable<Mentor[]> {
    return this.client.get<Mentor[]>(environment.apiAddress + 'Mentor/GetAll');
  }

}
