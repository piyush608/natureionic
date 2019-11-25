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
import { HomeComponent } from "./components/home/home.component";
import { CommunityComponent } from "./components/community/community.component";
import { InspirationComponent } from "./components/inspiration/inspiration.component";
import { ProfileComponent } from "./components/profile/profile.component";
import { PopoverMenuComponent } from "./components/popover-menu/popover-menu.component";
import { LoginComponent } from "./components/login/login.component";
import { SignupComponent } from "./components/signup/signup.component";
import { OnboardingComponent } from "./components/onboarding/onboarding.component";
import { CommonModule } from "@angular/common";
import { RecipeCardComponent } from "./components/recipe-card/recipe-card.component";
import { ProductCardComponent } from "./components/product-card/product-card.component";
import { EditProfileComponent } from "./components/edit-profile/edit-profile.component";
import { AddBlogComponent } from "./components/add-blog/add-blog.component";
import { AddVlogComponent } from "./components/add-vlog/add-vlog.component";
import { BlogCardComponent } from "./components/blog-card/blog-card.component";
import { VlogCardComponent } from "./components/vlog-card/vlog-card.component";
import { AccountComponent } from "./components/account/account.component";
import { SecurityComponent } from "./components/security/security.component";
import { NewslettersComponent } from "./components/newsletters/newsletters.component";
import { NotificationsComponent } from "./components/notifications/notifications.component";
import { ReportComponent } from "./components/report/report.component";
import { DeactivateAccountComponent } from "./components/deactivate-account/deactivate-account.component";
import { ListComponent } from "./components/list/list.component";
import { AddForumComponent } from "./components/add-forum/add-forum.component";
import { ViewForumComponent } from "./components/view-forum/view-forum.component";
import { ForumCardComponent } from "./components/forum-card/forum-card.component";
import { AddGroupComponent } from "./components/add-group/add-group.component";

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SignupComponent,
    OnboardingComponent,
    HomeComponent,
    CommunityComponent,
    InspirationComponent,
    ProfileComponent,
    AddBusinessComponent,
    ViewBusinessComponent,
    AddRecipeComponent,
    AddProductComponent,
    AddBlogComponent,
    AddVlogComponent,
    AddForumComponent,
    AddGroupComponent,
    SuccessModalComponent,
    ViewProductComponent,
    ViewRecipeComponent,
    ViewForumComponent,
    NotFoundComponent,
    FooterComponent,
    PopoverMenuComponent,
    RecipeCardComponent,
    ProductCardComponent,
    EditProfileComponent,
    BlogCardComponent,
    VlogCardComponent,
    AccountComponent,
    SecurityComponent,
    NewslettersComponent,
    NotificationsComponent,
    ReportComponent,
    DeactivateAccountComponent,
    ListComponent,
    ForumCardComponent
  ],
  entryComponents: [
    SuccessModalComponent,
    FooterComponent,
    PopoverMenuComponent
  ],
  imports: [
    BrowserModule,
    CommonModule,
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
