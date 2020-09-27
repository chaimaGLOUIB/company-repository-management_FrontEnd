import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AjoutSousTraitantComponent } from './ajout-sous-traitant/ajout-sous-traitant.component';
import { Sous_TraitantService } from '../../../services/sous_traitant/sous-traitant.service';


@Component({
  selector: 'app-sous-traitant',
  templateUrl: './sous-traitant.component.html',
  styleUrls: ['./sous-traitant.component.css']
})
export class SousTraitantComponent implements OnInit {
public sousTraitants:any;
public page:number=0;
public size:number=5;
public total:number;
public pages : Array<number>;
  constructor(private sousTraitantServ:Sous_TraitantService,
    private router:Router,
    public dialog: MatDialog) {}

  ngOnInit(): void {
    this.getsousTraitants();
  }

  getsousTraitants() {
  this.sousTraitantServ.getsous_TraitantsPage(this.page,this.size).subscribe(
    data => {
      
      this.total=data["totalPages"];
      this.pages=new Array<number>(this.total);
      this.sousTraitants =  data["content"];
      console.log(data);
    },
    err => {
      console.log(err);
    }
  );
}
onChercher(value){
  this.sousTraitantServ.getsous_TraitantsByKeyword(value.cle,this.page,this.size).subscribe(
    data => {
      
      this.total=data["totalPages"];
      this.pages=new Array<number>(this.total);
      this.sousTraitants =  data["content"];
      console.log(data);
    },
    err => {
      console.log(err);
    }
  ); 
}

onPage(i){
  this.page=i;
  this.getsousTraitants();
}
  openDialogEdit(id): void {
    this.sousTraitantServ.changeId(id);
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "60%";
    this.dialog.open(AjoutSousTraitantComponent,dialogConfig);
    
}
openDialog(): void {
  this.sousTraitantServ.changeId(0);
  const dialogConfig = new MatDialogConfig();
  dialogConfig.disableClose = true;
  dialogConfig.autoFocus = true;
  dialogConfig.width = "60%";
  this.dialog.open(AjoutSousTraitantComponent,dialogConfig);
  
}
Supprimer(id){
  if (window.confirm('Are you sure you want to delete?')) {

    this.sousTraitantServ.deleteSous_Traitant(id).subscribe(
      res => {
          
        this.router.routeReuseStrategy.shouldReuseRoute = () => false;
      this.router.onSameUrlNavigation = 'reload';
      this.router.navigate(['/pages/Sous_Traitant']);
  
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
