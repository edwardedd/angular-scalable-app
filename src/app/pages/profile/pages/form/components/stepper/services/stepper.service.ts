import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import { filter } from 'rxjs/operators';


export interface Step {
  key: string;
  label: string;
}

export interface ActiveStep extends Step {
  index: number;
}

@Injectable()
export class StepperService {

  step: Step[];
  activeStep: ActiveStep;

  next = new Subject<boolean>();
  next$: Observable<boolean>;

  prev = new Subject<boolean>();
  prev$ = this.prev.asObservable();

  complete = new Subject<boolean>();
  complete$: Observable<boolean>;


  cancel = new Subject<boolean>();
  cancel$: Observable<boolean>;

  check = new Subject<'next' | 'complete'>();
  check$ = this.check.asObservable();

  constructor() {
    this.next$ = this.next.asObservable().pipe(
      filter(isOk => isOk)
    );
    this.complete$ = this.complete.asObservable().pipe(
      filter(isOk => isOk)
    )
   }

  init(step:Step[]): void {
    this.step = step;
    this.activeStep = { ...step[0],index: 0 };
  }

  onNext() {
    // this.stepper.check.next('next');
    const index = this.activeStep.index + 1;
    this.activeStep = { ...this.step[index], index }
}

  onPrev(): void {
    const index = this.activeStep.index - 1;
    this.activeStep = { ...this.step[index], index };
}


}
