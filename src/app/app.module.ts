import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { AuthGuard } from './guard/auth.guard'; 
import { MainService } from './services/main.service';
import { HomeComponent } from './home/home.component';
import { RecipeDetailComponent } from './recipe-detail/recipe-detail.component';
import { RecipeFormComponent } from './recipe-form/recipe-form.component';
import { FavoritesComponent } from './favorites/favorites.component';
import { NavbarComponent } from './navbar/navbar.component';
import { MenubarModule } from 'primeng/menubar';
import { MatButtonModule} from '@angular/material/button';
import { MatIconModule} from '@angular/material/icon';
import { RecipeService } from './services/recipe.service';
import { SearchService } from './services/search.service';
import { DropdownModule } from 'primeng/dropdown';
import { NgxPaginationModule } from 'ngx-pagination';
import { PaginatorModule } from 'primeng/paginator';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    RecipeDetailComponent,
    RecipeFormComponent,
    FavoritesComponent,
    NavbarComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,MatIconModule,
    ReactiveFormsModule,
    ButtonModule,
    BrowserAnimationsModule,
    HttpClientModule,MatButtonModule,
    InputTextModule,
    ToastModule,
    MenubarModule,
    FormsModule,
    DropdownModule,
    NgxPaginationModule,
    PaginatorModule
  ],
  providers: [MainService, AuthGuard, MessageService, RecipeService, SearchService],
  bootstrap: [AppComponent]
})
export class AppModule { }
