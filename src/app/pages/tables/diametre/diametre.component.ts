import { Component, OnInit } from '@angular/core';
import { DiametreService } from '../../../services/diametre/diametre.service';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AjoutDiametreComponent } from './ajout-diametre/ajout-diametre.component';


@Component({
  selector: 'app-diametre',
  templateUrl: './diametre.component.html',
  styleUrls: ['./diametre.component.css']
})
export class DiametreComponent implements OnInit {
public diametres:any;
public page:number=0;
public size:number=5;
public total:number;
public pages : Array<number>;
  constructor(private diametreServ:DiametreService,
    private router:Router,
    public dialog: MatDialog) {}

  ngOnInit(): void {
    this.getdiametres();
  }

  getdiametres() {
  this.diametreServ.getdiametresPage(this.page,this.size).subscribe(
    data => {
      
      this.total=data["totalPages"];
      this.pages=new Array<number>(this.total);
      this.diametres =  data["content"];
      console.log(data);
    },
    err => {
      console.log(err);
    }
  );
}
onChercher(value){
  this.diametreServ.getdiametresByKeyword(value.cle,this.page,this.size).subscribe(
    data => {
      
      this.total=data["totalPages"];
      this.pages=new Array<number>(this.total);
      this.diametres =  data["content"];
      console.log(data);
    },
    err => {
      console.log(err);
    }
  ); 
}

onPage(i){
  this.page=i;
  this.getdiametres();
}
  openDialogEdit(id): void {
    this.diametreServ.changeId(id);
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "60%";
    this.dialog.open(AjoutDiametreComponent,dialogConfig);
    
}
openDialog(): void {
  this.diametreServ.changeId(0);
  const dialogConfig = new MatDialogConfig();
  dialogConfig.disableClose = true;
  dialogConfig.autoFocus = true;
  dialogConfig.width = "60%";
  this.dialog.open(AjoutDiametreComponent,dialogConfig);
  
}
Supprimer(id){
  if (window.confirm('Are you sure you want to delete?')) {

    this.diametreServ.deleteDiametre(id).subscribe(
      res => {
          
        this.router.routeReuseStrategy.shouldReuseRoute = () => false;
      this.router.onSameUrlNavigation = 'reload';
      this.router.navigate(['/pages/Diametre']);  
  
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
