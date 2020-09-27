import { Component, OnInit } from "@angular/core";
import { AuthLoginInfo } from '../../services/auth/login-info';
import { AuthService } from '../../services/auth/auth.service';
import { TokenStorageService } from '../../services/auth/token-storage.service';
import { UserService } from '../../services/user.service';
import { UtilisateurService } from '../../services/utilisateur/utilisateur.service';



@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"]
})
export class LoginComponent implements OnInit {
  form: any = {};
  isLoggedIn = false;
  isLoginFailed = false;
  errorMessage = "";
  roles: string[] = [];
  user: any;
  private loginInfo: AuthLoginInfo;
  private personne: any = {};

  constructor(
    private authService: AuthService,
    private tokenStorage: TokenStorageService,
    private serviceUser: UserService,
    
    private serviceUtilisateur: UtilisateurService
  ) {}

  ngOnInit() {
    if (this.tokenStorage.getToken()) {
      this.isLoggedIn = true;
      this.roles = this.tokenStorage.getAuthorities();
    }
  }

  onSubmit(form) {
    
    this.form = form;
    console.log(this.form);

    this.loginInfo = new AuthLoginInfo(this.form.username, this.form.password);

    this.authService.attemptAuth(this.loginInfo).subscribe(
      data => {
        this.tokenStorage.saveToken(data.accessToken);
        this.tokenStorage.saveUsername(data.username);
        this.tokenStorage.saveAuthorities(data.authorities);

        this.isLoginFailed = false;
        this.isLoggedIn = true;
        this.roles = this.tokenStorage.getAuthorities();

        this.serviceUtilisateur.getUserU(this.form.username).subscribe(
          user => {
            console.log(user);
            console.log(this.roles);

            this.user = user;

           
            if (this.roles.includes("ROLE_USER")) {
              this.utilisateur(this.user);
              window.location.href = '/pages';


            }
            if (this.roles.includes("ROLE_ADMIN")) {
              this.utilisateur(this.user);
            window.location.href = '/pages/charts/chartjs';

            }
            
          },
          err => {
            console.log(err);
          }
        );

        //this.reloadPage();

        
      },
      error => {
        console.log(error);
        this.errorMessage = error.error.message;
        this.isLoginFailed = true;
      }
    );
  }

  reloadPage() {
    window.location.reload();
  }

  
  utilisateur(user: any) {
    this.personne.user = user;
    console.log(this.personne);
    this.serviceUtilisateur.exitUser(user).subscribe(
      exist => {
        console.log(exist);
        if (!exist) {
          this.serviceUtilisateur.addUser(this.personne).subscribe(
            thispersonne => {
              console.log(thispersonne);
              window.location.href = '/page';
            },
            err => {
              //console.log(err);
            }
          );
        }
      },
      err => {
        //console.log(err);
      }
    );
  }

}
