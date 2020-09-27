import { Component, OnInit } from '@angular/core';

import { Router } from '@angular/router';
import { MatDialogRef } from '@angular/material/dialog';

import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';

import { MarqueConsommableService } from '../../../../../services/consommable/marque-consommable.service';
import { TypeConsommableService } from '../../../../../services/consommable/type-consommable.service';

@Component({
  selector: 'app-ajout-marque-consommable',
  templateUrl: './ajout-marque-consommable.component.html',
  styleUrls: ['./ajout-marque-consommable.component.css']
})
export class AjoutMarqueConsommableComponent implements OnInit {
  registerForm: FormGroup;
  registerForm1: FormGroup;
  submitted = false;
  typeConsommables:any;
  marques:any;
  id:number;
  constructor(private formBuilder: FormBuilder,
    private marque_consommableService: MarqueConsommableService,
    private typeService: TypeConsommableService,
              private router: Router,
              public dialogRef: MatDialogRef<AjoutMarqueConsommableComponent>) { }

  ngOnInit() {
  this.gettypes(); 
      this.registerForm = this.formBuilder.group({
          description: [''],
         etat : ['', Validators.required],
          marqueConsommable : ['', [Validators.required,this.marque_consommableValidator]],
          typeConsommable : ['', Validators.required],
          
         

          
      });
     
      this.marque_consommableService.IdData.subscribe(data => {
        this.id = data;
      
     
        if (this.id !== 0) {
          this.marque_consommableService.getMarqueConsommable(this.id).subscribe(data => {
            this.marques= data;
            
            
              this.registerForm.controls['description'].setValue(this.marques.description);
              this.registerForm.controls['etat'].setValue(this.marques.etat);
              this.registerForm.controls['marqueConsommable'].setValue(this.marques.marqueConsommable);
              this.registerForm.controls['typeConsommable'].setValue(this.marques.typeConsommable);
             



             
            
          }, error => { console.log("Error while gettig post details") });
        }
        
        
      });
      
     

  }
  

  // convenience getter for easy access to form fields
  get f() { return this.registerForm.controls; }

 
  
  marque_consommableValidator(control: AbstractControl) {
    if (control.value ==='Hyden' || control.value ==='chark')
   {  
    return null ; 
     

    
      
    }
    return { marqueConsommable: true };
  }
  
  
  onReset() {
      this.submitted = false;
      this.registerForm.reset();
  }
  save(marque_consommable) {
    this.marque_consommableService.addMarqueConsommable(marque_consommable).subscribe(
      data =>{
       console.log(data);
      }, error => console.log(error));
   this.gotoList();

  }
  update(id,marque_consommable) {
    this.marque_consommableService.updateMarqueConsommable(id,marque_consommable).subscribe(
      data =>{
       console.log(data);
      }, error => console.log(error));
   this.gotoList();

  }

  onSubmit(marque_consommable) {
    this.submitted = true;
    
    if (this.registerForm.invalid) {
      return;
    }
    if(this.id!==0)
    {
      this.update(this.id,marque_consommable);
    }
    else{
     this.save(marque_consommable);}    alert('SUCCESS!! :-)\n\n' + JSON.stringify(this.registerForm.value, null, 4));
    this.onClose();
}

onClose() {
  this.dialogRef.close();
}
  gotoList() {
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    this.router.onSameUrlNavigation = 'reload';
    this.router.navigate(['/pages/Consommable/Marque_Consommable']); 
  
  }
  gettypes(){
    this.typeService.getTypeConsommables().subscribe(
      data =>{
        this.typeConsommables=data;
        console.log(data);
      },
     error =>{
       console.log(error);
     }
      
    )
  }
 
      
    
  
}