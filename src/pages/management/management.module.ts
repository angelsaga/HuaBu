import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ManagementPage } from './management';

@NgModule({
  declarations: [
    ManagementPage,
  ],
  imports: [
    IonicPageModule.forChild(ManagementPage),
  ],
  exports: [
    ManagementPage
  ]
})
export class ManagementPageModule {}
