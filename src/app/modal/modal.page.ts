import { Component, OnInit } from '@angular/core';
import { NavParams, ModalController } from '@ionic/angular';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.page.html',
  styleUrls: ['./modal.page.scss'],
})
export class ModalPage implements OnInit {
  id:string;
  data  = null;

  constructor(private navParams: NavParams, private modalController: ModalController){
  }
  ngOnInit() {
    this.data = this.navParams.get('custom_id');
    console.log(this.data);
    // this.id = this.route.snapshot.paramMap.get('id');   

  }
  // Ionic tab pages are initialized in the constructor only once. 
  // ionViewWillEnter() is called every time the tab page is viewed.
  ionViewWillEnter(){
  }

  closeModal(){
    this.modalController.dismiss();
  }

}
