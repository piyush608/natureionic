import { NgModule } from "@angular/core";
import { PreloadAllModules, RouterModule, Routes } from "@angular/router";
import { AddBusinessComponent } from "./components/add-business/add-business.component";
import { ViewBusinessComponent } from "./components/view-business/view-business.component";
import { AddRecipeComponent } from "./components/add-recipe/add-recipe.component";
import { AddProductComponent } from "./components/add-product/add-product.component";
import { ViewRecipeComponent } from "./components/view-recipe/view-recipe.component";
import { ViewProductComponent } from "./components/view-product/view-product.component";
import { AuthGuardService as AuthGuard } from "./services/auth-guard.service";
import { NotFoundComponent } from "./components/not-found/not-found.component";
import { HomeComponent } from "./components/home/home.component";
import { CommunityComponent } from "./components/community/community.component";
import { InspirationComponent } from "./components/inspiration/inspiration.component";
import { ProfileComponent } from "./components/profile/profile.component";

const routes: Routes = [
  { path: "", redirectTo: "/home", pathMatch: "full" },
  {
    path: "home",
    component: HomeComponent,
    canActivate: [AuthGuard]
  },
  {
    path: "add",
    canActivate: [AuthGuard],
    children: [
      {
        path: "business",
        component: AddBusinessComponent
      },
      {
        path: "recipe",
        component: AddRecipeComponent
      },
      {
        path: "product",
        component: AddProductComponent
      }
    ]
  },
  {
    path: "view",
    canActivate: [AuthGuard],
    children: [
      {
        path: "business",
        component: ViewBusinessComponent
      },
      {
        path: "product",
        component: ViewProductComponent
      },
      {
        path: "recipe",
        component: ViewRecipeComponent
      }
    ]
  },
  {
    path: "community",
    component: CommunityComponent,
    canActivate: [AuthGuard]
  },
  {
    path: "inspiration",
    component: InspirationComponent,
    canActivate: [AuthGuard]
  },
  {
    path: "profile",
    component: ProfileComponent,
    canActivate: [AuthGuard]
  },
  { path: "login", loadChildren: "./pages/login/login.module#LoginPageModule" },
  {
    path: "signup",
    loadChildren: "./pages/signup/signup.module#SignupPageModule"
  },
  {
    path: "forgot",
    loadChildren: "./pages/forgot/forgot.module#ForgotPageModule"
  },
  {
    path: "edit-profile",
    loadChildren:
      "./pages/edit-profile/edit-profile.module#EditProfilePageModule",
    canActivate: [AuthGuard]
  },
  {
    path: "connection",
    loadChildren: "./pages/connection/connection.module#ConnectionPageModule",
    canActivate: [AuthGuard]
  },
  {
    path: "user/:_id",
    loadChildren: "./pages/user/user.module#UserPageModule",
    canActivate: [AuthGuard]
  },
  { path: "404", component: NotFoundComponent },
  { path: "**", redirectTo: "/404" }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
