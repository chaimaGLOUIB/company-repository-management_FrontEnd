import { Component, OnInit } from '@angular/core';

import { Router } from '@angular/router';
import { NbDialogRef } from '@nebular/theme';

import { PaysService } from '../../../../services/pays/pays.service';

import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { RegionService } from '../../../../services/region/region.service';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-ajout-pays',
  templateUrl: './ajout-pays.component.html',
  styleUrls: ['./ajout-pays.component.css']
})
export class AjoutPaysComponent implements OnInit {
  registerForm: FormGroup;
  registerForm1: FormGroup;
  submitted = false;
  pays:any;
  regs:any;
  id:number;
  regions:any;
  constructor(private formBuilder: FormBuilder,
    private paysService: PaysService,
    private regionService: RegionService,
              private router: Router,
              public dialogRef: MatDialogRef<AjoutPaysComponent>) { }

  ngOnInit() {
  this.getRegions();
      this.registerForm = this.formBuilder.group({
          description: [''],
          region: ['', [Validators.required]],
          etat : ['', Validators.required],
         nom : ['', [Validators.required,this.paysValidator]]

          
      });
     
      this.paysService.IdData.subscribe(data => {
        this.id = data;
        if (this.id !== 0) {
          this.paysService.getPays(this.id).subscribe(data => {
            this.pays= data;
            
             this.registerForm.controls['nom'].setValue(this.pays.nom);
              this.registerForm.controls['region'].setValue(this.pays.region);
              this.registerForm.controls['etat'].setValue(this.pays.etat);
              this.registerForm.controls['description'].setValue(this.pays.description);

            
          }, error => { console.log("Error while gettig post details") });
        }
        
        
      });
     

  }
  

  // convenience getter for easy access to form fields
  get f() { return this.registerForm.controls; }

 
  
  paysValidator(control: AbstractControl) {
    if (control.value ==='maroc' || control.value ==='soudan' || control.value ==='guinée' || control.value ==='gabon')
   {
    return null ;
      
    }
    return {nom: true };
  }
  
  onReset() {
      this.submitted = false;
      this.registerForm.reset();
  }
  save(pays) {
    this.paysService.addPays(pays).subscribe(
      data =>{
       console.log(data);
      }, error => console.log(error));
   this.gotoList();

  }

  onSubmit(pays) {
    this.submitted = true;
    
    if (this.registerForm.invalid) {
      return;
    }
    if(this.id!==0)
    {
      this.update(this.id,pays);
    }
    else{
     this.save(pays);}    alert('SUCCESS!! :-)\n\n' + JSON.stringify(this.registerForm.value, null, 4));
    this.onClose();
}
update(id,pays) {
  this.paysService.updatePays(id,pays).subscribe(
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
    this.router.navigate(['/pages/Geographique/Pays']);  }
  getRegions(){
    this.regionService.getRegions().subscribe(
      data =>{
        this.regs=data;
        console.log(data);
      },
     error =>{
       console.log(error);
     }
      
    )
  }
}