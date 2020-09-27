import { Component, OnInit } from '@angular/core';

import { Router } from '@angular/router';
import { MatDialogRef } from '@angular/material/dialog';
import { ChantierService } from '../../../../services/chantier/chantier.service';

import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { ZoneService } from '../../../../services/zone/zone.service';
import { NbDialogRef } from '@nebular/theme';

@Component({
  selector: 'app-ajout-chantier',
  templateUrl: './ajout-chantier.component.html',
  styleUrls: ['./ajout-chantier.component.css']
})
export class AjoutChantierComponent implements OnInit {
  registerForm: FormGroup;
  registerForm1: FormGroup;
  submitted = false;
  chantiers:any;
  zones:any;
  id:number;
  constructor(private formBuilder: FormBuilder,
    private chantierService: ChantierService,
    private zoneService: ZoneService,
              private router: Router,
              public dialogRef: MatDialogRef<AjoutChantierComponent>) { }

  ngOnInit() {
  this.getZones();
      this.registerForm = this.formBuilder.group({
          description: [''],
         zone: ['', [Validators.required]],
          etat : ['', Validators.required],
          nom : ['', [Validators.required,this.chantierValidator]]

          
      });
     
      this.chantierService.IdData.subscribe(data => {
        this.id = data;
      
     
        if (this.id !== 0) {
          this.chantierService.getChantier(this.id).subscribe(data => {
            this.chantiers= data;
            
            
              this.registerForm.controls['nom'].setValue(this.chantiers.nom);
              this.registerForm.controls['description'].setValue(this.chantiers.description);
              this.registerForm.controls['zone'].setValue(this.chantiers.zone);
              this.registerForm.controls['etat'].setValue(this.chantiers.etat);
             

             
            
          }, error => { console.log("Error while gettig post details") });
        }
        
        
      });

     

  }
  

  // convenience getter for easy access to form fields
  get f() { return this.registerForm.controls; }

 
  
  chantierValidator(control: AbstractControl) {
    if (control.value ==='Draa Sfar Nord' || control.value ==='Draa Sfar Sud' || control.value ==='Imiter 1' || control.value ==='Imiter 2')
    { 
    return null ;
      
    }
    return { nom: true };
  }
  
  onReset() {
      this.submitted = false;
      this.registerForm.reset();
  }
  save(chantier) {
    this.chantierService.addChantier(chantier).subscribe(
      data =>{
       console.log(data);
      }, error => console.log(error));
   this.gotoList();

  }

  onSubmit(chantier) {
    this.submitted = true;
    
    if (this.registerForm.invalid) {
      return;
    }
    if(this.id!==0)
    {
      this.update(this.id,chantier);
    }
    else{this.save(chantier);}
    alert('SUCCESS!! :-)\n\n' + JSON.stringify(this.registerForm.value, null, 4));
    this.onClose();
}
update(id,chantier) {
  this.chantierService.updateChantier(id,chantier).subscribe(
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
    this.router.navigate(['/pages/Geographique/Chantier']);  }
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
}