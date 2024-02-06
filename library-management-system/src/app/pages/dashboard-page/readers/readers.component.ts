import { CommonModule, NgFor } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';

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
  public recentSavedReader : any;

  constructor(httpClient: HttpClient) {
    this.http = httpClient;
  }

  ngOnInit():void {
    this.loadReaders();
  }

  loadReaders() {
    this.http.get('http://localhost:8080/reader/list').subscribe((data) => {
      this.readersList = data;
      console.log(this.readersList)
    })
  }

  saveReader(reader : any){
    this.recentSavedReader = reader;
  }

}
