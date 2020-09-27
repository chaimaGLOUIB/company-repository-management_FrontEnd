import { Component, OnInit } from '@angular/core';
import { CollaborateurService } from '../../../services/collaborateur/collaborateur.service';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AjoutCollaborateurComponent } from './ajout-collaborateur/ajout-collaborateur.component';


@Component({
  selector: 'app-collaborateur',
  templateUrl: './collaborateur.component.html',
  styleUrls: ['./collaborateur.component.css']
})
export class CollaborateurComponent implements OnInit {
public collaborateurs:any;
public page:number=0;
public size:number=5;
public total:number;
public pages : Array<number>;
  constructor(private collaborateurServ:CollaborateurService,
    private router:Router,
    public dialog: MatDialog) {}

  ngOnInit(): void {
    this.getcollaborateurs();
  }

  getcollaborateurs() {
  this.collaborateurServ.getcollaborateursPage(this.page,this.size).subscribe(
    data => {
      
      this.total=data["totalPages"];
      this.pages=new Array<number>(this.total);
      this.collaborateurs = data["content"];
      console.log(data);
    },
    err => {
      console.log(err);
    }
  );
}
onChercher(value){
  this.collaborateurServ.getcollaborateursByKeyword(value.cle,this.page,this.size).subscribe(
    data => {
      
      this.total=data["totalPages"];
      this.pages=new Array<number>(this.total);
      this.collaborateurs = data["_embedded"].collaborateurs;
      console.log(data);
    },
    err => {
      console.log(err);
    }
  ); 
}

onPage(i){
  this.page=i;
  this.getcollaborateurs();
}
  openDialogEdit(id): void {
    this.collaborateurServ.changeId(id);
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "60%";
    this.dialog.open(AjoutCollaborateurComponent,dialogConfig);
    
}
openDialog(): void {
  this.collaborateurServ.changeId(0);
  const dialogConfig = new MatDialogConfig();
  dialogConfig.disableClose = true;
  dialogConfig.autoFocus = true;
  dialogConfig.width = "60%";
  this.dialog.open(AjoutCollaborateurComponent,dialogConfig);
  
}
Supprimer(id){
  if (window.confirm('Are you sure you want to delete?')) {

    this.collaborateurServ.deleteCollaborateur(id).subscribe(
      res => {
          
        this.router.routeReuseStrategy.shouldReuseRoute = () => false;
      this.router.onSameUrlNavigation = 'reload';
      this.router.navigate(['/pages/Collaborateur']);  
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
