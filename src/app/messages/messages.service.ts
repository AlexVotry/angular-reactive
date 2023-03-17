import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {filter} from 'rxjs/operators';

@Injectable()
export class MessagesService {
  
  // create a mutable observable.
  private subject = new BehaviorSubject<string[]>([]);

  // set observable to subject value, filter out empty array
  error$: Observable<string[]> = this.subject.asObservable()
    .pipe(
      filter(messages => messages && messages.length > 0)
    );

  showErrors(...errors: string[]) {
    this.subject.next(errors);
  }
}