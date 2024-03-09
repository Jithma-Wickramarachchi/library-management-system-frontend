import { NgClass } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-modal',
  standalone: true,
  imports: [FormsModule, FormsModule, ReactiveFormsModule, NgClass],
  templateUrl: './add-modal.component.html',
  styleUrl: './add-modal.component.css'
})
export class AddModalComponent {

  public addReaderForm: any;
  public http: any;
  @Output() public loadReaders = new EventEmitter<void>;

  public newReader = {
    firstName: null,
    lastName: null,
    nic: null,
    contact: null,
    address: null,
    gmail: null,
    status: 'not borrowed'
  }

  constructor(httpClient: HttpClient, formBuilder: FormBuilder) {
    this.http = httpClient;
    this.addReaderForm = formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      nic: ['', [Validators.required, Validators.pattern(/^\d{12}$|^\d{9}v$/)]],
      contact: ['', [Validators.required, Validators.pattern(/^0\d{9}$/)]],
      address: ['', Validators.required],
      gmail: ['', [Validators.required, Validators.pattern(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,6}$/i)]]
    })
  }
  addReader() {
    console.log(this.newReader);
    this.http.post('http://localhost:8080/reader', this.newReader).subscribe((data : any) => {
      console.log(data);
      Swal.fire({
        title: "Successfull!",
        text: "Reader \'" + this.newReader.firstName + "\' added successfully",
        icon: "success"
      });
      this.addReaderForm.reset();
      this.loadReaders.emit();
    })
  }
}
