import { Component, OnInit } from '@angular/core';

import { Router } from '@angular/router';
import { MatDialogRef } from '@angular/material/dialog';

import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';

import { TypeArretService } from '../../../../../services/categorie/type-arret.service';
import { ClientService } from '../../../../../services/client/client.service';
import { CategorieArretService } from '../../../../../services/categorie/categorie-arret.service';
import { NbDialogRef } from '@nebular/theme';

@Component({
  selector: 'app-ajout-type-arret',
  templateUrl: './ajout-type-arret.component.html',
  styleUrls: ['./ajout-type-arret.component.css']
})
export class AjoutTypeArretComponent implements OnInit {
  registerForm: FormGroup;
  submitted = false;
  id:number;
  arrets:any;
  clients:any;
  categorieArrets:any;
  constructor(private formBuilder: FormBuilder,
    private typearretService: TypeArretService,
    private clientService: ClientService,
    private categorieArretService: CategorieArretService,
              private router: Router,
              public dialogRef: MatDialogRef<AjoutTypeArretComponent>) { }

  ngOnInit() {
  this.getcategorieArret();
  this.getclients(); 
      this.registerForm = this.formBuilder.group({
          description: [''],
          productivite : ['', Validators.required],
          typeArret : ['', [Validators.required,this.type_arretValidator]],
          client : ['', Validators.required],
          categorieArret : ['', Validators.required],
         

          
      });
      this.typearretService.IdData.subscribe(data => {
        this.id = data;
      
     
        if (this.id !== 0) {
          this.typearretService.getTypeArret(this.id).subscribe(data => {
            this.arrets= data;
            
            
              this.registerForm.controls['productivite'].setValue(this.arrets.productivite);
              this.registerForm.controls['description'].setValue(this.arrets.description);
              this.registerForm.controls['typeArret'].setValue(this.arrets.typeArret);
              this.registerForm.controls['client'].setValue(this.arrets.client);
              this.registerForm.controls['categorieArret'].setValue(this.arrets.categorieArret);

             

             
            
          }, error => { console.log("Error while gettig post details") });
        }
        
        
      });

     
      
     

  }
  

  // convenience getter for easy access to form fields
  get f() { return this.registerForm.controls; }

 
  
  type_arretValidator(control: AbstractControl) {
    if (control.value ==='Fumée' || control.value ==='Electricité' || control.value ==='Poussière'|| control.value ==='Manque outillage')
   {
    return null ; 
    
      
    }
    return { typeArret: true };
  }
  
  
  onReset() {
      this.submitted = false;
      this.registerForm.reset();
  }
  save(type_arret) {
    this.typearretService.addTypeArret(type_arret).subscribe(
      data =>{
       console.log(data);
      }, error => console.log(error));
   this.gotoList();

  }

  onSubmit(type_arret) {
    this.submitted = true;
    
    if (this.registerForm.invalid) {
      return;
    }
    if(this.id!==0)
    {
      this.update(this.id,type_arret);
    }
    else{this.save(type_arret);} 
    alert('SUCCESS!! :-)\n\n' + JSON.stringify(this.registerForm.value, null, 4));
    this.onClose();
}

onClose() {
  this.dialogRef.close();
}
  gotoList() {
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    this.router.onSameUrlNavigation = 'reload';
    this.router.navigate(['/pages/Arret/Type_Arret']);  }
  getclients(){
    this.clientService.getClients().subscribe(
      data =>{
        this.clients=data;
        console.log(data);
      },
     error =>{
       console.log(error);
     }
      
    )
  }
  getcategorieArret(){
    this.categorieArretService.getCategorieArrets().subscribe(
      data =>{
        this.categorieArrets=data;
        console.log(data);
      },
     error =>{
       console.log(error);
     }
      
    )
  }
  update(id,type_arret) {
    this.typearretService.updateTypeArret(id,type_arret).subscribe(
      data =>{
       console.log(data);
      }, error => console.log(error));
   this.gotoList();

  }
}