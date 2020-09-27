import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';
import { RapportService } from '../../../../services/rapport/rapport.service';
import * as jsPDF from 'jspdf';
import html2canvas from 'html2canvas';  


@Component({
  selector: 'app-rapportspdf',
  templateUrl: './rapportspdf.component.html',
  styleUrls: ['./rapportspdf.component.scss']
})
export class RapportspdfComponent implements OnInit {
rapport:any;
@ViewChild('pdfTable', {static: false}) pdfTable: ElementRef;


public downloadAsPDF() {  
  var data = document.getElementById('content');  
  html2canvas(data).then(canvas => {  
    // Few necessary setting options  
    var imgWidth = 210;   
    var pageHeight = 295;    
    var imgHeight = 295;  
    var heightLeft = imgHeight;  

    const contentDataURL = canvas.toDataURL('image/png')  
    let pdf = new jsPDF('p', 'mm', 'a4'); // A4 size page of PDF  
    var position = 0;  
    pdf.addImage(contentDataURL, 'PNG', 0, position, imgWidth, imgHeight)  
    pdf.save('Rapport_Journalier.pdf'); // Generated PDF   
  });  
}  
  constructor(  private RapportServ:RapportService) { }

  ngOnInit(): void {
    this.RapportServ.RapportData.subscribe(data => {
      this.rapport = data;})
    }
}
