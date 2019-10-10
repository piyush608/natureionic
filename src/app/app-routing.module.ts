import { NgModule } from "@angular/core";
import { PreloadAllModules, RouterModule, Routes } from "@angular/router";
import { AddBusinessComponent } from "./components/add-business/add-business.component";
import { ViewBusinessComponent } from "./components/view-business/view-business.component";
import { AddRecipeComponent } from "./components/add-recipe/add-recipe.component";
import { AddProductComponent } from "./components/add-product/add-product.component";
import { AuthGuardService as AuthGuard } from "./services/auth-guard.service";

const routes: Routes = [
  { path: "", redirectTo: "/home", pathMatch: "full" },
  {
    path: "home",
    loadChildren: "./pages/home/home.module#HomePageModule",
    canActivate: [AuthGuard]
  },
  {
    path: "addbusiness",
    component: AddBusinessComponent,
    canActivate: [AuthGuard]
  },
  {
    path: "addrecipe",
    component: AddRecipeComponent,
    canActivate: [AuthGuard]
  },
  {
    path: "addproduct",
    component: AddProductComponent,
    canActivate: [AuthGuard]
  },
  {
    path: "viewbusiness",
    component: ViewBusinessComponent,
    canActivate: [AuthGuard]
  },
  {
    path: "community",
    loadChildren: "./pages/community/community.module#CommunityPageModule",
    canActivate: [AuthGuard]
  },
  {
    path: "inspiration",
    loadChildren:
      "./pages/inspiration/inspiration.module#InspirationPageModule",
    canActivate: [AuthGuard]
  },
  {
    path: "profile",
    loadChildren: "./pages/profile/profile.module#ProfilePageModule",
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
  { path: 'success', loadChildren: './modal/success/success.module#SuccessPageModule' }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
