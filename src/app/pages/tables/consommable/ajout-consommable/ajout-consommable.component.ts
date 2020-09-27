import { Component, OnInit } from '@angular/core';

import { Router } from '@angular/router';
import { MatDialogRef } from '@angular/material/dialog';

import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { MarqueConsommableService } from '../../../../services/consommable/marque-consommable.service';
import { ConsommableService } from '../../../../services/consommable/consommable.service';
import { NbDialogRef } from '@nebular/theme';



@Component({
  selector: 'app-ajout-consommable',
  templateUrl: './ajout-consommable.component.html',
  styleUrls: ['./ajout-consommable.component.css']
})
export class AjoutConsommableComponent implements OnInit {
  registerForm: FormGroup;
  submitted = false;
  marque_consommables:any;
  consommables:any;
  id:number;
  constructor(private formBuilder: FormBuilder,
    private consommableService: ConsommableService,
    private MarqueService: MarqueConsommableService,
              private router: Router,
              public dialogRef: MatDialogRef<AjoutConsommableComponent>) { }

  ngOnInit() {
  this.getMarques(); 
      this.registerForm = this.formBuilder.group({
          description: [''],
         etat : ['', Validators.required],
          marque_consommable : ['', [Validators.required]],
          nom : ['', Validators.required],
          numSerie : ['', Validators.required],

         

          
      });
      this.consommableService.IdData.subscribe(data => {
        this.id = data;
        if (this.id !== 0) {
          this.consommableService.getConsommable(this.id).subscribe(data => {
            this.consommables= data;
            
             this.registerForm.controls['nom'].setValue(this.consommables.nom);
              this.registerForm.controls['marque_consommable'].setValue(this.consommables.marque_consommable);
              this.registerForm.controls['etat'].setValue(this.consommables.etat);
              this.registerForm.controls['description'].setValue(this.consommables.description);

            
          }, error => { console.log("Error while gettig post details") });
        }
        
        
      });
     
      
     

  }
  

  // convenience getter for easy access to form fields
  get f() { return this.registerForm.controls; }

 
  
  
  
  
  onReset() {
      this.submitted = false;
      this.registerForm.reset();
  }
  save(consommable) {
    this.consommableService.addConsommable(consommable).subscribe(
      data =>{
       console.log(data);
      }, error => console.log(error));
   this.gotoList();

  }

  onSubmit(consommable) {
    this.submitted = true;
    
    if (this.registerForm.invalid) {
      return;
    }
    if(this.id!==0)
    {
      this.update(this.id,consommable);
    }
    else{
     this.save(consommable);}    alert('SUCCESS!! :-)\n\n' + JSON.stringify(this.registerForm.value, null, 4));
    this.onClose();
}
update(id,consommable) {
  this.consommableService.updateConsommable(id,consommable).subscribe(
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
    this.router.navigate(['/pages/Consommable/Consommable']); 
  
  }
  getMarques(){
    this.MarqueService.getMarqueConsommables().subscribe(
      data =>{
        this.marque_consommables=data;
        console.log(data);
      },
     error =>{
       console.log(error);
     }
      
    )
  }
 
      
    
  
}