import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Type_PrestationService } from '../../../../services/prestation/type-prestation.service';
import { AjoutTypePrestationComponent } from './ajout-type-prestation/ajout-type-prestation.component';


@Component({
  selector: 'app-type-prestation',
  templateUrl: './type-prestation.component.html',
  styleUrls: ['./type-prestation.component.css']
})
export class TypePrestationComponent implements OnInit {
public typePrestations:any;
public page:number=0;
public size:number=5;
public total:number;
public pages : Array<number>;
  constructor(private typePrestationServ:Type_PrestationService,
   private router:Router,
    public dialog: MatDialog) {}

  ngOnInit(): void {
    this.gettypePrestations();
  }

  

  gettypePrestations() {
  this.typePrestationServ.gettype_PrestationsPage(this.page,this.size).subscribe(
    data => {
      
      this.total=data["totalPages"];
      this.pages=new Array<number>(this.total);
      this.typePrestations = data["content"];
      console.log(data);
    },
    err => {
      console.log(err);
    }
  );
}
onChercher(value){
  this.typePrestationServ.gettype_PrestationsByKeyword(value.cle,this.page,this.size).subscribe(
    data => {
      
      this.total=data["totalPages"];
      this.pages=new Array<number>(this.total);
      this.typePrestations =  data["content"];
      console.log(data);
    },
    err => {
      console.log(err);
    }
  ); 
}

onPage(i){
  this.page=i;
  this.gettypePrestations();
}
  openDialogEdit(id): void {
    this.typePrestationServ.changeId(id);
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "60%";
    this.dialog.open(AjoutTypePrestationComponent,dialogConfig);
    
}
openDialog(): void {
  this.typePrestationServ.changeId(0);
  const dialogConfig = new MatDialogConfig();
  dialogConfig.disableClose = true;
  dialogConfig.autoFocus = true;
  dialogConfig.width = "60%";
  this.dialog.open(AjoutTypePrestationComponent,dialogConfig);
  
}
Supprimer(id){
  this.typePrestationServ.deleteType_Prestation(id).subscribe(
    res => {
        
      this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    this.router.onSameUrlNavigation = 'reload';
    this.router.navigate(['/pages/Prestation/Type_Prestation']);

          console.log(res);

      },  
    err => {
        console.log(err);
});
}
}
