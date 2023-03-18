import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable, throwError } from "rxjs";
import {map, catchError, tap, shareReplay} from 'rxjs/operators';
import { LoadingService } from "../loading/loading.service";
import { MessagesService } from "../messages/messages.service";
import { Course, sortCoursesBySeqNo } from "../model/course";

@Injectable({
  providedIn: 'root'
})
export class CoursesStore {

  private subject = new BehaviorSubject<Course[]>([]);
  courses$ : Observable<Course[]> = this.subject.asObservable();

  constructor(
    private http: HttpClient,
    private loading: LoadingService,
    private messages: MessagesService,
  ) {
    // inside the constructor, it loads function 
    this.loadAllCourses();
  }

  private loadAllCourses() {
    const loadCourse$ = this.http.get<Course[]>('/api/courses')
      .pipe(
        map(response => response["payload"]),
        catchError(err => {
          const message = "Could not load courses";
          this.messages.showErrors(message);
          console.log(message, err);
          return throwError(err);
        }),
        tap(courses => this.subject.next(courses)),
      );
    this.loading.showLoaderUntilCompleted(loadCourse$)
      .subscribe();
  };

  saveCourse(courseId:string, changes: Partial<Course>): Observable<any> {
    const courses = this.subject.getValue();
    const index = courses.findIndex(course => course.id = courseId);

    const newCourse: Course = {
      ...courses[index],
      ...changes
    };

    const newCourses: Course[] = [...courses];
    newCourses[index] = newCourse;
    
    this.subject.next(newCourses);
    console.log('thiscourse:', this.courses$)

    return this.http.put(`/api/courses/${courseId}`, changes).pipe(
      catchError((err) => {
        const message = "Could not save course";
        this.messages.showErrors(message);
        console.log(message, err);
        return throwError(err);
      }),
      shareReplay()
    );
  }

  filterByCategory(category: string): Observable<Course[]> {
    console.log('courses:',this.courses$)
    return this.courses$
      .pipe(
        map(courses => 
          courses.filter(course => course.category === category)
          .sort(sortCoursesBySeqNo)
        )
      )
  }
}