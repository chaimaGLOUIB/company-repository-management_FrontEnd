import { Component, OnInit } from '@angular/core';

import { Router } from '@angular/router';
import { MatDialogRef } from '@angular/material/dialog';

import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';

import { DiametreService } from '../../../../../services/diametre/diametre.service';
import { TypeConsommableService } from '../../../../../services/consommable/type-consommable.service';

@Component({
  selector: 'app-ajout-type-consommable',
  templateUrl: './ajout-type-consommable.component.html',
  styleUrls: ['./ajout-type-consommable.component.css']
})
export class AjoutTypeConsommableComponent implements OnInit {
  registerForm: FormGroup;
  registerForm1: FormGroup;
  submitted = false;
  types:any;
  id:number;
  diametres:any;
  constructor(private formBuilder: FormBuilder,
    private type_consommableService: TypeConsommableService,
    private diametreService: DiametreService,
              private router: Router,
              public dialogRef: MatDialogRef<AjoutTypeConsommableComponent>) { }

  ngOnInit() {
  this.getdiametres(); 
      this.registerForm = this.formBuilder.group({
          description: [''],
         etat : ['', Validators.required],
          typeConsommable : ['', [Validators.required,this.type_consommableValidator]],
          diametre : ['', Validators.required],   
      });
     
      this.type_consommableService.IdData.subscribe(data => {
        this.id = data;
      
     
        if (this.id !== 0) {
          this.type_consommableService.getTypeConsommable(this.id).subscribe(data => {
            this.types= data;  
              this.registerForm.controls['diametre'].setValue(this.types.diametre);
              this.registerForm.controls['typeConsommable'].setValue(this.types.typeConsommable);
              this.registerForm.controls['etat'].setValue(this.types.etat);
              this.registerForm.controls['description'].setValue(this.types.description);




             
            
          }, error => { console.log("Error while gettig post details") });
        }
        
        
      });
     
     

  }
  

  // convenience getter for easy access to form fields
  get f() { return this.registerForm.controls; }

 
  
  type_consommableValidator(control: AbstractControl) {
    if (control.value ==='Hard' || control.value ==='very hard' || control.value ==='medium')
   {  
    return null ; 
    
      
    }
    return { typeConsommable: true };
  }
  
  update(id,type_consommable) {
    this.type_consommableService.updateTypeConsommable(id,type_consommable).subscribe(
      data =>{
       console.log(data);
      }, error => console.log(error));
   this.gotoList();

  }
  onReset() {
      this.submitted = false;
      this.registerForm.reset();
  }
  save(type_consommable) {
    this.type_consommableService.addTypeConsommable(type_consommable).subscribe(
      data =>{
       console.log(data);
      }, error => console.log(error));
   this.gotoList();

  }

  onSubmit(type_consommable) {
    this.submitted = true;
    
    if (this.registerForm.invalid) {
      return;
    }
    if(this.id!==0)
    {
      this.update(this.id,type_consommable);
    }
    else{
     this.save(type_consommable);}    alert('SUCCESS!! :-)\n\n' + JSON.stringify(this.registerForm.value, null, 4));
    this.onClose();
}

onClose() {
  this.dialogRef.close();
}
  gotoList() {
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    this.router.onSameUrlNavigation = 'reload';
    this.router.navigate(['/pages/Consommable/Type_Consommable']); 
  
  }
  getdiametres(){
    this.diametreService.getDiametres().subscribe(
      data =>{
        this.diametres=data;
        console.log(data);
      },
     error =>{
       console.log(error);
     }
      
    )
  }
 
      
    
  
}