import { Component, OnInit } from '@angular/core';
import { NavParams, ActionSheetController, AlertController, ToastController } from 'ionic-angular';
import { FormGroup, Validators, FormControl, FormArray } from '@angular/forms';

@Component({
  selector: 'page-edit-recipe',
  templateUrl: 'edit-recipe.html'
})

export class EditRecipePage implements OnInit {
  mode: string = 'New';
  difficultyOptions: string[] = ['Easy', 'Medium', 'Hard'];
  recipeForm: FormGroup;

  constructor(
    private navParams: NavParams,
    private actionSheetController: ActionSheetController,
    private alertController: AlertController,
    private toastController: ToastController
  ) {}

  ngOnInit() {
    this.mode = this.navParams.get('mode');
    this.initialiseForm();

  }

  private initialiseForm() {
    this.recipeForm = new FormGroup({
      title: new FormControl(null, Validators.required),
      description: new FormControl(null, Validators.required),
      difficulty: new FormControl('Medium', Validators.required),
      ingredients: new FormArray([])
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
    console.log(this.recipeForm);
  }

  private createNewIngredientAlert() {
    return this.alertController.create({
        title: 'Add Ingredient',
        inputs: [
          {
            name: 'name',
            placeholder: 'Name'
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
              (<FormArray>this.recipeForm.get('ingredients')).push(new FormControl(data.name, Validators.required));

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
