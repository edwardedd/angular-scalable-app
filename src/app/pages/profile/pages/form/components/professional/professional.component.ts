import { RecruiterForm } from './roles/recruiter/recruiter.component';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { Subject } from 'rxjs';
import { StepperService } from '../stepper/services';
import { takeUntil } from 'rxjs/operators';
import { markFormGroupTouched } from '@app/shared/utils/form';
import { Dictionaries } from '@app/store/dictionaries';
import { regex, regexErrors } from '@app/shared';
import { EmployeeForm } from './roles/employee/employee.component';

// export interface ProfessionalForm {
//   about: string;
//   roleId: string;
//   role: RecruiterForm | EmployeeForm
// }

@Component({
  selector: 'app-professional',
  templateUrl: './professional.component.html',
  styleUrls: ['./professional.component.scss'],
  changeDetection:ChangeDetectionStrategy.OnPush
})
export class ProfessionalComponent implements OnInit, OnDestroy {

  @Input() value: any;
  @Input() dictionaries: Dictionaries;

  @Output() changed = new EventEmitter<any>();

  form: FormGroup;
  regexErrors = regexErrors;

  private destroy = new Subject<any>();

  constructor(
      private fb: FormBuilder,
      private cdr: ChangeDetectorRef,
      private stepper: StepperService
  ) { }

  ngOnInit(): void {

      this.form = this.fb.group({
          roleId: [null, {
              updateOn: 'change', validators: [
                  Validators.required
              ]
          }],
          about: [null,{
            updateOn: 'blur', validators: [
                Validators.required
            ]
        }]
      });

      if (this.value) {
          this.form.patchValue(this.value);
      }

      this.stepper.check$.pipe(takeUntil(this.destroy)).subscribe((type) => {
          if (!this.form.valid) {
              markFormGroupTouched(this.form);
              this.form.updateValueAndValidity();
              this.cdr.detectChanges();
          } else {
              this.changed.emit(this.form.value);
          }

          this.stepper[type].next(this.form.valid);
      });
  }

  ngOnDestroy() {
      this.destroy.next();
      this.destroy.complete();
  }

}
