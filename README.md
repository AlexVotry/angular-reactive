# tutorial on reactive style Angular.

this Tutorial is from Udemy called `Reactive Angular Course (with RxJs, Angular 15)`

there is a mock server used 
- npm run server

then start Angular
- npm start.

this course goes over using Observables with Rxjs using separate instances.

We start with Stateless observable and compare it to the imperative style (using the component to handle the logic).
We created a stateless service with courses.service.ts. 

Reactive style is more like the way React works. Using presentational components instead of smart components. 

Next is adding Loading and Error components with services. We can put the providers at different levels to provide separate instances of the component.

State Management: Locally store Obsevables to avoid excessive API calls for data.
We created courses.store.ts for this.

auth: add authentication using local storage to stay logged in using auth.store.ts

ui: Master-Detail UI Pattern: works like props in React. Pass state to a child component. This way state only exists while in that component.

Single Data Observable Pattern: avoid nested ng-containers with different Observables. We combine multiple observables into an observable object. `course.component` shows assigning to the data object with "combineLateest" this works like PromiseAll([]). If we initialize each of the observables with "startWith()" we can show each as they get fetched rather than wait until all have been fetched.

