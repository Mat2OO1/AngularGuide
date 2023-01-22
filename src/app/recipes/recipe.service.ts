import {Recipe} from "./recipe.model";
import {EventEmitter, Injectable} from "@angular/core";
import {Ingredient} from "../shared/ingredient.model";
import {ShoppingListService} from "../shopping-list/shopping-list.service";
import {Subject} from "rxjs";

@Injectable()
export class RecipeService {
  recipesChanged = new Subject<Recipe[]>();

  // private recipes: Recipe[] = [
  //   new Recipe(
  //     'Spaghetti',
  //     'Best italian food',
  //     'https://upload.wikimedia.org/wikipedia/commons/thumb/b/bb/%D0%A1%D0%BF%D0%B0%D0%B3%D0%B5%D1%82%D1%82%D0%B8_%D1%81_%D0%B3%D0%B0%D1%80%D0%BD%D0%B8%D1%80%D0%BE%D0%BC.jpg/450px-%D0%A1%D0%BF%D0%B0%D0%B3%D0%B5%D1%82%D1%82%D0%B8_%D1%81_%D0%B3%D0%B0%D1%80%D0%BD%D0%B8%D1%80%D0%BE%D0%BC.jpg',
  //     [
  //       new Ingredient('Tomato',3),
  //       new Ingredient('Pasta',10)
  //     ]),
  //   new Recipe(
  //     'Pierogi',
  //     'Traditional polish cuisine',
  //     'https://upload.wikimedia.org/wikipedia/commons/thumb/b/ba/04565_Christmas_dumplings_with_dried_plums.JPG/480px-04565_Christmas_dumplings_with_dried_plums.JPG',
  //     [
  //       new Ingredient('Potatoes',3),
  //       new Ingredient('Cheese',4)
  //     ])
  // ];
  private recipes : Recipe[]
  constructor(private slService: ShoppingListService) {
  }

  setRecipes(recipes: Recipe[]){
    this.recipes = recipes;
    this.recipesChanged.next(this.recipes.slice())
  }


  getRecipes(){
      return this.recipes.slice();
    }
  addToShoppingList(ingredients: Ingredient[]){
    this.slService.addIngredients(ingredients);
  }

  getRecipe(id : number) {
    return this.recipes[id];
  }

  addRecipe(recipe: Recipe){
    this.recipes.push(recipe);
    this.recipesChanged.next(this.recipes.slice())

  }

  updateRecipe(index: number, recipe: Recipe){
    this.recipes[index] = recipe;
    this.recipesChanged.next(this.recipes.slice());
  }

  deleteRecipe(index:number){
    this.recipes.splice(index,1);
    this.recipesChanged.next(this.recipes.slice());
  }





}
