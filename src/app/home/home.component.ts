import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { Recipe } from '../model/recipe.model';
import { RecipeService } from '../services/recipe.service';
import { SearchService } from '../services/search.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  private allRecipes: Recipe[] = [];
  // originalRecipes: Recipe[] = [];
  recipes: Recipe[] = [];
  searchControl = new FormControl();
  selectedSortOption = 'None';
  sortOptions = [
    { label: 'None', value: 'None' },
    { label: 'Title', value: 'Title' },
    { label: 'Date', value: 'DateAdded' }
  ];

  private recipesLoaded = false;

  currentPage = 1;
  itemsPerPage = 4;

  constructor(
    private recipeService: RecipeService,
    private searchService: SearchService,
    private messageService: MessageService
  ) { }

  ngOnInit() {
    this.loadRecipes();
    this.searchControl.valueChanges.pipe(
      debounceTime(300),
      distinctUntilChanged()
    ).subscribe(query => {
      this.recipes = this.searchService.searchRecipes(query ?? '', this.allRecipes);
      this.onSortOptionChange();
      // this.resetToOriginalOrder();

    });


  }

  loadRecipes() {
    if (!this.recipesLoaded) {
      this.recipeService.getRecipes().subscribe(
        (recipes: Recipe[]) => {
          this.allRecipes = recipes;
          // this.originalRecipes = recipes;
          this.recipes = recipes;
          this.onSortOptionChange();        
        },
        (error: any) => {
          console.error('Error loading recipes:', error);
        }
      );
    }
  }

  deleteRecipe(recipeId: string) {
    this.recipeService.deleteRecipe(recipeId).subscribe(
      () => {
        this.loadRecipes();
        this.messageService.add({ severity: 'error', summary: 'Deleted', detail: 'Recipe deleted successfully' });
      },
      (error: any) => {
        console.error('Error deleting recipe:', error);
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Failed to delete recipe' });
      }
    );
  }
  

  toggleFavorite(recipe: Recipe) {
    recipe.isFavorite = !recipe.isFavorite;

    if (recipe.isFavorite) {
      this.recipeService.addToFavorites(recipe).subscribe(
        () => {
          this.messageService.add({ severity: 'success', summary: 'Added', detail: 'Added to favourite' });
          console.log('Recipe added to favorites');
        },
        (error: any) => {
          console.error('Error adding recipe to favorites:', error);
        }
      );
    } else {
      this.recipeService.removeFromFavorites(recipe).subscribe(
        () => {
          this.messageService.add({ severity: 'error', summary: 'Removed', detail: 'Removed from favourite' });
          console.log('Recipe removed from favorites');

        },
        (error: any) => {
          console.error('Error removing recipe from favorites:', error);
        }
      );
    }
  }

  onSortOptionChange() {
    this.currentPage = 1;

    switch (this.selectedSortOption) {
      case 'None':
        // this.resetToOriginalOrder();
        break;
      case 'Title':
        this.sortByTitle();
        break;
      case 'DateAdded':
        this.sortByDateAdded();
        break;
      default:
        break;
    }
  }

  // resetToOriginalOrder() {
  //   this.recipes = this.originalRecipes.slice();
  // }

  sortByTitle() {
    this.recipes = this.recipes.sort((a, b) => a.title.localeCompare(b.title));
  }

  sortByDateAdded() {
    this.recipes = this.recipes.sort((a, b) => new Date(b.dateAdded).getTime() - new Date(a.dateAdded).getTime());
  }

  onPageChange(event: any) {
    this.currentPage = event;
  }
}
