import { StepperService } from './services/stepper.service';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StepperComponent } from './stepper.component';



@NgModule({
  declarations: [
    StepperComponent
  ],
  imports: [
    CommonModule
  ],
  providers: [StepperService],
  exports: [StepperComponent]
})
export class StepperModule { }
