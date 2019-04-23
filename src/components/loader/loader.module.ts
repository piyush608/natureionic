import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { LoaderComponent } from './loader';

@NgModule({
  declarations: [
    LoaderComponent
  ],
  exports: [
    LoaderComponent,
  ],
  imports: [
    CommonModule
  ],
})
export class LoaderComponentModule {}
