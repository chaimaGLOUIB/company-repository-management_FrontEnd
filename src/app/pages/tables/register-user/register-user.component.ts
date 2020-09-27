import { Component, OnInit } from '@angular/core';
import { SignUpInfo } from '../../../services/auth/signup-info';
import { AuthService } from '../../../services/auth/auth.service';
import { Router } from '@angular/router';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { UtilisateurService } from '../../../services/utilisateur/utilisateur.service';
import { AjoutUserComponent } from './AjoutUser/ajout-user/ajout-user.component';




@Component({
  selector: 'app-register-user',
  templateUrl: './register-user.component.html',
  styleUrls: ['./register-user.component.css']
})
export class RegisterUserComponent implements OnInit {
  form: any = {};
  signupInfo: SignUpInfo;
  isSignedUp = false;
  isSignUpFailed = false;
  errorMessage = '';
  public users:any;
  public page:number=0;
  public size:number=2;
  public total:number;
  public pages : Array<number>;

  constructor(private authService: AuthService,private userServ:UtilisateurService,
    private router:Router,
    public dialog: MatDialog) { }

  ngOnInit(): void {
    this.getusers();
  }

  getusers() {
  this.userServ.getUsersP(this.page,this.size).subscribe(
    data => {
      
      this.total=data["totalPages"];
      this.pages=new Array<number>(this.total);
      this.users = data["content"];
      console.log(data);
    },
    err => {
      console.log(err);
    }
  );
}
onChercher(value){
  this.userServ.getUsersByKeyword(value.cle,this.page,this.size).subscribe(
    data => {
      
      this.total=data["totalPages"];
      this.pages=new Array<number>(this.total);
      this.users =  data["content"];
      console.log(data);
    },
    err => {
      console.log(err);
    }
  ); 
}

onPage(i){
  this.page=i;
  this.getusers();
}
  openDialogEdit(id): void {
    this.userServ.changeId(id);
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "60%";
    this.dialog.open(AjoutUserComponent,dialogConfig);
    
}
openDialog(): void {
  this.userServ.changeId(0);
  const dialogConfig = new MatDialogConfig();
  dialogConfig.disableClose = true;
  dialogConfig.autoFocus = true;
  dialogConfig.width = "60%";
  this.dialog.open(AjoutUserComponent,dialogConfig);
  
}

Supprimer(id){
  if (window.confirm('Are you sure you want to delete?')) {

    this.userServ.deleteUser(id).subscribe(
      res => {
          
        this.router.routeReuseStrategy.shouldReuseRoute = () => false;
      this.router.onSameUrlNavigation = 'reload';
      this.router.navigate(['pages/Geographique/user']);
  
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
