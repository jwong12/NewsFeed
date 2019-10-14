import { Component } from '@angular/core';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {
  items: Array<any> = [];
  currentItem = "";

  constructor(private storage: Storage) {
    this.storage.get('items').then((val) => {
      if(val !== "" && val !== null) {
        this.items = JSON.parse(val);

      } else {
        this.items = []
      }
    });
  }

  addItem(item){
    const text = item.trim();

    if(text !== "") {
      this.items.push(text);
      this.currentItem = "";
      this.storage.set('items', JSON.stringify(this.items));
    }
  }

  removeItem(index) {
    this.items.splice(index, 1);
    this.storage.set('items', JSON.stringify(this.items));
  }

  reorderItems(event) {
    const itemToMove = this.items.splice(event.detail.from, 1)[0];
    this.items.splice(event.detail.to, 0, itemToMove);
    this.storage.set('items', JSON.stringify(this.items));
    event.detail.complete();
  }

}
