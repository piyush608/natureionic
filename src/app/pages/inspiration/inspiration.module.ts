import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { Routes, RouterModule } from "@angular/router";

import { IonicModule } from "@ionic/angular";

import { InspirationPage } from "./inspiration.page";
import { FooterComponentModule } from "src/app/components/footer/footer.component.module";

const routes: Routes = [
  {
    path: "",
    component: InspirationPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FooterComponentModule,
    RouterModule.forChild(routes)
  ],
  declarations: [InspirationPage]
})
export class InspirationPageModule {}
