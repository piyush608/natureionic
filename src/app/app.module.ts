import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { RouteReuseStrategy } from "@angular/router";

import { IonicModule, IonicRouteStrategy } from "@ionic/angular";
import { SplashScreen } from "@ionic-native/splash-screen/ngx";
import { StatusBar } from "@ionic-native/status-bar/ngx";

import { AppComponent } from "./app.component";
import { AppRoutingModule } from "./app-routing.module";
import { ServiceWorkerModule } from "@angular/service-worker";
import { environment } from "../environments/environment";

import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { TokenInterceptor } from "./interceptors/token.interceptor";
import { NavbarComponentModule } from "./components/navbar/navbar.component.module";
import { AddBusinessComponent } from "./components/add-business/add-business.component";
import { ViewBusinessComponent } from "./components/view-business/view-business.component";
import { AddRecipeComponent } from "./components/add-recipe/add-recipe.component";
import { AddProductComponent } from "./components/add-product/add-product.component";
import { SuccessModalComponent } from "./components/success-modal/success-modal.component";
import { ViewProductComponent } from "./components/view-product/view-product.component";
import { ViewRecipeComponent } from "./components/view-recipe/view-recipe.component";
import { NotFoundComponent } from "./components/not-found/not-found.component";
import { FooterComponent } from "./components/footer/footer.component";
import { AgmCoreModule } from "@agm/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

@NgModule({
  declarations: [
    AppComponent,
    AddBusinessComponent,
    ViewBusinessComponent,
    AddRecipeComponent,
    AddProductComponent,
    SuccessModalComponent,
    ViewProductComponent,
    ViewRecipeComponent,
    NotFoundComponent,
    FooterComponent
  ],
  entryComponents: [SuccessModalComponent, FooterComponent],
  imports: [
    BrowserModule,
    AgmCoreModule.forRoot({
      apiKey: environment.apiKey,
      libraries: ["places"]
    }),
    IonicModule.forRoot(),
    AppRoutingModule,
    HttpClientModule,
    NavbarComponentModule,
    FormsModule,
    ReactiveFormsModule,
    ServiceWorkerModule.register("ngsw-worker.js", {
      enabled: environment.production
    })
  ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent],
  schemas: [NO_ERRORS_SCHEMA]
})
export class AppModule {}
