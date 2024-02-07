import { CommonModule, NgFor } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { APP_BOOTSTRAP_LISTENER, Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { bootstrapApplication } from '@angular/platform-browser';
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
  }

  saveReader(reader: any) {
    this.recentSavedReader = reader;
  }
  clearNewReader(){
    this.newReader = {
      name: null,
      nic: null,
      contact: null,
      address: null
    };
  }

  loadReaders() {
    this.http.get('http://localhost:8080/reader/list').subscribe((data) => {
      this.readersList = data;
      console.log(this.readersList)
    })
  }
  deleteReader(id: string) {
    this.http.delete('http://localhost:8080/reader/delete/{id}').subscribe((data) => {
      this.readersList = data;
      console.log(this.readersList)
    })
  }
  addReader() {
    this.http.post('http://localhost:8080/reader/add', this.newReader).subscribe((data) => {
      console.log(data);
      Swal.fire({
        title: "Successfull!",
        text: "Reader \'"+this.newReader.name+"\' added successfully",
        icon: "success"
      });
      this.clearNewReader();
      this.ngOnInit();
    })
  }

}
