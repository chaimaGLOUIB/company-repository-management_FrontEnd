import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AjoutCategorieArretComponent } from './ajout-categorie-arret/ajout-categorie-arret.component';
import { CategorieArretService } from '../../../../services/categorie/categorie-arret.service';


@Component({
  selector: 'app-categorie-arret',
  templateUrl: './categorie-arret.component.html',
  styleUrls: ['./categorie-arret.component.css']
})
export class CategorieArretComponent implements OnInit {
public categorieArrets:any;
public page:number=0;
public size:number=5;
public total:number;
public pages : Array<number>;
  constructor(private categoriearretServ:CategorieArretService,
   private router:Router,
    public dialog: MatDialog) {}

  ngOnInit(): void {
    this.getcategoriearrets();
  }

  getcategoriearrets() {
    this.categoriearretServ.getcategorieArretsPage(this.page,this.size).subscribe(
      data => {
        
        this.total=data["totalPages"];
        this.pages=new Array<number>(this.total);
        this.categorieArrets = data["content"];
        console.log(data);
      },
      err => {
        console.log(err);
      }
    );
  }
  onChercher(value){
    this.categoriearretServ.getcategorieArretsByKeyword(value.cle,this.page,this.size).subscribe(
      data => {
        
        this.total=data["totalPages"];
        this.pages=new Array<number>(this.total);
        this.categorieArrets =  data["content"];
        console.log(data);
      },
      err => {
        console.log(err);
      }
    ); 
  }
  
  onPage(i){
    this.page=i;
    this.getcategoriearrets;
  }
    openDialogEdit(id): void {
      this.categoriearretServ.changeId(id);
      const dialogConfig = new MatDialogConfig();
      dialogConfig.disableClose = true;
      dialogConfig.autoFocus = true;
      dialogConfig.width = "60%";
      this.dialog.open(AjoutCategorieArretComponent,dialogConfig);
      
  }
  openDialog(): void {
    this.categoriearretServ.changeId(0);
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "60%";
    this.dialog.open(AjoutCategorieArretComponent,dialogConfig);
    
    
  }
Supprimer(id){
  if (window.confirm('Are you sure you want to delete?')) {

  this.categoriearretServ.deleteCategorieArret(id).subscribe(
    res => {
        
      this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    this.router.onSameUrlNavigation = 'reload';
    this.router.navigate(['/pages/Arret/Categorie_Arret']);

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
