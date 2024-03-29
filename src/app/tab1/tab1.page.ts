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
	newsTypeId = 1;
	inputKeyword = "";
	savedKeyword: string;
	totalNews: number;
	maximumPages: number;
	page = 1;


	constructor(private http: HttpClient, private modalController: ModalController, private restAPI: NewsURLService) { 
	}

	ngOnInit() {
		this.fetchNews(this.newsTypeId);
	}

	// newsType: 	1 for top headlines
	// 				2 for a topic search
	fetchNews(newsType: number, event?) {
		let URL;

		if(newsType === 1) {
			URL = this.restAPI.getTopHeadlines(this.page)
		} else {
			URL = this.restAPI.getNewsByTopic(this.page, this.savedKeyword)
		}

		this.http.get<any>(URL)
			.subscribe(result => {
				this.newsArray = this.newsArray.concat(result.articles);
				this.totalNews = result.totalResults;
				this.maximumPages = Math.ceil(this.totalNews / 20);
				
					if(event) {
						event.target.complete();
					}
			}, 
			error =>{
				console.error(error)
			})
	}

	loadMoreData(event) {
		this.page++
		this.fetchNews(this.newsTypeId, event);

		// max requests per search is 5 on newsapi.org for free plan members
		if(this.page === this.maximumPages || this.page === 5) {
			event.target.disabled = true;
		}
	}

	searchNews() {
		const value = this.inputKeyword;
		const formattedValue = value.trim().replace(/ +/g,'-');

		if(formattedValue !== "") {
			this.savedKeyword = formattedValue
			this.newsTypeId = 2;
			this.newsArray = [];
			this.page = 1;
			this.fetchNews(this.newsTypeId);
			this.inputKeyword = "";
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
