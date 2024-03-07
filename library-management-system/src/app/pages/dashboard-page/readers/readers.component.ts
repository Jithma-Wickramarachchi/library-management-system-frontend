import { CommonModule, NgFor } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { APP_BOOTSTRAP_LISTENER, Component, NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgModel } from '@angular/forms';
import { RouterLink } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-readers',
  standalone: true,
  imports: [HttpClientModule, RouterLink, FormsModule, CommonModule, NgFor],
  templateUrl: './readers.component.html',
  styleUrl: './readers.component.css'
})

export class ReadersComponent {

  private http;
  public readersList: any;
  public recentSavedReader: any;
  public recentSavedUpdateReader: any;


  public newReader = {
    name: null,
    nic: null,
    contact: null,
    address: null
  }

  constructor(httpClient: HttpClient) {
    this.http = httpClient;
  }

  ngOnInit(): void {
    this.loadReaders();
    this.validate();
  }

  saveReader(reader: any) {
    this.recentSavedReader = reader;
  }
  saveReaderWithId(reader: any) {
    this.recentSavedUpdateReader = reader;
  }
  clearNewReader() {
    this.newReader = {
      name: null,
      nic: null,
      contact: null,
      address: null
    };
    this.recentSavedUpdateReader = {
      readerId: null,
      name: null,
      nic: null,
      contact: null,
      address: null
    };
  }
  validate() {
    'use strict';
  
    // Fetch all the forms we want to apply custom Bootstrap validation styles to
    const forms = document.querySelectorAll('.needs-validation');
  
    // Loop over them and prevent submission
    Array.from(forms).forEach(form => {
      form.addEventListener('submit', event => {
        if (!(form instanceof HTMLFormElement) || !form.checkValidity()) {
          event.preventDefault();
          event.stopPropagation();
        }
  
        form.classList.add('was-validated');
      }, false);
    });
  }
  loadReaders() {
    this.http.get('http://localhost:8080/reader').subscribe((data) => {
      this.readersList = data;
      console.log(this.readersList)
    })
  }
  deleteReader(id: string) {
    this.http.delete(`http://localhost:8080/reader/${id}`).subscribe((data) => {
      this.readersList = data;
      console.log(this.readersList)
    }, () => {
      Swal.fire({
        title: "Successfull!",
        text: "Reader Deleted successfully",
        icon: "success"
      });
      this.clearNewReader();
      this.loadReaders();
    })
  }
  addReader() {
    this.http.post('http://localhost:8080/reader', this.newReader).subscribe((data) => {
      console.log(data);
      Swal.fire({
        title: "Successfull!",
        text: "Reader \'" + this.newReader.name + "\' added successfully",
        icon: "success"
      });
      this.clearNewReader();
      this.ngOnInit();
    })
  }
  updateReader() {
    this.http.post('http://localhost:8080/reader', this.recentSavedUpdateReader).subscribe((data) => {
      console.log(data);
      Swal.fire({
        title: "Successfull!",
        text: "Reader \'" + this.recentSavedUpdateReader.name + "\' Updated successfully",
        icon: "success"
      });
      this.clearNewReader();
      this.ngOnInit();
    })
  }



}
