import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { TypeConsommableService } from '../../../../services/consommable/type-consommable.service';
import { AjoutTypeConsommableComponent } from './ajout-type-consommable/ajout-type-consommable.component';



@Component({
  selector: 'app-type-consommable',
  templateUrl: './type-consommable.component.html',
  styleUrls: ['./type-consommable.component.css']
})
export class TypeConsommableComponent implements OnInit {
public typeConsommables:any;
public zones:any;
public page:number=0;
public size:number=5;
public total:number;
public pages : Array<number>;
  constructor(private typeconsommableServ:TypeConsommableService,
   private router:Router,
    public dialog: MatDialog) {}

    ngOnInit(): void {
      this.gettypeConsommables();
    }
  
    gettypeConsommables() {
    this.typeconsommableServ.gettypeConsommablesPage(this.page,this.size).subscribe(
      data => {
        
        this.total=data["totalPages"];
        this.pages=new Array<number>(this.total);
        this.typeConsommables =  data["content"];
        console.log(data);
      },
      err => {
        console.log(err);
      }
    );
  }
  onChercher(value){
    this.typeconsommableServ.gettypetypeConsommablesByKeyword(value.cle,this.page,this.size).subscribe(
      data => {
        
        this.total=data["totalPages"];
        this.pages=new Array<number>(this.total);
        this.typeConsommables =  data["content"];
        console.log(data);
      },
      err => {
        console.log(err);
      }
    ); 
  }
  
  onPage(i){
    this.page=i;
    this.gettypeConsommables();
  }
    openDialogEdit(id): void {
      this.typeconsommableServ.changeId(id);
      const dialogConfig = new MatDialogConfig();
      dialogConfig.disableClose = true;
      dialogConfig.autoFocus = true;
      dialogConfig.width = "60%";
      this.dialog.open(AjoutTypeConsommableComponent,dialogConfig);
      
  }
  openDialog(): void {
    this.typeconsommableServ.changeId(0);
      const dialogConfig = new MatDialogConfig();
      dialogConfig.disableClose = true;
      dialogConfig.autoFocus = true;
      dialogConfig.width = "60%";
      this.dialog.open(AjoutTypeConsommableComponent,dialogConfig);
    
  }
Supprimer(id){
  this.typeconsommableServ.deleteTypeConsommable(id).subscribe(
    res => {
        
      this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    this.router.onSameUrlNavigation = 'reload';
    this.router.navigate(['/pages/Consommable/Type_Consommable']);

          console.log(res);

      },  
    err => {
        console.log(err);
});
}
}
