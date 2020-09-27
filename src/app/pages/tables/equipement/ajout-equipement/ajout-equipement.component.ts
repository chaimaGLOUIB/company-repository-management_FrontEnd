import { Component, OnInit } from '@angular/core';

import { Router } from '@angular/router';
import { MatDialogRef } from '@angular/material/dialog';
import { EquipementService } from '../../../../services/equipement/equipement.service';
import {PrestationService } from '../../../../services/prestation/prestation.service';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { NbDialogRef } from '@nebular/theme';

@Component({
  selector: 'app-ajout-equipement',
  templateUrl: './ajout-equipement.component.html',
  styleUrls: ['./ajout-equipement.component.css']
})
export class AjoutEquipementComponent implements OnInit {
  registerForm: FormGroup;
  submitted = false;
  equipements:any;
  prestations:any;
  id:number;
  constructor(private formBuilder: FormBuilder,
    private equipementService: EquipementService,
    private prestationService: PrestationService,
              private router: Router,
              public dialogRef: MatDialogRef<AjoutEquipementComponent>) { }

  ngOnInit() {
  this.getprestations();
      this.registerForm = this.formBuilder.group({
          description: [''],
          compte: ['', [Validators.required]],
          prestation: ['', [Validators.required]],
          etat : ['', Validators.required],
         nombre_poste: ['', [Validators.required]],
          nom : ['', [Validators.required,this.equipementValidator]]

          
      });
     
      this.equipementService.IdData.subscribe(data => {
        this.id = data;
        if (this.id !== 0) {
          this.equipementService.getEquipement(this.id).subscribe(data => {
            this.equipements= data;
            
             this.registerForm.controls['nom'].setValue(this.equipements.nom);
              this.registerForm.controls['compte'].setValue(this.equipements.compte);
              this.registerForm.controls['etat'].setValue(this.equipements.etat);
              this.registerForm.controls['description'].setValue(this.equipements.description);
              this.registerForm.controls['nombre_poste'].setValue(this.equipements.nombre_poste);
              this.registerForm.controls['prestation'].setValue(this.equipements.prestation);


            
          }, error => { console.log("Error while gettig post details") });
        }
        
        
      });
     

  }
  update(id,equipement) {
    this.equipementService.updateEquipement(id,equipement).subscribe(
      data =>{
       console.log(data);
      }, error => console.log(error));
   this.gotoList();

  }

  // convenience getter for easy access to form fields
  get f() { return this.registerForm.controls; }

 
  
  equipementValidator(control: AbstractControl) {
    if (control.value ==='MACHINE RAISE RBM6' || control.value ==='SONDEUSE CS14 N°10')
   { 
     

    return null ;
      
    }
    return { nom: true };
  }
  
  onReset() {
      this.submitted = false;
      this.registerForm.reset();
  }
  save(equipement) {
    this.equipementService.addEquipement(equipement).subscribe(
      data =>{
       console.log(data);
      }, error => console.log(error));
   this.gotoList();

  }

  onSubmit(equipement) {
    this.submitted = true;
    
    if (this.registerForm.invalid) {
      return;
    }
    if(this.id!==0)
    {
      this.update(this.id,equipement);
    }
    else{
     this.save(equipement);}    alert('SUCCESS!! :-)\n\n' + JSON.stringify(this.registerForm.value, null, 4));
    this.onClose();
}

onClose() {
  this.dialogRef.close();
}
  gotoList() {
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    this.router.onSameUrlNavigation = 'reload';
    this.router.navigate(['/pages/Equipement/Equipement']);  }
  getprestations(){
    this.prestationService.getPrestations().subscribe(
      data =>{
        this.prestations=data;
        console.log(data);
      },
     error =>{
       console.log(error);
     }
      
    )
  }
}