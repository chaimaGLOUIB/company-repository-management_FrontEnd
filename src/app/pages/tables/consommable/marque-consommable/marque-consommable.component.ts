import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { MarqueConsommableService } from '../../../../services/consommable/marque-consommable.service';
import { AjoutMarqueConsommableComponent } from './ajout-marque-consommable/ajout-marque-consommable.component';



@Component({
  selector: 'app-marque-consommable',
  templateUrl: './marque-consommable.component.html',
  styleUrls: ['./marque-consommable.component.css']
})
export class MarqueConsommableComponent implements OnInit {
public marqueConsommables:any;
public zones:any;
public page:number=0;
public size:number=5;
public total:number;
public pages : Array<number>;
  constructor(private marqueconsommableServ:MarqueConsommableService,
   private router:Router,
    public dialog: MatDialog) {}

    ngOnInit(): void {
      this.getmarqueConsommables();
    }
  
    getmarqueConsommables() {
    this.marqueconsommableServ.getmarqueConsommablesPage(this.page,this.size).subscribe(
      data => {
        
        this.total=data["totalPages"];
        this.pages=new Array<number>(this.total);
        this.marqueConsommables =  data["content"];
        console.log(data);
      },
      err => {
        console.log(err);
      }
    );
  }
  onChercher(value){
    this.marqueconsommableServ.getmarqueConsommablesByKeyword(value.cle,this.page,this.size).subscribe(
      data => {
        
        this.total=data["totalPages"];
        this.pages=new Array<number>(this.total);
        this.marqueConsommables =  data["content"];
        console.log(data);
      },
      err => {
        console.log(err);
      }
    ); 
  }
  
  onPage(i){
    this.page=i;
    this.getmarqueConsommables();
  }
    openDialogEdit(id): void {
      this.marqueconsommableServ.changeId(id);
      const dialogConfig = new MatDialogConfig();
      dialogConfig.disableClose = true;
      dialogConfig.autoFocus = true;
      dialogConfig.width = "60%";
      this.dialog.open(AjoutMarqueConsommableComponent,dialogConfig);
      
  }
  openDialog(): void {
    this.marqueconsommableServ.changeId(0);
      const dialogConfig = new MatDialogConfig();
      dialogConfig.disableClose = true;
      dialogConfig.autoFocus = true;
      dialogConfig.width = "60%";
      this.dialog.open(AjoutMarqueConsommableComponent,dialogConfig);
    
  }
Supprimer(id){
  this.marqueconsommableServ.deleteMarqueConsommablet(id).subscribe(
    res => {
        
      this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    this.router.onSameUrlNavigation = 'reload';
    this.router.navigate(['/pages/Consommable/Marque_Consommable']); 

          console.log(res);

      },  
    err => {
        console.log(err);
});
}
}
