import { Component, OnInit, ViewChild, ElementRef, TemplateRef } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { AjoutRapportbComponent } from './ajout-rapportb/ajout-rapportb.component';
import { Router } from '@angular/router';
import { RapportBService } from '../../../services/rapportb/rapportb.service';
import { DatePipe } from '@angular/common';
import { NbDialogService } from '@nebular/theme';


@Component({
  selector: 'app-rapportb',
  templateUrl: './rapportb.component.html',
  styleUrls: ['./rapportb.component.css']
})
export class RapportbComponent implements OnInit {
  public Rapports: any;
  date = new Date();
  myDate: any;
  alert:boolean=false;
  public rapport: any;
  public page: number = 0;
  public size: number = 5;
  public total: number;
  public pages: Array<number>;
  constructor(private RapportServ: RapportBService,
    private dialogService: NbDialogService,
    private datePipe: DatePipe,
    public router: Router) { this.myDate = this.datePipe.transform(this.date, 'yyyy-MM-dd'); }
  @ViewChild('pdfTable', { static: false }) pdfTable: ElementRef;

  ngOnInit(): void {
    this.getRapports();
  }

  getRapports() {
    this.RapportServ.getRapportBsPage(this.page, this.size).subscribe(
      data => {

        this.total = data["totalPages"];
        this.pages = new Array<number>(this.total);
        this.Rapports = data["content"];
        console.log(data);
      },
      err => {
        console.log(err);
      }
    );
  }
  onChercher(value) {
    this.RapportServ.getRapportBsByKeyword(value.cle, this.page, this.size).subscribe(
      data => {

        this.total = data["totalPages"];
        this.pages = new Array<number>(this.total);
        this.Rapports = data["content"];
        console.log(data);
      },
      err => {
        console.log(err);
      }
    );
  }

  onPage(i) {
    this.page = i;
    this.getRapports();
  }

  afficher(p) {
    this.RapportServ.sendRapport(p);


    this.router.navigate(['/pages/Rapport/Rapport_Budget_Machine/Rapportpdf']);

  }
  Edit(id) {
    this.RapportServ.changeId(id, 0);

    this.router.navigate(['/pages/Rapport/Rapport_Budget_Machine/Ajout_Rapport_Machine']);

  }
  ajoutBudget(p) {
        this.RapportServ.sendRapport(p);
        var dateDebut = p.periode.slice(2, 13);
        var dateFin = p.periode.slice(21, 32);
        console.log(Date.parse(this.myDate));
        console.log(Date.parse(this.datePipe.transform(dateDebut, 'yyyy-MM-dd')));
    
        if (Date.parse(this.myDate) < Date.parse(this.datePipe.transform(dateDebut, 'yyyy-MM-dd'))
          || Date.parse(this.myDate) > Date.parse(this.datePipe.transform(dateFin, 'yyyy-MM-dd'))) {
            console.log('chooocho')
          this.alert=true;
        }
        else {
         this.router.navigate(['/pages/Rapport/Rapport_Budget_Machine/Rapportpdf']);
        }
      
  }
  onClose()
  {
    this.alert=false;
  }
  telecharger(id) {

    {
      this.RapportServ.changeId(id, 1);

      this.router.navigate(['/pages/Rapport/Rapport_Budget_Machine/Rapportpdf']);
    }
  }
  Supprimer(id) {
    if (window.confirm('Are you sure you want to delete?')) {

    this.RapportServ.deleteRapportB(id).subscribe(
      res => {

        this.router.routeReuseStrategy.shouldReuseRoute = () => false;
        this.router.onSameUrlNavigation = 'reload';
        this.router.navigate(['/pages/Rapport/Rapport_Budget_Machine']);

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
