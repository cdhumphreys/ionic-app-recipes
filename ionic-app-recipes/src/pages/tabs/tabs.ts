import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { ShoppingListPage } from '../shopping-list/shopping-list';
import { RecipesPage } from '../recipes/recipes';


/*
  Generated class for the TabsPage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-tabs',
  templateUrl: 'tabs.html'
})
export class TabsPage {
  shoppingListPage = ShoppingListPage;
  recipesPage = RecipesPage;

  constructor(public navCtrl: NavController, public navParams: NavParams) {}

  ionViewDidLoad() {
    console.log('ionViewDidLoad TabsPagePage');
  }

}
