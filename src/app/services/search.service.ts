import { Injectable } from '@angular/core';
import { Recipe } from '../model/recipe.model';

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  constructor() { }

  searchRecipes(query: string, recipes: Recipe[]): Recipe[] {
    query = (query ?? '').toLowerCase().trim();
    if (query === '') {
      return recipes || [];
    }

    return recipes.filter(recipe =>
      recipe.title.toLowerCase().includes(query) ||
      recipe.ingredients.some(ingredient => ingredient.toLowerCase().includes(query))
    );
  }
}
