import { Component, OnInit, Injectable } from '@angular/core';

import { Router } from '@angular/router';
import { NbDialogRef } from '@nebular/theme';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { UtilisateurService } from '../../../../../services/utilisateur/utilisateur.service';
import { SignUpInfo } from '../../../../../services/auth/signup-info';
import { AuthService } from '../../../../../services/auth/auth.service';

@Component({
  selector: 'app-ajout-user',
  templateUrl: './ajout-user.component.html',
  styleUrls: ['./ajout-user.component.scss']
})

export class AjoutUserComponent implements OnInit {
  signupInfo: SignUpInfo;
  isSignedUp = false;
  isSignUpFailed = false;
  errorMessage = '';
  registerForm: FormGroup;
  submitted = false;
  user: any;
  done: any;
  id: number;
  constructor(
    private authService: AuthService,
    private formBuilder: FormBuilder,
    private service: UtilisateurService,
    private router: Router,
    public dialogRef: MatDialogRef<AjoutUserComponent>,
  ) { }



  ngOnInit() {
    this.service.IdData.subscribe(data => {
      this.id = data;


      if (this.id !== 0) {
        this.service.getUser(this.id).subscribe(data => {
          this.user = data;


          this.registerForm.controls['name'].setValue(this.user.name);
          this.registerForm.controls['username'].setValue(this.user.username);
          this.registerForm.controls['email'].setValue(this.user.email);
          this.registerForm.controls['role'].setValue(this.user.role.role);


        }, error => { console.log("Error while gettig post details") });
      }
      

    });






    this.registerForm = this.formBuilder.group({
     name: ['',Validators.required],
     username: ['',Validators.required],
     roles: [[],Validators.required],
     email: ['',[Validators.required,Validators.email]],
     password: ['',Validators.required],




    });

  }
  

  onSubmit(user) {
    console.log(user);
    this.submitted = true;

    if (this.registerForm.invalid) {
      return;
    }
    this.signupInfo = new SignUpInfo(
      user.name,
      user.username,
      user.email,
      user.password,
      user.roles);

    this.authService.signUp(this.signupInfo).subscribe(
      data => {
        console.log(data);
        this.isSignedUp = true;
        this.isSignUpFailed = false;
      },
      error => {
        console.log(error);
        this.errorMessage = error.error.message;
        this.isSignUpFailed = true;
      }
    );
    this.gotoList();
  }
  // convenience getter for easy access to form fields
  get f() { return this.registerForm.controls; }

  userValidator(control: AbstractControl) {
    if (control.value === 'nationnal' || control.value === 'internationnal') {
      return null;
    }
    return { nom: true };
  }

  onReset() {
    this.submitted = false;
    this.registerForm.reset();
  }
  save(user) {
    this.service.addUser(user).subscribe(
      data => {
        console.log(data);
      }, error => console.log(error));
    this.gotoList();

  }
  update(id, user) {
    this.service.updateUser(id, user).subscribe(
      data => {
        console.log(data);
      }, error => console.log(error));
    this.gotoList();

  }

  onClose() {
    this.dialogRef.close();
  }
  gotoList() {
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    this.router.onSameUrlNavigation = 'reload';
    this.router.navigate(['/pages/auth/register']);
  }
  Edit(p) {

  }
}