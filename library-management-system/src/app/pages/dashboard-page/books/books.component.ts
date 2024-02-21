import { NgFor } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-books',
  standalone: true,
  imports: [RouterLink, HttpClientModule, NgFor],
  templateUrl: './books.component.html',
  styleUrl: './books.component.css'
})
export class BooksComponent {
  private http;
  bookList: any;

  constructor(httpClient: HttpClient) {
    this.http = httpClient;
  }

  ngOnInit() {
    this.loadTable();
  }

  loadTable() {
    this.http.get('http://localhost:8080/book').subscribe((data) => {
      console.log(data)
      this.bookList = data;
    })

  }

}