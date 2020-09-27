import { Component, OnInit } from '@angular/core';

import { Router } from '@angular/router';
import { MatDialogRef } from '@angular/material/dialog';
import { CollaborateurService } from '../../../../services/collaborateur/collaborateur.service';

import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { ZoneService } from '../../../../services/zone/zone.service';
import { EquipementService } from '../../../../services/equipement/equipement.service';
import { NbDialogRef } from '@nebular/theme';

@Component({
  selector: 'app-ajout-collaborateur',
  templateUrl: './ajout-collaborateur.component.html',
  styleUrls: ['./ajout-collaborateur.component.css']
})
export class AjoutCollaborateurComponent implements OnInit {
  registerForm: FormGroup;
  registerForm1: FormGroup;
  submitted = false;
  zones:any;
  equipements:any;
  collaborateurs:any;
  id:number;
  constructor(private formBuilder: FormBuilder,
    private CollaborateurService: CollaborateurService,
    private zoneService: ZoneService,
    private equipementService: EquipementService,
              private router: Router,
              public dialogRef: MatDialogRef<AjoutCollaborateurComponent>) { }

  ngOnInit() {
  this.getEquipement();
  this.getZones(); 
      this.registerForm = this.formBuilder.group({
        
          nom : ['', Validators.required],
         prenom : ['', Validators.required],
          fonction: ['', Validators.required],
          matricule : ['', [Validators.required,this.collaborateurValidator]],
          zone : ['', Validators.required],
          date_embauche : ['', Validators.required],
          date_depart: ['', Validators.required],

          
      });
     
      this.CollaborateurService.IdData.subscribe(data => {
        this.id = data;
      
     
        if (this.id !== 0) {
          this.CollaborateurService.getCollaborateur(this.id).subscribe(data => {
            this.collaborateurs= data;
            
            
              this.registerForm.controls['nom'].setValue(this.collaborateurs.nom);
              this.registerForm.controls['prenom'].setValue(this.collaborateurs.prenom);
              this.registerForm.controls['fonction'].setValue(this.collaborateurs.fonction);
              this.registerForm.controls['matricule'].setValue(this.collaborateurs.matricule);
              this.registerForm.controls['zone'].setValue(this.collaborateurs.zone);
              this.registerForm.controls['date_embauche'].setValue(this.collaborateurs.date_embauche);
              this.registerForm.controls['date_depart'].setValue(this.collaborateurs.date_depart);



             
            
          }, error => { console.log("Error while gettig post details") });
        }
        
        
      });
     

  }
  

  // convenience getter for easy access to form fields
  get f() { return this.registerForm.controls; }

 
  
  collaborateurValidator(control: AbstractControl) {
   
  }
  
 
  
  onReset() {
      this.submitted = false;
      this.registerForm.reset();
  }
  save(collaborateur) {
    this.CollaborateurService.addCollaborateur(collaborateur).subscribe(
      data =>{
       console.log(data);
      }, error => console.log(error));
   this.gotoList();

  }

  onSubmit(collaborateur) {
    this.submitted = true;
    
    if (this.registerForm.invalid) {
      return;
    }
    if(this.id!==0)
    {
      this.update(this.id,collaborateur);
    }
    else{
     this.save(collaborateur);}    alert('SUCCESS!! :-)\n\n' + JSON.stringify(this.registerForm.value, null, 4));
    this.onClose();
}
update(id,collaborateur) {
  this.CollaborateurService.updateCollaborateur(id,collaborateur).subscribe(
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
    this.router.navigate(['/pages/Collaborateur']);  }
  getZones(){
    this.zoneService.getZones().subscribe(
      data =>{
        this.zones=data;
        console.log(data);
      },
     error =>{
       console.log(error);
     }
      
    )
  }
  getEquipement(){
    this.equipementService.getEquipements().subscribe(
      data =>{
        this.equipements=data;
        console.log(data);
      },
     error =>{
       console.log(error);
     }
      
    )
  }
}