import { Component, OnInit } from '@angular/core';
import { PaysService } from '../../../services/pays/pays.service';

import { AjoutPaysComponent } from './ajout-pays/ajout-pays.component';
import { Router } from '@angular/router';
import { NbDialogService } from '@nebular/theme';
import { MatDialogConfig, MatDialog } from '@angular/material/dialog';


@Component({
  selector: 'app-pays',
  templateUrl: './pays.component.html',
  styleUrls: ['./pays.component.css']
})
export class PaysComponent implements OnInit {
public payss:any;
public page:number=0;
public size:number=5;
public total:number;
public pages : Array<number>;


  constructor(private paysServ:PaysService,
    private router:Router,
    public dialog: MatDialog,
    ) {}



  ngOnInit(): void {
    this.getpays();
  }

  getpays() {
    this.paysServ.getpaysPage(this.page,this.size).subscribe(
      data => {
        
        this.total=data["totalPages"];
        this.pages=new Array<number>(this.total);
        this.payss = data["content"];
        console.log(data);
      },
      err => {
        console.log(err);
      }
    );
  }

  onPage(i){
    this.page=i;
    this.getpays();
  }

  openDialogEdit(id): void {
    this.paysServ.changeId(id);
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "60%";
    this.dialog.open(AjoutPaysComponent,dialogConfig);
    
}
openDialog(): void {
  this.paysServ.changeId(0);
  const dialogConfig = new MatDialogConfig();
  dialogConfig.disableClose = true;
  dialogConfig.autoFocus = true;
  dialogConfig.width = "60%";
  this.dialog.open(AjoutPaysComponent,dialogConfig);
  
}
onChercher(value){
  this.paysServ.getpaysByKeyword(value.cle,this.page,this.size).subscribe(
    data => {
      
      this.total=data["totalPages"];
      this.pages=new Array<number>(this.total);
      this.payss =data["content"];
      console.log(data);
    },
    err => {
      console.log(err);
    }
  ); 
}
Supprimer(event){
  if (window.confirm('Are you sure you want to delete?')) {
    this.paysServ.deletePays(event).subscribe(
      res => {
          
        this.router.routeReuseStrategy.shouldReuseRoute = () => false;
      this.router.onSameUrlNavigation = 'reload';
      this.router.navigate(['/pages/Geographique/Pays']);  
            console.log(res);
  
        },  
      err => {
          console.log(err);
  });
  } else {
    event.confirm.reject();
  }
}
 
}

