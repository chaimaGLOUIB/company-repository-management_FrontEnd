import { Component, OnInit } from '@angular/core';
import { ConsommableService } from '../../../services/consommable/consommable.service';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AjoutConsommableComponent } from './ajout-consommable/ajout-consommable.component';


@Component({
  selector: 'app-consommable',
  templateUrl: './consommable.component.html',
  styleUrls: ['./consommable.component.css']
})
export class ConsommableComponent implements OnInit {
public consommables:any;
public page:number=0;
public size:number=5;
public total:number;
public pages : Array<number>;
  constructor(private consommableServ:ConsommableService,
    private router:Router,
    public dialog: MatDialog) {}

  ngOnInit(): void {
    this.getconsommables();
  }

  getconsommables() {
  this.consommableServ.getconsommablesPage(this.page,this.size).subscribe(
    data => {
      
      this.total=data["totalPages"];
      this.pages=new Array<number>(this.total);
      this.consommables =  data["content"];
      console.log(data);
    },
    err => {
      console.log(err);
    }
  );
}
onChercher(value){
  this.consommableServ.getconsommablesByKeyword(value.cle,this.page,this.size).subscribe(
    data => {
      
      this.total=data["totalPages"];
      this.pages=new Array<number>(this.total);
      this.consommables =  data["content"];
      console.log(data);
    },
    err => {
      console.log(err);
    }
  ); 
}

onPage(i){
  this.page=i;
  this.getconsommables();
}
  openDialogEdit(id): void {
    this.consommableServ.changeId(id);
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "60%";
    this.dialog.open(AjoutConsommableComponent,dialogConfig);
    
}
openDialog(): void {
  this.consommableServ.changeId(0);
  const dialogConfig = new MatDialogConfig();
  dialogConfig.disableClose = true;
  dialogConfig.autoFocus = true;
  dialogConfig.width = "60%";
  this.dialog.open(AjoutConsommableComponent,dialogConfig);
  
}
Supprimer(id){
  if (window.confirm('Are you sure you want to delete?')) {

    this.consommableServ.deleteConsommable(id).subscribe(
      res => {
          
        this.router.routeReuseStrategy.shouldReuseRoute = () => false;
      this.router.onSameUrlNavigation = 'reload';
      this.router.navigate(['/pages/Consommable/Consommable']); 
  
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
