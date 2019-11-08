import { NgModule } from "@angular/core";
import { NavbarComponent } from "./navbar.component";
import { IonicModule } from "@ionic/angular";
import { CommonModule } from "@angular/common";

@NgModule({
  declarations: [NavbarComponent],
  imports: [IonicModule, CommonModule],
  exports: [NavbarComponent]
})
export class NavbarComponentModule {}
