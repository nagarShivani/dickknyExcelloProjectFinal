import { Injectable } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { finalize } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FirebaseServiceService {

  constructor(private storage: AngularFireStorage) {}

  uploadFile(filePath: string, file: any): Promise<string> {
    return new Promise((resolve, reject) => {
      const fileRef = this.storage.ref(filePath);
      const task = this.storage.upload(filePath, file);

      task.snapshotChanges().pipe(
        finalize(() => {
          fileRef.getDownloadURL().subscribe({
            next: (url) => resolve(url),
            error: (error) => reject(error)
          });
        })
      ).subscribe();
    });
  }

  getFileUrl(filePath: string): Observable<string> {
    return this.storage.ref(filePath).getDownloadURL();
  }


  uploadFileMultiple(filePath: string, file: any): Promise<string> {
    return new Promise((resolve, reject) => {
      const fileRef = this.storage.ref(filePath);
      const task = this.storage.upload(filePath, file);

      task.snapshotChanges().pipe(
        finalize(() => {
          fileRef.getDownloadURL().subscribe({
            next: (url) => resolve(url),
            error: (error) => reject(error)
          });
        })
      ).subscribe();
    });
  }

  getFileUrlmultiple(filePath: string): Observable<string> {
    return this.storage.ref(filePath).getDownloadURL();
  }


}
