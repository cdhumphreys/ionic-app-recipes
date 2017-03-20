import { Component, OnInit } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { Recipe } from '../../models/recipe.model';

import { EditRecipePage } from '../edit-recipe/edit-recipe';

import { ShoppingListService } from '../../services/shopping-list.service';
import { RecipesService } from '../../services/recipes.service';

@Component({
  selector: 'page-recipe',
  templateUrl: 'recipe.html'
})

export class RecipePage implements OnInit {
  private recipe: Recipe;
  private index: number;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private shoppingListService: ShoppingListService,
    private recipesService: RecipesService
  ) {}

  ngOnInit() {
    this.recipe = this.navParams.get('recipe');
    this.index = this.navParams.get('index');
  }

  onAddToShopping() {
    const ingredients = this.recipe.ingredients;
    for (let i = 0; i < ingredients.length; i++) {
      this.shoppingListService.addIngredient(ingredients[i].name, ingredients[i].quantity);
    }
  }

  onEditRecipe() {
    this.navCtrl.push(EditRecipePage, {mode: 'Edit', recipe: this.recipe, index: this.index})
  }

  onDeleteRecipe(recipe: Recipe) {
    const recipes = this.recipesService.getRecipes();

    const recipeIndex = recipes.findIndex((currentRecipe) => {
      if (currentRecipe.title == recipe.title) {
        return true;
      }
    });
    this.recipesService.removeRecipe(recipeIndex);
  }
}
