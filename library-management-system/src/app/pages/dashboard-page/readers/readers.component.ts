import { CommonModule, NgFor } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { APP_BOOTSTRAP_LISTENER, ChangeDetectionStrategy, ChangeDetectorRef, Component, NgModule } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { NgModel } from '@angular/forms';
import { RouterLink } from '@angular/router';
import Swal from 'sweetalert2';
import { AddModalComponent } from './add-modal/add-modal.component';

@Component({
  selector: 'app-readers',
  standalone: true,
  imports: [HttpClientModule, RouterLink, FormsModule, CommonModule, NgFor, ReactiveFormsModule, AddModalComponent],
  templateUrl: './readers.component.html',
  styleUrl: './readers.component.css'
})

export class ReadersComponent {

  private http;
  public readersList: any;
  public recentSavedReader: any;
  public recentSavedUpdateReader: any;
  public addReaderForm : any;


  public newReader = {
    firstName: null,
    lastName: null,
    nic: null,
    contact: null,
    address: null,
    gmail: null,
    status : 'not borrowed'
  }

  
  constructor(httpClient: HttpClient, formBuilder : FormBuilder) {
    this.http = httpClient;
    this.addReaderForm = formBuilder.group({
      firstName : ['', Validators.required],
      lastName : ['', Validators.required],
      nic : ['', [Validators.required, Validators.pattern(/^\d{12}$|^\d{9}v$/)]],
      contact : ['', [Validators.required, Validators.pattern(/^0\d{9}$/)]],
      address : ['', Validators.required],
      gmail : ['', [Validators.required, Validators.pattern(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,6}$/i)]]
    })


  }

  ngOnInit(): void {
    this.loadReaders();
  }

  saveReader(reader: any) {
    this.recentSavedReader = reader;
  }
  saveReaderWithId(reader: any) {
    this.recentSavedUpdateReader = reader;
  }
  clearNewReader() {
    this.newReader = {
      firstName: null,
      lastName: null,
      nic: null,
      contact: null,
      address: null,
      gmail: null,
      status : 'not borrowed'
    };
    this.recentSavedUpdateReader = {
      firstName: null,
      lastName: null,
      nic: null,
      contact: null,
      address: null,
      gmail: null
    };
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
    console.log(this.newReader);
    this.http.post('http://localhost:8080/reader', this.newReader).subscribe((data) => {
      console.log(data);
      Swal.fire({
        title: "Successfull!",
        text: "Reader \'" + this.newReader.firstName + "\' added successfully",
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
