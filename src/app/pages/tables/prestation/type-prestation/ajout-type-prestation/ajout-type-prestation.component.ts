import { Component, OnInit } from '@angular/core';

import { Router } from '@angular/router';
import { MatDialogRef } from '@angular/material/dialog';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { Type_PrestationService } from '../../../../../services/prestation/type-prestation.service';

@Component({
  selector: 'app-ajout-type-prestation',
  templateUrl: './ajout-type-prestation.component.html',
  styleUrls: ['./ajout-type-prestation.component.css']
})
export class AjoutTypePrestationComponent implements OnInit {
  registerForm: FormGroup;
  submitted = false;
  id:number;
  types:any;
  constructor(private formBuilder: FormBuilder,
    private typePrestationService: Type_PrestationService,
              private router: Router,
              public dialogRef: MatDialogRef<AjoutTypePrestationComponent>) { }

  ngOnInit() {
      this.registerForm = this.formBuilder.group({
          description: [''],
         
          typePrestation : ['', [Validators.required , this.typePrestationValidator]],
         etat : ['', Validators.required]

          
      });
      this.typePrestationService.IdData.subscribe(data => {
        this.id = data;
        if (this.id !== 0) {
          this.typePrestationService.getType_Prestation(this.id).subscribe(data => {
            this.types= data;
            
             this.registerForm.controls['typePrestation'].setValue(this.types.typePrestation);
              this.registerForm.controls['etat'].setValue(this.types.etat);
              this.registerForm.controls['description'].setValue(this.types.description);

            
          }, error => { console.log("Error while gettig post details") });
        }
        
        
      });
  }

  // convenience getter for easy access to form fields
  get f() { return this.registerForm.controls; }

  typePrestationValidator(control: AbstractControl) {
    if (control.value === 'Sondage' || control.value ==='cheminée mécanisée')
   {  
    return null ;
    }
    return { typePrestation: true} ;
  }

  onReset() {
      this.submitted = false;
      this.registerForm.reset();
  }
  save(typePrestation) {
    this.typePrestationService.addType_Prestation(typePrestation).subscribe(
      data =>{
       console.log(data);
      }, error => console.log(error));
   this.gotoList();

  }

  onSubmit(typePrestation) {
    this.submitted = true;
    
    if (this.registerForm.invalid) {
      return;
    }
    if(this.id!==0)
    {
      this.update(this.id,typePrestation);
    }
    else{
     this.save(typePrestation);}    alert('SUCCESS!! :-)\n\n' + JSON.stringify(this.registerForm.value, null, 4));
    this.onClose();
}
update(id,typePrestation) {
  this.typePrestationService.updateType_Prestation(id,typePrestation).subscribe(
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
    this.router.navigate(['/pages/Prestation/Type_Prestation']);
  }
}