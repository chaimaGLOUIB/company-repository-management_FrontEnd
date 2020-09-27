import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Categorie_PrestationService } from '../../../../services/prestation/categorie-prestation.service';
import { AjoutCategoriePrestationComponent } from './ajout-categorie-prestation/ajout-categorie-prestation.component';
import { NbDialogService } from '@nebular/theme';


@Component({
  selector: 'app-categorie-prestation',
  templateUrl: './categorie-prestation.component.html',
  styleUrls: ['./categorie-prestation.component.css']
})
export class CategoriePrestationComponent implements OnInit {
public categoriePrestations:any;
public page:number=0;
public size:number=5;
public total:number;
public pages : Array<number>;
  constructor(private categoriePrestationServ:Categorie_PrestationService,
   private router:Router,
    public dialog: MatDialog) {}

  ngOnInit(): void {
    this.getcategoriePrestations();
  }
  getcategoriePrestations() {
    this.categoriePrestationServ.getcategorie_PrestationsPage(this.page,this.size).subscribe(
      data => {
        
        this.total=data["totalPages"];
        this.pages=new Array<number>(this.total);
        this.categoriePrestations = data["content"];
        console.log(data);
      },
      err => {
        console.log(err);
      }
    );
  }
  onChercher(value){
    this.categoriePrestationServ.getcategorie_PrestationsByKeyword(value.cle,this.page,this.size).subscribe(
      data => {
        
        this.total=data["totalPages"];
        this.pages=new Array<number>(this.total);
        this.categoriePrestations =  data["content"];
        console.log(data);
      },
      err => {
        console.log(err);
      }
    ); 
  }
  
  onPage(i){
    this.page=i;
    this.getcategoriePrestations();
  }
    openDialogEdit(id): void {
      this.categoriePrestationServ.changeId(id);
      const dialogConfig = new MatDialogConfig();
      dialogConfig.disableClose = true;
      dialogConfig.autoFocus = true;
      dialogConfig.width = "60%";
      this.dialog.open(AjoutCategoriePrestationComponent,dialogConfig);
      
  }
  openDialog(): void {
    this.categoriePrestationServ.changeId(0);
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "60%";
    this.dialog.open(AjoutCategoriePrestationComponent,dialogConfig);
    
  }
Supprimer(id){
  if (window.confirm('Are you sure you want to delete?')) {

  this.categoriePrestationServ.deleteCategorie_Prestation(id).subscribe(
    res => {
        
      this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    this.router.onSameUrlNavigation = 'reload';
    this.router.navigate(['/pages/Prestation/Categorie_Prestation']);

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
