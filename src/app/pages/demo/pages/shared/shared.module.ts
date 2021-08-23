import { ControlsModule } from './../../../../shared/controls/controls.module';
import { ButtonsModule } from './../../../../shared/buttons/buttons.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedRoutingModule } from './shared-routing.module';
import { SharedComponent } from './shared.component';
import { ReactiveFormsModule } from '@angular/forms';
import { IndicatorsModule, PopupsModule } from '@app/shared';


@NgModule({
  declarations: [SharedComponent],
  imports: [
    CommonModule,
    SharedRoutingModule,
    ButtonsModule,
    ReactiveFormsModule,
    ControlsModule,
    IndicatorsModule,
    PopupsModule
  ]
})
export class SharedModule { }
