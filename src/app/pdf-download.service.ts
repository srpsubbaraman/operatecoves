import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PdfDownloadService {

  constructor(private http: HttpClient) { }

  downloadPdf(fileName: string) {
    return this.http.get(`/assets/${fileName}`, {
      responseType: 'blob'
    });
  }
}
