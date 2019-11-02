import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { Routes, RouterModule } from "@angular/router";

import { IonicModule } from "@ionic/angular";

import { CommunityPage } from "./community.page";
import { FooterComponentModule } from "src/app/components/footer/footer.component.module";

const routes: Routes = [
  {
    path: "",
    component: CommunityPage
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
  declarations: [CommunityPage]
})
export class CommunityPageModule {}
