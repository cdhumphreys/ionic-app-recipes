import { Ingredient } from '../models/ingredient.model';

export class ShoppingListService {
  private ingredients: Ingredient[] = [];

  addIngredient(ingredientName: string, quantity: number) {
    this.ingredients.push(new Ingredient(ingredientName, quantity));
  }

  addIngredients(items: Ingredient[]) {
    this.ingredients.push(...items);
  }

  removeIngredient(index: number) {
    this.ingredients.splice(index, 1);
  }

  getIngredients() {
    return this.ingredients.slice();
  }
}
