import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { Routes, RouterModule } from "@angular/router";

import { IonicModule } from "@ionic/angular";

import { InspirationPage } from "./inspiration.page";
import { NavbarComponentModule } from "src/app/components/navbar/navbar.component.module";

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
    NavbarComponentModule,
    RouterModule.forChild(routes)
  ],
  declarations: [InspirationPage]
})
export class InspirationPageModule {}
