import { Component, OnInit } from '@angular/core';
import { ChantierService } from '../../../services/chantier/chantier.service';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AjoutChantierComponent } from './ajout-chantier/ajout-chantier.component';


@Component({
  selector: 'app-chantier',
  templateUrl: './chantier.component.html',
  styleUrls: ['./chantier.component.css']
})
export class ChantierComponent implements OnInit {
public chantiers:any;
public page:number=0;
public size:number=5;
public total:number;
public pages : Array<number>;
  constructor(private chantierServ:ChantierService,
    private router:Router,
    public dialog: MatDialog) {}

  ngOnInit(): void {
    this.getchantiers();
  }

  getchantiers() {
  this.chantierServ.getchantiersPage(this.page,this.size).subscribe(
    data => {
      
      this.total=data["totalPages"];
      this.pages=new Array<number>(this.total);
      this.chantiers = data["content"];
      console.log(data);
    },
    err => {
      console.log(err);
    }
  );
}
onChercher(value){
  this.chantierServ.getchantiersByKeyword(value.cle,this.page,this.size).subscribe(
    data => {
      
      this.total=data["totalPages"];
      this.pages=new Array<number>(this.total);
      this.chantiers = data["content"];
      console.log(data);
    },
    err => {
      console.log(err);
    }
  ); 
}

onPage(i){
  this.page=i;
  this.getchantiers();
}
  openDialogEdit(id): void {
    this.chantierServ.changeId(id);
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "60%";
    this.dialog.open(AjoutChantierComponent,dialogConfig);
    
}
openDialog(): void {
  this.chantierServ.changeId(0);
  const dialogConfig = new MatDialogConfig();
  dialogConfig.disableClose = true;
  dialogConfig.autoFocus = true;
  dialogConfig.width = "60%";
  this.dialog.open(AjoutChantierComponent,dialogConfig);
  
}
Supprimer(id){
  if (window.confirm('Are you sure you want to delete?')) {

    this.chantierServ.deleteChantier(id).subscribe(
      res => {
          
        this.router.routeReuseStrategy.shouldReuseRoute = () => false;
      this.router.onSameUrlNavigation = 'reload';
      this.router.navigate(['/pages/Geographique/Chantier']);
  
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
