import {Component, ElementRef, EventEmitter, OnDestroy, OnInit, Output, ViewChild} from '@angular/core';
import {ShoppingListService} from "../shopping-list.service";
import {NgForm} from "@angular/forms";
import {Ingredient} from "../../shared/ingredient.model";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit, OnDestroy {
  @ViewChild('f', {static: false}) slForm : NgForm
  subscription: Subscription;
  editMode = false;
  edittedItemIndex: number;
  edditedItem: Ingredient
  constructor(private shoppingListService: ShoppingListService) {
  }

  ngOnInit(): void {
    this.subscription = this.shoppingListService.startedEditing
      .subscribe(
        (index: number) => {
          this.editMode = true;
          this.edittedItemIndex = index;
          this.edditedItem = this.shoppingListService.getIngredient(index);
          this.slForm.setValue({
            name: this.edditedItem.name,
            amount: this.edditedItem.amount
          })
        }
      );
  }

  onSubmit(form: NgForm) : void {
    const value = form.value;
    const newIngredient = new Ingredient(value.name, value.amount);
    if(this.editMode){
      this.shoppingListService.updateIngredient(this.edittedItemIndex, newIngredient)
    }
    else{
      this.shoppingListService.addIngredient(newIngredient);
    }

    form.reset();
    this.editMode = false;

}

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  onClear() : void {
    this.slForm.reset();
    this.editMode = false;
  }

  onDelete(){
    this.shoppingListService.deleteIngredient(this.edittedItemIndex)
    this.onClear();
  }

}
