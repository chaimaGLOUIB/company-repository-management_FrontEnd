import { Component, OnInit } from '@angular/core';

import { Router } from '@angular/router';
import { MatDialogRef } from '@angular/material/dialog';
import { SondageService } from '../../../../services/sondage/sondage.service';

import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { RegionService } from '../../../../services/region/region.service';
import { ZoneService } from '../../../../services/zone/zone.service';
import { EquipementService } from '../../../../services/equipement/equipement.service';
import { NbDialogRef } from '@nebular/theme';

@Component({
  selector: 'app-ajout-sondage',
  templateUrl: './ajout-sondage.component.html',
  styleUrls: ['./ajout-sondage.component.css']
})
export class AjoutSondageComponent implements OnInit {
  registerForm: FormGroup;
  registerForm1: FormGroup;
  submitted = false;
  zones:any;
  id:number;
  sondages:any;
  equipements:any;
  constructor(private formBuilder: FormBuilder,
    private sondageService: SondageService,
    private zoneService: ZoneService,
    private equipementService: EquipementService,
              private router: Router,
              public dialogRef: MatDialogRef<AjoutSondageComponent>) { }

  ngOnInit() {
  this.getEquipement();
  this.getZones(); 
      this.registerForm = this.formBuilder.group({
          description: [''],
          etat : ['', Validators.required],
          sondage : ['', [Validators.required,this.sondageValidator]],
          type : ['',[Validators.required,this.typeValidator]],
          zone : ['', Validators.required],
          equipement : ['', Validators.required],
          code_initiale : ['', Validators.required],
          code_cible: ['', Validators.required],

          
      });
      this.sondageService.IdData.subscribe(data => {
        this.id = data;
        if (this.id !== 0) {
          this.sondageService.getSondage(this.id).subscribe(data => {
            this.sondages= data;
            
             this.registerForm.controls['sondage'].setValue(this.sondages.sondage);
              this.registerForm.controls['type'].setValue(this.sondages.type);
              this.registerForm.controls['etat'].setValue(this.sondages.etat);
              this.registerForm.controls['description'].setValue(this.sondages.description);
              this.registerForm.controls['zone'].setValue(this.sondages.zone);
              this.registerForm.controls['equipement'].setValue(this.sondages.equipement);
              this.registerForm.controls['code_cible'].setValue(this.sondages.code_cible);
              this.registerForm.controls['code_initiale'].setValue(this.sondages.code_initiale);


            
          }, error => { console.log("Error while gettig post details") });
        }
        
        
      });
     

  }
  

  // convenience getter for easy access to form fields
  get f() { return this.registerForm.controls; }

 
  
  sondageValidator(control: AbstractControl) {
    if (control.value ==='AEFSc3/-72' || control.value ==='DF314/-68' || control.value ==='R41AL')
   {
    return null ; 
      
    }
    return { sondage: true };
  }
  
  typeValidator(control: AbstractControl) {
    if (control.value ==='sondage' || control.value ==='cheminée')
   { 
    return null ;
      
    }
    return { type: true };
  }
  
  onReset() {
      this.submitted = false;
      this.registerForm.reset();
  }
  save(sondage) {
    this.sondageService.addSondage(sondage).subscribe(
      data =>{
       console.log(data);
      }, error => console.log(error));
   this.gotoList();

  }

  onSubmit(sondage) {
    this.submitted = true;
    
    if (this.registerForm.invalid) {
      return;
    }
    if(this.id!==0)
    {
      this.update(this.id,sondage);
    }
    else{
     this.save(sondage);}    alert('SUCCESS!! :-)\n\n' + JSON.stringify(this.registerForm.value, null, 4));
    this.onClose();
}
update(id,sondage) {
  this.sondageService.updateSondage(id,sondage).subscribe(
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
    this.router.navigate(['/pages/Sondage']);  }
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