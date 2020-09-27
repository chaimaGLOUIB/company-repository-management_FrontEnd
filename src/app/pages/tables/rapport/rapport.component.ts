import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';
import { RapportService } from '../../../services/rapport/rapport.service';
import { Router } from '@angular/router';
import { AjoutRapportComponent } from './ajout-rapport/ajout-rapport.component';
import { RapportspdfComponent } from './rapportspdf/rapportspdf.component';
import * as jsPDF from 'jspdf';

@Component({
  selector: 'app-rapport',
  templateUrl: './rapport.component.html',
  styleUrls: ['./rapport.component.css']
})
export class RapportComponent implements OnInit {
public Rapports:any;
public rapport:any;
public page:number=0;
public size:number=5;
public total:number;
public pages : Array<number>;
  constructor(private RapportServ:RapportService,
    public router:Router) {}
    @ViewChild('pdfTable', {static: false}) pdfTable: ElementRef;

  ngOnInit(): void {
    this.getRapports();
  }
  public telecharger() {
    const doc = new jsPDF();
  
    const specialElementHandlers = {
      '#editor': function (element, renderer) {
        return true;
      }
    };
  
    const pdfTable = this.pdfTable.nativeElement;
  
    doc.fromHTML(pdfTable.innerHTML, 15, 15, {
      width: 190,
      'elementHandlers': specialElementHandlers
    });
  
    doc.save('tableToPdf.pdf');
  }
  getRapports() {
  this.RapportServ.getRapportsPage(this.page,this.size).subscribe(
    data => {
      
      this.total=data["totalPages"];
      this.pages=new Array<number>(this.total);
      this.Rapports =data["content"];
      console.log(data);
    },
    err => {
      console.log(err);
    }
  );
}
onChercher(value){
  this.RapportServ.getRapportsByKeyword(value.cle,this.page,this.size).subscribe(
    data => {
      
      this.total=data["totalPages"];
      this.pages=new Array<number>(this.total);
      this.Rapports = data["content"];
      console.log(data);
    },
    err => {
      console.log(err);
    }
  ); 
}

onPage(i){
  this.page=i;
  this.getRapports();
}
  
   afficher(p){
    this.RapportServ.sendRapport(p);

       
    this.router.navigate(['/pages/Rapport/Rapport_Journalier/Rapportpdf']);
    
  }
  Edit(id){
    this.RapportServ.changeId(id,0);
   
    this.router.navigate(['/pages/Rapport/Rapport_Journalier/Ajout_Rapport_Journalier']);
    
}
copier(id){
  
  this.RapportServ.changeId(id,1);
 
  this.router.navigate(['/pages/Rapport/Rapport_Journalier/Ajout_Rapport_Journalier']);
  
}
Supprimer(id){
  if (window.confirm('Are you sure you want to delete?')) {
  this.RapportServ.deleteRapport(id).subscribe(
    res => {
        
      this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    this.router.onSameUrlNavigation = 'reload';
    this.router.navigate(['/pages/Rapport/Rapport_Journalier']);

          console.log(res);

      },  
    err => {
        console.log(err);
});
} else {
  id.confirm.reject();
}
}
}
