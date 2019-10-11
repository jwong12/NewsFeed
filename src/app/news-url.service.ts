import { Injectable } from '@angular/core';

const API_KEY = "apiKey=01f70f8e4e224537a9f52861f8983ca5";
@Injectable({
  providedIn: 'root'
})
export class NewsURLService {

  constructor() { }

  getTopHeadlines() {
    return 'https://newsapi.org/v2/top-headlines?' +
          'country=us&' +
          API_KEY;
  }
}
