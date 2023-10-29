import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { Recipe } from '../model/recipe.model';

@Injectable({
  providedIn: 'root'
})
export class RecipeService {
  sortRecipesByTitle(recipes: Recipe[]): any {
    throw new Error('Method not implemented.');
  }
  sortRecipesByDateAdded(recipes: Recipe[]): any {
    throw new Error('Method not implemented.');
  }
  private apiUrl = 'http://localhost:3000/recipe';
  private favoritesUrl = 'http://localhost:3000/favorites';
  updateRecipeFavoriteStatus: any;

  constructor(private http: HttpClient) { }

  getRecipes(): Observable<Recipe[]> {
    return this.http.get<Recipe[]>(this.apiUrl);
  }

  getRecipeById(recipeId: string): Observable<Recipe> {
    const url = `${this.apiUrl}/${recipeId}`;
    return this.http.get<Recipe>(url);
  }

  addRecipe(recipe: Recipe): Observable<Recipe> {
    return this.http.post<Recipe>(this.apiUrl, recipe);
  }

  updateRecipe(recipeId: string, updatedRecipe: Recipe): Observable<void> {
    const url = `${this.apiUrl}/${recipeId}`;
    return this.http.put<void>(url, updatedRecipe);
  }

  deleteRecipe(recipeId: string): Observable<void> {
    const url = `${this.apiUrl}/${recipeId}`;
    return this.http.delete<void>(url);
  }

  toggleFavorite(recipe: Recipe): Observable<Recipe> {
    const url = `${this.favoritesUrl}/${recipe.id}`;
    if (!recipe.isFavorite) {
      return this.addToFavorites(recipe);
    } else {
      return this.removeFromFavorites(recipe);
    }
  }

  addToFavorites(recipe: Recipe): Observable<Recipe> {
    return this.http.post<Recipe>(this.favoritesUrl, recipe);
  }

  removeFromFavorites(recipe: Recipe): Observable<Recipe> {
    const url = `${this.favoritesUrl}/${recipe.id}`;
    return this.http.delete<Recipe>(url).pipe(map(() => recipe));
  }

  getFavoriteRecipes(): Observable<Recipe[]> {
    return this.http.get<Recipe[]>(this.favoritesUrl);
  }


}
