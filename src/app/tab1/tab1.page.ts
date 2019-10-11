import { Component } from '@angular/core';
import { NavController, ModalController } from '@ionic/angular';
import { ModalPage } from '../modal/modal.page';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {
  private selectedItem: any;
  private icons = [
    'flask',
    'wifi',
    'beer',
    'football',
    'basketball',
    'paper-plane',
    'american-football',
    'boat',
    'bluetooth',
    'build'
  ];
  // Create an array of custom objects.
  public items: Array<{ title: string; note: string; icon: string }> = [];

  constructor(private modalController: ModalController) { 
    for (let i = 0; i < this.icons.length; i++) {
      this.items.push({
        title: 'Item ' + i,
        note: 'This is item #' + i,
        icon: this.icons[i]
      });
    }
  }
  ngOnInit() {
  }

  async openModal(){
    const modal = await this.modalController.create({
      component: ModalPage,
      componentProps: {
        custom_id: "James Wong"
      }
    });
    console.log("hello world!");

    return await modal.present();
  }

}
