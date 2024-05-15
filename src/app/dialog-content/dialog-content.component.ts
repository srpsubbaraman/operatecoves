import { Component,Inject, ElementRef, ViewChild } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { jsPDF } from 'jspdf';
import  html2canvas  from 'html2canvas';

@Component({
  selector: 'app-dialog-content',
  templateUrl: './dialog-content.component.html',
  styleUrl: './dialog-content.component.css'
})
export class DialogContentComponent {
// constructor(@Inject(MAT_DIALOG_DATA) public data: any) {}

constructor(@Inject(MAT_DIALOG_DATA) public detailedInformation: any,public dialog: MatDialog) {
  console.log("JSON: "+JSON.stringify(detailedInformation))
}





Date: any = new Date().toLocaleDateString('en-GB');; 





exportToPDF(): void {
  const pdf = new jsPDF();
  const content = this.contentToExport.nativeElement;

  pdf.html(content, {
    callback: () => {
      pdf.save('exported_document.pdf');
    }
  });
}


openPrintDialog() {
  window.print();
}


// @ViewChild('contentToExport') contentToExport!: ElementRef;
@ViewChild('contentToExport') contentToExport!: ElementRef;

//For 1 page
// downloadPDF() {
//   const doc = new jsPDF('p', 'pt', 'a4');
//   const content = this.contentToExport.nativeElement;

//   html2canvas(content).then((canvas) => {
//   const imgWidth = 600; 
//   const imgHeight =                                 (canvas.height * imgWidth) / canvas.width;    
//   console.log(JSON.stringify("height "+canvas.height))
//   console.log(JSON.stringify("width "+canvas.width))

//   console.log("imgh "+imgHeight)
//   console.log("imgw "+imgWidth)


//   const contentDataURL = canvas.toDataURL('image/png');

//   doc.addImage(contentDataURL, 'PNG', 0, 0, imgWidth, imgHeight);
//   doc.save('Grooming_document.pdf');
//   });
// }





//for more than 1 page
downloadPDF() {
  const doc = new jsPDF('p', 'pt', 'a4');
  const content = this.contentToExport.nativeElement;

  
  const pageHeight = doc.internal.pageSize.height;
  const pageWidth = doc.internal.pageSize.width;

  html2canvas(content).then((canvas) => {
    const imgWidth = pageWidth;
    const imgHeight = (canvas.height * imgWidth) / canvas.width;

    
    const totalPages = Math.ceil(imgHeight / pageHeight);

    
    for (let i = 0; i < totalPages; i++) {
      const startY = -i * pageHeight;

      
      if (i > 0) {
        doc.addPage();
      }

      
      doc.addImage(canvas, 'PNG', 0, startY, imgWidth, imgHeight, undefined, 'FAST');
    }

    
    doc.save('Estimation_document.pdf');
  });
}












@ViewChild('containerFluid') containerFluid!: ElementRef;

  // makePDF() {
  //   const quotes = this.containerFluid.nativeElement;

  //   html2canvas(quotes).then((canvas) => {
  //     const pdf = new jsPDF('p', 'pt', 'a4');
  //     console.log("height " + quotes.clientHeight)
  //     for (let i = 0; i <= quotes.clientHeight / 980; i++) {
  //       const srcImg = canvas;
  //       const sX = 0;
  //       const sY = 980 * i;
  //       const sWidth = 980;
  //       const sHeight = 900;
  //       const dX = 0;
  //       const dY = 0;
  //       const dWidth = 900;
  //       const dHeight = 980;

  //       const onePageCanvas: HTMLCanvasElement = document.createElement('canvas');
  //       onePageCanvas.setAttribute('width', '900');
  //       onePageCanvas.setAttribute('height', '980');
  //       const ctx = onePageCanvas.getContext('2d');

  //       ctx!.drawImage(srcImg, sX, sY, sWidth, sHeight, dX, dY, dWidth, dHeight);

  //       const canvasDataURL = onePageCanvas.toDataURL('image/png', 1.0);

  //       const width = onePageCanvas.width;
  //       const height = onePageCanvas.clientHeight;

  //       if (i > 0) {
  //         pdf.addPage("letter" , "p" );
  //       }

  //       pdf.setPage(i + 1);
  //       pdf.addImage(canvasDataURL, 'PNG', 20, 40, width * 0.62, height * 0.62);
  //     }

  //     pdf.save('Test.pdf');
  //   });
  // }





  



}




