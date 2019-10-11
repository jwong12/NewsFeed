import { Component, OnInit } from '@angular/core';
import { NavParams, ModalController } from '@ionic/angular';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.page.html',
  styleUrls: ['./modal.page.scss'],
})
export class ModalPage implements OnInit {
  id:string;
  data: any;

  constructor(private navParams: NavParams, private modalController: ModalController){
  }
  ngOnInit() {
    this.data = this.navParams.get('selectedNews');
  }

  getPublisher(){
    if(this.data.author !== null && this.data.author !== "") {
      return "Published by " + this.data.author;
    }
  }
  getDate() {
    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    const month = parseInt(this.data.publishedAt.slice(5,7)) - 1;

    return months[month] + " " + this.data.publishedAt.slice(8,10) + ", " + this.data.publishedAt.slice(0,4);
  }

  closeModal(){
    this.modalController.dismiss();
  }
}
