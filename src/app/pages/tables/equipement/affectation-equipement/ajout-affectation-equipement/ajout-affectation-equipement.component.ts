import { Component, OnInit } from '@angular/core';
import { FormGroup, AbstractControl, Validators, FormBuilder } from '@angular/forms';
import { Affectation_EquipementService } from '../../../../../services/Equipement/affectation-equipement.service';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ZoneService } from '../../../../../services/zone/zone.service';
import { EquipementService } from '../../../../../services/equipement/equipement.service';
import { NbDialogRef } from '@nebular/theme';

@Component({
  selector: 'app-ajout-affectation-equipement',
  templateUrl: './ajout-affectation-equipement.component.html',
  styleUrls: ['./ajout-affectation-equipement.component.css']
})
export class AjoutAffectationEquipementComponent implements OnInit {

    registerForm: FormGroup;
    submitted = false;
    equipements:any;
    zones:any;
affectations:any;
id:number;
    constructor(private formBuilder: FormBuilder,
      private affectationEquipementService: Affectation_EquipementService,
      private zoneService: ZoneService,
      private equiService: EquipementService,
                private router: Router,
                public dialogRef: MatDialogRef<AjoutAffectationEquipementComponent>) { }
  
    ngOnInit() {
    this.getzones();
    this.getEquipement();
        this.registerForm = this.formBuilder.group({
          compte : ['', Validators.required],
          zone: ['', [Validators.required]],
          dateDebut : ['', Validators.required],
          dateFin : ['', Validators.required],
          etat:['1'],
           equipement : ['', Validators.required]
  
            
        });
       
        this.affectationEquipementService.IdData.subscribe(data => {
          this.id = data;
        if (this.id !== 0) {
            this.affectationEquipementService.getAffectation_Equipement(this.id).subscribe(data => {
              this.affectations= data;
              
              
                this.registerForm.controls['compte'].setValue(this.affectations.compte);
                this.registerForm.controls['equipement'].setValue(this.affectations.equipement);
                this.registerForm.controls['zone'].setValue(this.affectations.zone);
                this.registerForm.controls['dateFin'].setValue(this.affectations.dateFin);
                this.registerForm.controls['dateDebut'].setValue(this.affectations.dateDebut);

  
  
  
  
               
              
            }, error => { console.log("Error while gettig post details") });
          }
          
          
        });
       
       
  
    }
    
  
    // convenience getter for easy access to form fields
    get f() { return this.registerForm.controls; }
  
    update(id,affectationEquipement) {
      this.affectationEquipementService.updateAffectation_Equipement(id,affectationEquipement).subscribe(
        data =>{
         console.log(data);
        }, error => console.log(error));
     this.gotoList();
  
    }
    
   
    
    onReset() {
        this.submitted = false;
        this.registerForm.reset();
    }
    save(affectationEquipement) {
      this.affectationEquipementService.addAffectation_Equipement(affectationEquipement).subscribe(
        data =>{
         console.log(data);
        }, error => console.log(error));
     this.gotoList();
  
    }
  
    onSubmit(affectationEquipement) {
      this.submitted = true;
      
      if (this.registerForm.invalid) {
        return;
      }
      if(this.id!==0)
      {
        this.update(this.id,affectationEquipement);
      }
      else{
       this.save(affectationEquipement);}      alert('SUCCESS!! :-)\n\n' + JSON.stringify(this.registerForm.value, null, 4));
      this.onClose();
  }
  
  onClose() {
    this.dialogRef.close();
  }
    gotoList() {
      this.router.routeReuseStrategy.shouldReuseRoute = () => false;
      this.router.onSameUrlNavigation = 'reload';
      this.router.navigate(['/pages/Equipement/Affectation_Equipement']);  }


    getzones(){
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
      this.equiService.getEquipements().subscribe(
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


