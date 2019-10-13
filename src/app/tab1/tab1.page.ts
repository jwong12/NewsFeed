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
	newsArray: Array<News> =[];
	totalNews: number;
	maximumPages: number;
	page = 1;

	constructor(private http: HttpClient, private modalController: ModalController, private newsURL: NewsURLService) { 
	}

	ngOnInit() {
	this.fetchNews();
	}

	fetchNews(event?) {
		this.http.get<any>(this.newsURL.getTopHeadlines(this.page))
			.subscribe(result => {
				this.newsArray = this.newsArray.concat(result.articles);
				this.totalNews = result.totalResults;
				this.maximumPages = Math.ceil(this.totalNews / 20);
				  	console.log(this.newsArray);
					console.log(this.totalNews)
					console.log(this.maximumPages)

					if(event) {
						event.target.complete();
					}
			}, 
			error =>{
				alert(error);
				console.error(error)
			})
	}

	loadMoreData(event) {
		console.log(event);
		this.page++
		this.fetchNews(event);

		if(this.page === this.maximumPages) {
			event.target.disabled = true;
		}
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
