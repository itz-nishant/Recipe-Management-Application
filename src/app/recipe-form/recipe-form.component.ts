import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormArray, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Recipe } from '../model/recipe.model';
import { RecipeService } from '../services/recipe.service';
import { ActivatedRoute } from '@angular/router';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-recipe-form',
  templateUrl: './recipe-form.component.html',
  styleUrls: ['./recipe-form.component.css']
})
export class RecipeFormComponent implements OnInit {
  recipeForm!: FormGroup;
  ingredients!: FormArray;
  selectedImage!: File | null;
  imagePreview: string | ArrayBuffer | null = null;
  recipeId: string | null = null;
  editMode = false;


  constructor(
    private recipeService: RecipeService,
    private route: ActivatedRoute,
    private messageService: MessageService,
    private router: Router
  ) { }

  ngOnInit() {
    this.initForm();
    this.recipeId = this.route.snapshot.paramMap.get('id');
    if (this.recipeId) {
      this.loadRecipe();
      this.editMode = true;
    }
  }

  private initForm() {
    let recipeTitle = '';
    let recipeDescription = '';
    let recipeInstructions = '';

    this.recipeForm = new FormGroup({
      title: new FormControl(recipeTitle, Validators.required),
      description: new FormControl(recipeDescription, Validators.required),
      ingredients: new FormArray([]),
      instructions: new FormControl(recipeInstructions, Validators.required),
      imageUrl: new FormControl('', Validators.required)
    });

    this.ingredients = this.recipeForm.get('ingredients') as FormArray;
  }

  loadRecipe() {
    if (this.recipeId) {
      this.recipeService.getRecipeById(this.recipeId).subscribe(
        (recipe: Recipe) => {
          this.recipeForm.patchValue({
            title: recipe.title,
            description: recipe.description,
            instructions: recipe.instructions,
            imageUrl: recipe.imageUrl
          });
          this.loadIngredients(recipe.ingredients);
          this.imagePreview = recipe.imageUrl;
        },
        (error: any) => {
          console.error('Error loading recipe:', error);
        }
      );
    }
  }

  loadIngredients(ingredients: string[]) {
    this.ingredients.clear();
    for (const ingredient of ingredients) {
      this.ingredients.push(new FormControl(ingredient, Validators.required));
    }
  }

  onSubmit() {
    if (this.recipeForm.valid) {
      const { title, description, instructions, imageUrl } = this.recipeForm.value;
      const recipe: Recipe = {
        id: this.recipeId || '',
        title,
        description,
        instructions,
        ingredients: this.ingredients.value,
        imageUrl,
        dateAdded: new Date(),
        isFavorite: false,
        date: undefined
      };

      if (this.editMode) {
        this.recipeService.updateRecipe(this.recipeId!, recipe).subscribe(
          () => {
            console.log('Recipe updated');
            this.recipeForm.reset();
            this.selectedImage = null;
            this.imagePreview = null;
            this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Recipe updated successfully!' });
            this.router.navigate(['/home']);
          },
          (error: any) => {
            console.error('Error updating recipe:', error);
          }
        );
      } else {
        this.recipeService.addRecipe(recipe).subscribe(
          (addedRecipe: Recipe) => {
            console.log('Recipe added:', addedRecipe);
            this.recipeForm.reset();
            this.selectedImage = null;
            this.imagePreview = null;
            this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Recipe added successfully!' });
          },
          (error: any) => {
            console.error('Error adding recipe:', error);
          }
        );
      }
    }
  }

  onAddIngredient() {
    const control = new FormControl(null, Validators.required);
    this.ingredients.push(control);
  }

  onRemoveIngredient(index: number) {
    this.ingredients.removeAt(index);
  }

  onImageSelected(event: any) {
    const file = event.target.files[0];
    this.selectedImage = file;

    const reader = new FileReader();
    reader.onload = () => {
      this.imagePreview = reader.result;
    };
    reader.readAsDataURL(file);
  }
}
