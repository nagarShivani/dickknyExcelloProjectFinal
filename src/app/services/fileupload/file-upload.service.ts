import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
declare var AWS : any;
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class FileUploadService {
    // apiUrl : String = "http://localhost:4019/"
  headers: any;

  loadingFlag: boolean = false;
  uploadPercentage1: any = '';
  uploadPercentage: any = '';

  constructor(public http: HttpClient,
  ) {
   
  }

  private basePath: string = '/';



 

  uploadFilefirebase(file: File) {
    const filePath = `uploads/${Date.now()}_${file.name}`;
    // const fileRef = this.storage.ref(filePath);
   
  }
}
