import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ModalController } from '@ionic/angular';
import { ModalPage } from '../modal/modal.page';
import { NewsURLService } from '../news-url.service'

export class Source {
	id: string;
	name: string;
}
export class News {
	source: Source;
	author: string;
	title: string;
	description: string;
	url: string;
	urlToImage: string;
	publishedAt: string;
	content: string;
}

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})

export class Tab1Page {
  newsArray: Array<News>;
	totalNews: number;

  constructor(private http: HttpClient, private modalController: ModalController, private newsURL: NewsURLService) { 
  }

  ngOnInit() {
    this.fetchNews();
  }

  fetchNews() {
		this.http.get<any>(this.newsURL.getTopHeadlines())
			.subscribe(result => {
			  this.newsArray = result.articles;
			  this.totalNews = result.totalResults;
			  console.log(this.newsArray);
			}, 
			error =>{
			  alert(error);
			  console.error(error)
			})
	  }

  async openModal(index: number){
    const modal = await this.modalController.create({
      component: ModalPage,
      componentProps: {
        selectedNews: this.newsArray[index]
      }
    });

    return await modal.present();
  }

}
