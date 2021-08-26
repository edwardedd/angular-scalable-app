import { DisplayModule } from './pages/display/display.module';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'new',
    loadChildren: ()=> import('./pages/form/form.module').then(m => m.FormModule)
  },
  {
    path: 'edit',
    loadChildren: ()=> import('./pages/form/form.module').then(m => m.FormModule)
  },
  {
    path: 'new',
    loadChildren: ()=> import('./pages/display/display.module').then(m => m.DisplayModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProfileRoutingModule { }
