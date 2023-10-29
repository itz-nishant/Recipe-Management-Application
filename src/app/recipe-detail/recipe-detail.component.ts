import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Recipe } from '../model/recipe.model';
import { RecipeService } from '../services/recipe.service';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit {
  recipe?: Recipe;

  constructor(private route: ActivatedRoute, private recipeService: RecipeService) { }

  ngOnInit() {
    const recipeId = this.route.snapshot.params['id'];
    this.recipeService.getRecipeById(recipeId).subscribe(
      (recipe: Recipe) => {
        this.recipe = recipe;
      },
      (error: any) => {
        console.error(error);
      }
    );
  }
}
