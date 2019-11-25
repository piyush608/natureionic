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
import { LoginComponent } from "./components/login/login.component";
import { SignupComponent } from "./components/signup/signup.component";
import { OnboardingComponent } from "./components/onboarding/onboarding.component";
import { EditProfileComponent } from "./components/edit-profile/edit-profile.component";
import { AddBlogComponent } from "./components/add-blog/add-blog.component";
import { AddVlogComponent } from "./components/add-vlog/add-vlog.component";
import { AccountComponent } from "./components/account/account.component";
import { SecurityComponent } from "./components/security/security.component";
import { NewslettersComponent } from "./components/newsletters/newsletters.component";
import { NotificationsComponent } from "./components/notifications/notifications.component";
import { ReportComponent } from "./components/report/report.component";
import { DeactivateAccountComponent } from "./components/deactivate-account/deactivate-account.component";
import { ListComponent } from "./components/list/list.component";
import { AddForumComponent } from "./components/add-forum/add-forum.component";
import { ViewForumComponent } from "./components/view-forum/view-forum.component";
import { AddGroupComponent } from "./components/add-group/add-group.component";

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
        path: "",
        redirectTo: "add/list",
        pathMatch: "full"
      },
      {
        path: "list",
        component: ListComponent
      },
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
      },
      {
        path: "article",
        component: AddBlogComponent
      },
      {
        path: "vlog",
        component: AddVlogComponent
      },
      {
        path: "forum",
        component: AddForumComponent
      },
      {
        path: "group",
        component: AddGroupComponent
      }
    ]
  },
  {
    path: "edit",
    canActivate: [AuthGuard],
    children: [
      {
        path: "profile",
        component: EditProfileComponent
      }
    ]
  },
  {
    path: "view",
    canActivate: [AuthGuard],
    children: [
      {
        path: "business/:_id",
        component: ViewBusinessComponent
      },
      {
        path: "product/:_id",
        component: ViewProductComponent
      },
      {
        path: "recipe/:_id",
        component: ViewRecipeComponent
      },
      {
        path: "forum/:_id",
        component: ViewForumComponent
      }
    ]
  },
  {
    path: "settings",
    canActivate: [AuthGuard],
    children: [
      {
        path: "",
        redirectTo: "/settings/account",
        pathMatch: "full"
      },
      {
        path: "account",
        component: AccountComponent
      },
      {
        path: "security",
        component: SecurityComponent
      },
      {
        path: "newsletter",
        component: NewslettersComponent
      },
      {
        path: "notifications",
        component: NotificationsComponent
      },
      {
        path: "report",
        component: ReportComponent
      },
      {
        path: "deactive-account",
        component: DeactivateAccountComponent
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
  { path: "login", component: LoginComponent },
  {
    path: "signup",
    component: SignupComponent
  },
  {
    path: "onboarding",
    component: OnboardingComponent
  },
  {
    path: "forgot",
    loadChildren: "./pages/forgot/forgot.module#ForgotPageModule"
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
