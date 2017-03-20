import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { EditRecipePage } from '../edit-recipe/edit-recipe';
import { RecipePage } from '../recipe/recipe';

import { Recipe } from '../../models/recipe.model';

import { RecipesService } from '../../services/recipes.service';

@Component({
  selector: 'page-recipes',
  templateUrl: 'recipes.html'
})
export class RecipesPage {
  private recipes: Recipe[] = [];
  constructor(public navCtrl: NavController, public navParams: NavParams, private recipesService: RecipesService) {}

  onAddRecipe() {
    this.navCtrl.push(EditRecipePage, {mode: 'New'});
  }

  ionViewWillEnter() {
      this.recipes =  this.recipesService.getRecipes();
  }

  onLoadRecipe(recipe: Recipe, index: number) {
    this.navCtrl.push(RecipePage, {recipe: recipe, index: index});
  }
}
