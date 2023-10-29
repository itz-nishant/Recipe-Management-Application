import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { HomeComponent } from './home/home.component';
import { RecipeDetailComponent } from './recipe-detail/recipe-detail.component';
import { RecipeFormComponent } from './recipe-form/recipe-form.component';
import { FavoritesComponent } from './favorites/favorites.component';
import { AuthGuard } from './guard/auth.guard';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'home', component: HomeComponent, canActivate: [AuthGuard] },
  { path: 'recipe/add', component: RecipeFormComponent, canActivate: [AuthGuard] },
  { path: 'recipe/:id', component: RecipeDetailComponent, canActivate: [AuthGuard] },
  { path: 'recipe/edit/:id', component: RecipeFormComponent, canActivate: [AuthGuard] },
  { path: 'favorites', component: FavoritesComponent, canActivate: [AuthGuard] },
  { path: '', redirectTo: '/login', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }