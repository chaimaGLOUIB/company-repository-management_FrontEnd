import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AjoutTypeArretComponent } from './ajout-type-arret/ajout-type-arret.component';
import { TypeArretService } from '../../../../services/categorie/type-arret.service';


@Component({
  selector: 'app-type-arret',
  templateUrl: './type-arret.component.html',
  styleUrls: ['./type-arret.component.css']
})
export class TypeArretComponent implements OnInit {
public type_arrets:any;
public page:number=0;
public size:number=5;
public total:number;
public pages : Array<number>;
  constructor(private typearretServ:TypeArretService,
   private router:Router,
    public dialog: MatDialog) {}

  ngOnInit(): void {
    this.gettypearrets();
  }

  gettypearrets() {
    this.typearretServ.gettypeArretsPage(this.page,this.size).subscribe(
      data => {
        
        this.total=data["totalPages"];
        this.pages=new Array<number>(this.total);
        this.type_arrets =  data["content"];
        console.log(data);
      },
      err => {
        console.log(err);
      }
    );
  }
  onChercher(value){
    this.typearretServ.gettypeArretsByKeyword(value.cle,this.page,this.size).subscribe(
      data => {
        
        this.total=data["totalPages"];
        this.pages=new Array<number>(this.total);
        this.type_arrets =  data["content"];
        console.log(data);
      },
      err => {
        console.log(err);
      }
    ); 
  }
  
  onPage(i){
    this.page=i;
    this.gettypearrets;
  }
    openDialogEdit(id): void {
      this.typearretServ.changeId(id);
      const dialogConfig = new MatDialogConfig();
      dialogConfig.disableClose = true;
      dialogConfig.autoFocus = true;
      dialogConfig.width = "60%";
      this.dialog.open(AjoutTypeArretComponent,dialogConfig);
      
  }
  openDialog(): void {
    this.typearretServ.changeId(0);
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "60%";
    this.dialog.open(AjoutTypeArretComponent,dialogConfig);
    
    
  }
Supprimer(id){
  if (window.confirm('Are you sure you want to delete?')) {

  this.typearretServ.deleteTypeArret(id).subscribe(
    res => {
        
      this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    this.router.onSameUrlNavigation = 'reload';
    this.router.navigate(['/pages/Arret/Type_Arret']); 
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
