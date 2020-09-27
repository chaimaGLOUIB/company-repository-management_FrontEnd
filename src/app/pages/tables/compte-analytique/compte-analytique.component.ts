import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Compte_AnalytiqueService } from '../../../services/compte_analytique/compte-analytique.service';
import { AjoutCompteAnalytiqueComponent } from './ajout-compte-analytique/ajout-compte-analytique.component';


@Component({
  selector: 'app-compte-analytique',
  templateUrl: './compte-analytique.component.html',
  styleUrls: ['./compte-analytique.component.css']
})
export class CompteAnalytiqueComponent implements OnInit {
public comptes:any;
public page:number=0;
public size:number=5;
public total:number;
public pages : Array<number>;
  constructor(private compteServ:Compte_AnalytiqueService,
   private router:Router,
    public dialog: MatDialog) {}
    ngOnInit(): void {
      this.getcompte_Analytiques();
    }
    getcompte_Analytiques() {
      this.compteServ.getcompte_AnalytiquesPage(this.page,this.size).subscribe(
        data => {
          
          this.total=data["totalPages"];
          this.pages=new Array<number>(this.total);
          this.comptes =  data["content"];
          console.log(data);
        },
        err => {
          console.log(err);
        }
      );
    }
    onChercher(value){
      this.compteServ.getcompte_AnalytiquesByKeyword(value.cle,this.page,this.size).subscribe(
        data => {
          
          this.total=data["totalPages"];
          this.pages=new Array<number>(this.total);
          this.comptes =  data["content"];
          console.log(data);
        },
        err => {
          console.log(err);
        }
      ); 
    }
    
    onPage(i){
      this.page=i;
      this.getcompte_Analytiques();
    }
      openDialogEdit(id): void {
        this.compteServ.changeId(id);
        const dialogConfig = new MatDialogConfig();
        dialogConfig.disableClose = true;
        dialogConfig.autoFocus = true;
        dialogConfig.width = "60%";
        this.dialog.open(AjoutCompteAnalytiqueComponent,dialogConfig);
        
    }
    openDialog(): void {
      this.compteServ.changeId(0);
      const dialogConfig = new MatDialogConfig();
      dialogConfig.disableClose = true;
      dialogConfig.autoFocus = true;
      dialogConfig.width = "60%";
      this.dialog.open(AjoutCompteAnalytiqueComponent,dialogConfig);
      
    }
Supprimer(id){
  if (window.confirm('Are you sure you want to delete?')) {

  this.compteServ.deleteCompte_Analytique(id).subscribe(
    res => {
        
      this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    this.router.onSameUrlNavigation = 'reload';
    this.router.navigate(['/pages/Compte_Analytique']);

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
