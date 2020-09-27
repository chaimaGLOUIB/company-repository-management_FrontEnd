import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';
import * as jsPDF from 'jspdf';
import html2canvas from 'html2canvas';  
import { MatDialogConfig, MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AjoutBudgetComponent } from '../ajout-budget/ajout-budget.component';
import { RapportBService } from '../../../../services/rapportb/rapportb.service';
import { DatePipe } from '@angular/common';
import { AjoutRegionComponent } from '../../region/ajout_region/ajout-region/ajout-region.component';
 

@Component({
  selector: 'app-rapportMpdf',
  templateUrl: './rapportMpdf.component.html',
  styleUrls: ['./rapportMpdf.component.scss']
})
export class RapportMpdfComponent implements OnInit {
  @ViewChild('pdfTable', {static: false}) pdfTable: ElementRef;

  alert:boolean=false;
rapport:any;
id:any;
p:any;
date = new Date();
myDate: any;
  constructor(  private RapportServ:RapportBService,
    private datePipe: DatePipe,
    private router:Router,
    public dialog: MatDialog) {this.myDate = this.datePipe.transform(this.date, 'yyyy-MM-dd'); }

public ajoutBudget(){

 
 
      var dateDebut = this.rapport.periode.slice(2, 13);
      var dateFin = this.rapport.periode.slice(21, 32);
     
      if (Date.parse(this.myDate) < Date.parse(this.datePipe.transform(dateDebut, 'yyyy-MM-dd'))
        || Date.parse(this.myDate) > Date.parse(this.datePipe.transform(dateFin, 'yyyy-MM-dd'))) {
          console.log('chooocho')
          this.alert=true;
      }
      else {
        this.RapportServ.changeId(this.rapport.id,0);
        const dialogConfig = new MatDialogConfig();
        dialogConfig.disableClose = true;
        dialogConfig.autoFocus = true;
        dialogConfig.width = "60%";
        this.dialog.open(AjoutBudgetComponent,dialogConfig);      }
    
  
}

onClose(){
  this.alert=false
}
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
 

ngOnInit(): void {
  this.RapportServ.RapportData.subscribe(data => {
    this.rapport = data;})
  
   
   
    
}

}
