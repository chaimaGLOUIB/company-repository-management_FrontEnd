import { Component, OnInit } from '@angular/core';

import { Router } from '@angular/router';
import { MatDialogRef } from '@angular/material/dialog';
import { PrestationService } from '../../../../services/prestation/prestation.service';

import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { Categorie_PrestationService } from '../../../../services/prestation/categorie-prestation.service';
import { NbDialogRef } from '@nebular/theme';

@Component({
  selector: 'app-ajout-prestation',
  templateUrl: './ajout-prestation.component.html',
  styleUrls: ['./ajout-prestation.component.css']
})
export class AjoutPrestationComponent implements OnInit {
  registerForm: FormGroup;
  submitted = false;
  prestations:any;
  categories:any;
  id:number;
  constructor(private formBuilder: FormBuilder,
    private prestationService: PrestationService,
    private categorieService: Categorie_PrestationService,
              private router: Router,
              public dialogRef: MatDialogRef<AjoutPrestationComponent>) { }

  ngOnInit() {
  this.getCategorie();
      this.registerForm = this.formBuilder.group({
          description: [''],
          temps_ouverture: [''],
          etat : ['', Validators.required],
          nom : ['', [Validators.required,this.prestationValidator]],
          categorie: ['', [Validators.required]],

          
      });
      this.prestationService.IdData.subscribe(data => {
        this.id = data;
        if (this.id !== 0) {
          this.prestationService.getPrestation(this.id).subscribe(data => {
            this.prestations= data;
             this.registerForm.controls['nom'].setValue(this.prestations.nom);
              this.registerForm.controls['categorie'].setValue(this.prestations.categorie);
              this.registerForm.controls['etat'].setValue(this.prestations.etat);
              this.registerForm.controls['description'].setValue(this.prestations.description);
              this.registerForm.controls['temps_ouverture'].setValue(this.prestations.temps_ouverture);


            
          }, error => { console.log("Error while gettig post details") });
        }
        
        
      });
  }
  
  // convenience getter for easy access to form fields
  get f() { return this.registerForm.controls; }

 tempsValidator(control: AbstractControl){
  
  
   if( this.registerForm.controls['categorie'].value ==='SONDAGE DESTRUCTIF')
   {

    return  control.setValidators([Validators.required]); 
  }
  return null;

}

  prestationValidator(control: AbstractControl) {
    if (control.value ==='SCL jour' || control.value ==='SCL Fond' || control.value ==='SRC' || control.value ==='TP CHR GD' || control.value ==='SRC'|| control.value ==='AL CHR GD')
   {
    
    return null ;
      
    }
    return { nom: true };
  }
  
  onReset() {
      this.submitted = false;
      this.registerForm.reset();
  }
  save(prestation) {
    this.prestationService.addPrestation(prestation).subscribe(
      data =>{
       console.log(data);
      }, error => console.log(error));
   this.gotoList();

  }

  onSubmit(prestation) {
    this.submitted = true;
    
    if (this.registerForm.invalid) {
      return;
    }
    if(this.id!==0)
    {
      this.update(this.id,prestation);
    }
    else{
     this.save(prestation);}    alert('SUCCESS!! :-)\n\n' + JSON.stringify(this.registerForm.value, null, 4));
    this.onClose();
}
update(id,prestation) {
  this.prestationService.updatePrestation(id,prestation).subscribe(
    data =>{
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
    this.router.navigate(['/pages/Prestation/Prestation']);  }

    getCategorie(){
    this.categorieService.getCategorie_Prestations().subscribe(
      data =>{
        this.categories=data;
        console.log(data);
      },
     error =>{
       console.log(error);
     }
      
    )
  }
}