import { HttpClient, HttpHeaders } from '@angular/common/http';
import {Injectable} from '@angular/core';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { Course } from '../model/course';
import { Lesson } from '../model/lesson';

@Injectable({
  providedIn:'root',
})
export class CoursesService {

  constructor(private http:HttpClient) {}

  private baseUrl = '/api/courses';

  loadAllCourses(): Observable<Course[]> {
    return this.http.get<Course[]>(this.baseUrl)
      .pipe(
        map(res => res["payload"]),
        shareReplay()
      );
  };

  httpOptions = new HttpHeaders({ 'Content-Type': 'application/json' });

  saveCourse(courseId:string, changes: Partial<Course>): Observable<any> {
    return this.http.put<Course>(`${this.baseUrl}/${courseId}`, changes)
      .pipe(
        shareReplay()
      );
  }

  searchLessons(search:string): Observable<Lesson[]> {
    return this.http.get<Lesson[]>('/api/lessons', {
      params: {
        filter: search,
        pageSize: "100"
      }
    })
      .pipe(
        map(res => res["payload"]),
        shareReplay()
      )
  }

}