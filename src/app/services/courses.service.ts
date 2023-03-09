import { HttpClient } from '@angular/common/http';
import {Injectable} from '@angular/core';
import { Observable } from 'rxjs';
import { Course } from '../model/course';

@Injectable({
  providedIn:'root',
})
export class CoursesService {
  constructor(private http:HttpClient) {}
  private baseUrl = '/api/courses';

  loadAllCourses(): Observable<Course[]> {
    return this.http.get<Course[]>(this.baseUrl)
      .pipe(
        map(res => res["payload"])
      );
  };

}

// const courses: Course[] = res["payload"].sort(sortCoursesBySeqNo);

// this.beginnerCourses = courses.filter(
//   (course) => course.category == "BEGINNER"
// );

// this.advancedCourses = courses.filter(
//   (course) => course.category == "ADVANCED"
// );