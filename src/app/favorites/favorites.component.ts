import { Component, OnInit } from '@angular/core';
import { Recipe } from '../model/recipe.model';
import { RecipeService } from '../services/recipe.service';
import { Observable } from 'rxjs';
import { MessageService } from 'primeng/api';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.css']
})
export class FavoritesComponent implements OnInit {
  favoriteRecipes$: Observable<Recipe[]> | undefined;
  currentPage = 1;
  itemsPerPage = 3;

  constructor(private recipeService: RecipeService, private messageService: MessageService) { }

  ngOnInit() {
    this.loadFavoriteRecipes();
  }

  loadFavoriteRecipes() {
    this.favoriteRecipes$ = this.recipeService.getFavoriteRecipes();
  }

  removeFromFavorites(recipe: Recipe) {
    this.recipeService.removeFromFavorites(recipe).subscribe(
      () => {
        this.messageService.add({ severity: 'error', summary: 'Removed', detail: 'Removed from favourite' });
        console.log('Recipe removed from favorites');
        this.loadFavoriteRecipes();
      },
      (error: any) => {
        console.error('Error removing recipe from favorites:', error);
      }
    );
  }

  getTotalRecipesCount(): Observable<number> {
    return this.favoriteRecipes$?.pipe(
      map(favoriteRecipes => favoriteRecipes.length)
    ) ?? new Observable<number>();
  }
}
