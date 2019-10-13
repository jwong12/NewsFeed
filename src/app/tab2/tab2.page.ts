import { Component } from '@angular/core';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {
  items: any[];
  currentItem = "";

  constructor() {
    this.items = [ "Finish Project 007", "Study for Angular final", "Do groceries", "Go to the gym"];
  }

  addItem(item){
    const text = item.trim();

    if(text !== "") {
      this.items.push(text);
      this.currentItem = "";
    }
  }

  removeItem(index) {
    this.items.splice(index, 1);
  }

  reorderItems(event) {
    const itemToMove = this.items.splice(event.detail.from, 1)[0];
    this.items.splice(event.detail.to, 0, itemToMove);
    event.detail.complete();
  }

}
