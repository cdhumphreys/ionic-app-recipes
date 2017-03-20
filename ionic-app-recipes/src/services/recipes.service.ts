import { Ingredient } from '../models/ingredient.model';
import { Recipe } from '../models/recipe.model';

export class RecipesService {
  private recipes = [];

  addRecipe(
    title: string,
    description: string,
    difficulty: string,
    ingredients: Ingredient[]) {

    this.recipes.push(new Recipe(title, description, difficulty, ingredients));
  }

  updateRecipe(
    index: number,
    title: string,
    description: string,
    difficulty: string,
    ingredients: Ingredient[]) {

    this.recipes[index] = new Recipe(title, description, difficulty, ingredients);
  }

  removeRecipe(index: number) {
    this.recipes[index].splice(index, 1);
  }

  getRecipes() {
    return this.recipes.slice();
  }


}
