import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Affectation_EquipementService } from '../../../../services/Equipement/affectation-equipement.service';
import { AjoutAffectationEquipementComponent } from './ajout-affectation-equipement/ajout-affectation-equipement.component';


@Component({
  selector: 'app-affectation-equipement',
  templateUrl: './affectation-equipement.component.html',
  styleUrls: ['./affectation-equipement.component.css']
})
export class AffectationEquipementComponent implements OnInit {
public affectationEquipements:any;
public page:number=0;
public size:number=5;
public total:number;
public pages : Array<number>;
  constructor(private affectationEquipementServ:Affectation_EquipementService,
    private router:Router,
    public dialog: MatDialog) {}

  ngOnInit(): void {
    this.getaffectationEquipements();
  }

  getaffectationEquipements() {
    this.affectationEquipementServ.getaffectation_EquipementsPage(this.page,this.size).subscribe(
      data => {
        
        this.total=data["totalPages"];
        this.pages=new Array<number>(this.total);
        this.affectationEquipements = data["content"];
        console.log(data);
      },
      err => {
        console.log(err);
      }
    );
  }
  onChercher(value){
    this.affectationEquipementServ.getaffectation_EquipementsByKeyword(value.cle,this.page,this.size).subscribe(
      data => {
        
        this.total=data["totalPages"];
        this.pages=new Array<number>(this.total);
        this.affectationEquipements =  data["content"];
        console.log(data);
      },
      err => {
        console.log(err);
      }
    ); 
  }
  
  onPage(i){
    this.page=i;
    this.getaffectationEquipements();
  }
    openDialogEdit(id): void {
      this.affectationEquipementServ.changeId(id);
      const dialogConfig = new MatDialogConfig();
      dialogConfig.disableClose = true;
      dialogConfig.autoFocus = true;
      dialogConfig.width = "60%";
      this.dialog.open(AjoutAffectationEquipementComponent,dialogConfig);
      
  }
  openDialog(): void {
    this.affectationEquipementServ.changeId(0);
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "60%";
    this.dialog.open(AjoutAffectationEquipementComponent,dialogConfig);
    
  }
Supprimer(id){
  if (window.confirm('Are you sure you want to delete?')) {

  this.affectationEquipementServ.deleteAffectation_Equipement(id).subscribe(
    res => {
        
      this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    this.router.onSameUrlNavigation = 'reload';
    this.router.navigate(['/pages/Equipement/Affectation_Equipement']);  

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
