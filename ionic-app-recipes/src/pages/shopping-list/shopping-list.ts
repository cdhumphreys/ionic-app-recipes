import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

import {Ingredient } from '../../models/ingredient.model';
import { ShoppingListService } from '../../services/shopping-list.service';

@Component({
  selector: 'page-shopping-list',
  templateUrl: 'shopping-list.html'
})

export class ShoppingListPage implements OnInit {
  shoppingListItems: Ingredient[] = [];
  constructor(private shoppingListService: ShoppingListService) {}

  ngOnInit() {
    this.loadItems();
  }

  onAddItem(form: NgForm) {
    this.shoppingListService.addIngredient(form.value.name, form.value.quantity);
    form.reset();
    this.loadItems();
  }

  onRemoveItem(index: number) {
    this.shoppingListService.removeIngredient(index);
    this.loadItems();
  }

  loadItems() {
    this.shoppingListItems = this.shoppingListService.getIngredients();
  }
}
