import { Component, OnInit } from '@angular/core';
import { AppareilService } from '../../../services/appareil/appareil.service';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { AjoutAppareilComponent } from './ajout-appareil/ajout-appareil.component';
import { Router } from '@angular/router';
import { NbDialogService } from '@nebular/theme';


@Component({
  selector: 'app-appareil',
  templateUrl: './appareil.component.html',
  styleUrls: ['./appareil.component.css']
})
export class AppareilComponent implements OnInit {
public appareils:any;
public page:number=0;
public size:number=5;
public total:number;
public pages : Array<number>;
  constructor(private appareilServ:AppareilService,
    public router:Router,
    public dialog: MatDialog) {}

  ngOnInit(): void {
    this.getappareils();
  }

  getappareils() {
  this.appareilServ.getappareilsPage(this.page,this.size).subscribe(
    data => {
      
      this.total=data["totalPages"];
      this.pages=new Array<number>(this.total);
      this.appareils =data["content"];
      console.log(data);
    },
    err => {
      console.log(err);
    }
  );
}
onChercher(value){
  this.appareilServ.getappareilsByKeyword(value.cle,this.page,this.size).subscribe(
    data => {
      
      this.total=data["totalPages"];
      this.pages=new Array<number>(this.total);
      this.appareils = data["content"];
      console.log(data);
    },
    err => {
      console.log(err);
    }
  ); 
}

onPage(i){
  this.page=i;
  this.getappareils();
}
  openDialogEdit(id): void {
    this.appareilServ.changeId(id);
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "60%";
    this.dialog.open(AjoutAppareilComponent,dialogConfig);
    
}
openDialog(): void {
  this.appareilServ.changeId(0);
  const dialogConfig = new MatDialogConfig();
  dialogConfig.disableClose = true;
  dialogConfig.autoFocus = true;
  dialogConfig.width = "60%";
  dialogConfig.width = "60%";
  this.dialog.open(AjoutAppareilComponent,dialogConfig);
  
}
   


Supprimer(id){
  if (window.confirm('Are you sure you want to delete?')) {
  this.appareilServ.deleteAppareil(id).subscribe(
    res => {
        
      this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    this.router.onSameUrlNavigation = 'reload';
    this.router.navigate(['/pages/Appareil']); 
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
