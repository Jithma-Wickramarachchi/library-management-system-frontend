import { CommonModule, NgFor } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-books',
  standalone: true,
  imports: [RouterLink, HttpClientModule, NgFor, CommonModule, FormsModule, ReactiveFormsModule],
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
    status: "available"
  };
  newUpdateBook = {
    isbn: null,
    title: null,
    author: null,
    category: null,
    status: null as string | null
  };
  addBookForm : FormGroup;
  updateBookStatus = new FormControl('');

  constructor(httpClient: HttpClient, private formBuilder:FormBuilder) {
    this.http = httpClient;
    this.addBookForm = formBuilder.group({
      isbn : ['', Validators.required],
      title : ['', Validators.required],
      author : ['', Validators.required],
      category : ['', Validators.required]
    });
  }

  ngOnInit() {
    this.loadTable();
  }
  saveBook(book : any){
    this.newBook = book;
  }
  saveUpdateBook(book : any){
    this.newUpdateBook = book;
    this.newUpdateBook.status = this.updateBookStatus.value;
  }
  clearNewBook() {
    this.newBook = {
      isbn: null,
      title: null,
      author: null,
      category: null,
      status: "available"
    };
  }
  loadTable() {
    this.http.get('http://localhost:8081/book').subscribe((data) => {
      console.log(data)
      this.bookList = data;
    })
  }
  addBook() {
    this.http.post('http://localhost:8081/book', this.newBook).subscribe((data) => {
      console.log(data);
      Swal.fire({
        title: "Successfull!",
        text: `Book \"${this.newBook.title}\" added successfully`,
        icon: "success"
      });
      this.ngOnInit();
      this.clearNewBook();
    })
  }
  deleteBook(isbn : any){
    this.http.delete(`http://localhost:8081/book/${isbn}`).subscribe((data)=>{
      console.log(data);
    },()=>{
      Swal.fire({
        title: "Successfull!",
        text: `Book \"${this.newBook.title}\" Deleted successfully`,
        icon: "success"
      });
      this.ngOnInit();
      this.clearNewBook();
    })
  }
  updateBook(){
    this.http.post('http://localhost:8081/book',this.newUpdateBook).subscribe((data)=>{
      console.log(data);
    },()=>{
      Swal.fire({
        title: "Successfull!",
        text: `Book \"${this.newBook.title}\" Updated successfully`,
        icon: "success"
      });
      this.ngOnInit();
      this.clearNewBook();
    })
  }

}