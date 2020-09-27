import { Component, OnInit } from '@angular/core';
import { Horaire_PosteService } from '../../../services/horaire_poste/horaire-poste.service';
import { Router } from '@angular/router';
import { AjoutHorairePosteComponent } from './ajout-horaire-poste/ajout-horaire-poste.component';
import { EditHorairePosteComponent } from './edit-horaire-poste/edit-horaire-poste.component';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';

@Component({
  selector: 'app-horaire-poste',
  templateUrl: './horaire-poste.component.html',
  styleUrls: ['./horaire-poste.component.css']
})
export class HorairePosteComponent implements OnInit {

  public Horaire_Postes:any;
  public page:number=0;
public size:number=5;
public total:number;
public pages : Array<number>;
  constructor(private horaireServ:Horaire_PosteService,
   private router:Router,
    public dialog: MatDialog) {}

    ngOnInit(): void {
      this.gethoraires();
    }
  
    gethoraires() {
    this.horaireServ.gethoraire_PostesPage(this.page,this.size).subscribe(
      data => {
        
        this.total=data["totalPages"];
        this.pages=new Array<number>(this.total);
        this.Horaire_Postes =  data["content"];
        console.log(data);
      },
      err => {
        console.log(err);
      }
    );
  }
  onChercher(value){
    this.horaireServ.gethoraire_PostesByKeyword(value.cle,this.page,this.size).subscribe(
      data => {
        
        this.total=data["totalPages"];
        this.pages=new Array<number>(this.total);
        this.Horaire_Postes =  data["content"];
        console.log(data);
      },
      err => {
        console.log(err);
      }
    ); 
  }
  
  onPage(i){
    this.page=i;
    this.gethoraires();
  }
    openDialogEdit(id): void {
      this.horaireServ.changeId(id);
      const dialogConfig = new MatDialogConfig();
      dialogConfig.disableClose = true;
      dialogConfig.autoFocus = true;
      dialogConfig.width = "60%";
      this.dialog.open(EditHorairePosteComponent,dialogConfig);
      
  }
  openDialog(): void {
    this.horaireServ.changeId(0);
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "60%";
    this.dialog.open(AjoutHorairePosteComponent,dialogConfig);
    
  }
Supprimer(id){
  if (window.confirm('Are you sure you want to delete?')) {

  this.horaireServ.deleteHoraire_Poste(id).subscribe(
    res => {
        
      this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    this.router.onSameUrlNavigation = 'reload';
    this.router.navigate(['/pages/Horaire_Poste']);

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
