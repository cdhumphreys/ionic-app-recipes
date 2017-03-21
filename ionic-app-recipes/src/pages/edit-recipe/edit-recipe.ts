import { Component, OnInit } from '@angular/core';
import { NavController, NavParams, ActionSheetController, AlertController, ToastController } from 'ionic-angular';
import { FormGroup, Validators, FormControl, FormArray } from '@angular/forms';

import { Recipe } from '../../models/recipe.model';
import { Ingredient } from '../../models/ingredient.model';

import { RecipesService } from '../../services/recipes.service';

@Component({
  selector: 'page-edit-recipe',
  templateUrl: 'edit-recipe.html'
})

export class EditRecipePage implements OnInit {
  mode: string = 'New';
  difficultyOptions: string[] = ['Easy', 'Medium', 'Hard'];
  recipeForm: FormGroup;

  recipe: Recipe;
  index: number;

  constructor(
    private navCtrl: NavController,
    private navParams: NavParams,
    private actionSheetController: ActionSheetController,
    private alertController: AlertController,
    private toastController: ToastController,
    private recipesService: RecipesService
  ) {}

  ngOnInit() {
    this.mode = this.navParams.get('mode');
    if (this.mode == 'Edit') {
      this.recipe = this.navParams.get('recipe');
      this.index = this.navParams.get('index');
    }

    this.initialiseForm();
  }

  private initialiseForm() {
    let title = null;
    let description = null;
    let difficulty = 'Medium';
    let ingredients = [];

    if (this.mode == 'Edit') {
      title = this.recipe.title;
      description = this.recipe.description;
      difficulty = this.recipe.difficulty;
      for (let ingredient of this.recipe.ingredients) {
        console.log(ingredient);
        ingredients.push(new FormControl(ingredient.name, Validators.required));
      }
    }

    this.recipeForm = new FormGroup({
      title: new FormControl(title, Validators.required),
      description: new FormControl(description, Validators.required),
      difficulty: new FormControl(difficulty, Validators.required),
      ingredients: new FormArray(ingredients)
    });
  }

  onManageIngredients() {
    const actionSheet = this.actionSheetController.create({
      title: 'What would you like to do?',
      buttons: [
        {
          text: 'Add Ingredient',
          handler: () => {
            this.createNewIngredientAlert().present();
          }
        },
        {
          text: 'Delete All Ingredients',
          role: 'destructive',
          handler: () => {
            const fArray: FormArray = <FormArray>this.recipeForm.get('ingredients');

            const len = fArray.length;

            if (len > 0) {
              for (let i = len; i >=0; i--) {
                fArray.removeAt(i);
              }
              const toast = this.toastController.create({
                message: 'All ingredients removed!',
                duration: 1000,
                position: 'bottom'
              });
              toast.present();
            }
          }
        },
        {
          text: 'Cancel',
          role: 'cancel'
        }
      ]
    });
    actionSheet.present();
  }

  onSubmit() {
    const values = this.recipeForm.value;
    let ingredients = [];

    if (values.ingredients.length > 0) {
      ingredients = values.ingredients.map((ingredient) => {
        return {
          name: ingredient.name,
          quantity: ingredient.quantity
        };
      });
    }
    if (this.mode == "New") {
      this.recipesService.addRecipe(values.title, values.description, values.difficulty, ingredients);
    }
    else if (this.mode == "Edit") {
      this.recipesService.updateRecipe(this.index, values.title, values.description, values.difficulty, ingredients);
    }

    this.recipeForm.reset();
    this.navCtrl.popToRoot();
  }

  private createNewIngredientAlert() {
    return this.alertController.create({
        title: 'Add Ingredient',
        inputs: [
          {
            name: 'name',
            placeholder: 'Name'
          },
          {
            name: 'quantity',
            placeholder: '#'
          }
        ],
        buttons: [
          {
            text: 'Add',
            handler: (data) => {
              if (data.name.trim() == '' || data.name == null) {
                const toast = this.toastController.create({
                  message: 'Please enter a valid name',
                  duration: 1500,
                  position: 'bottom'
                });
                toast.present();
                return;
              }
              (<FormArray>this.recipeForm.get('ingredients')).push(new FormGroup({
                name: new FormControl(data.name, Validators.required),
                quantity: new FormControl(data.quantity, Validators.required)
              }));

              const toast = this.toastController.create({
                message: 'New ingredient added!',
                duration: 1000,
                position: 'bottom'
              });
              toast.present();
            }
          },
          {
            text: 'Cancel',
            role: 'cancel'
          }
        ]
      });
  }
}
