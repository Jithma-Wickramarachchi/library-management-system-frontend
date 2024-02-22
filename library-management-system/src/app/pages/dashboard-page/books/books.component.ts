import { CommonModule, NgFor } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-books',
  standalone: true,
  imports: [RouterLink, HttpClientModule, NgFor, CommonModule, FormsModule],
  templateUrl: './books.component.html',
  styleUrl: './books.component.css'
})
export class BooksComponent {
  private http;
  bookList: any;
  newBook = {
    isbn: null,
    title: null,
    author: null,
    category: null,
    status: null
  };

  constructor(httpClient: HttpClient) {
    this.http = httpClient;
  }

  ngOnInit() {
    this.loadTable();
  }

  clearNewBook() {
    this.newBook = {
      isbn: null,
      title: null,
      author: null,
      category: null,
      status: null
    };
  }
  loadTable() {
    this.http.get('http://localhost:8080/book').subscribe((data) => {
      console.log(data)
      this.bookList = data;
    })
  }
  addBook() {
    this.http.post('http://localhost:8080/book', this.newBook).subscribe((data) => {
      console.log(data);
      Swal.fire({
        title: "Successfull!",
        text: `Book \"${this.newBook.title}\" added successfully`,
        icon: "success"
      });
      this.ngOnInit();
      this.clearNewBook();
    }, () => {
      
    })
  }

}