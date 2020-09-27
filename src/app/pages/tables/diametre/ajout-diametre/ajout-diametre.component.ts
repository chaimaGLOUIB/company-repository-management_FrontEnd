import { Component, OnInit } from '@angular/core';

import { Router } from '@angular/router';
import { MatDialogRef } from '@angular/material/dialog';
import { DiametreService } from '../../../../services/diametre/diametre.service';

import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { PrestationService } from '../../../../services/prestation/prestation.service';
import { NbDialogRef } from '@nebular/theme';

@Component({
  selector: 'app-ajout-diametre',
  templateUrl: './ajout-diametre.component.html',
  styleUrls: ['./ajout-diametre.component.css']
})
export class AjoutDiametreComponent implements OnInit {
  registerForm: FormGroup;
  submitted = false;
  diametres:any;
  id:number;

  prestations:any;
  constructor(private formBuilder: FormBuilder,
    private diametreService: DiametreService,
    private prestationsService: PrestationService,
              private router: Router,
              public dialogRef: MatDialogRef<AjoutDiametreComponent>) { }

  ngOnInit() {
  this.getprestations();
      this.registerForm = this.formBuilder.group({
          description: [''],
          prestations: ['', [Validators.required]],
          etat : ['', Validators.required],
          unite : ['', Validators.required],
          diametre : ['', [Validators.required,this.diametreValidator]]  
      });
      this.diametreService.IdData.subscribe(data => {
        this.id = data;
      
     
        if (this.id !== 0) {
          this.diametreService.getDiametre(this.id).subscribe(data => {
            this.diametres= data;
            
            
              this.registerForm.controls['prestations'].setValue(this.diametres.prestations);
              this.registerForm.controls['diametre'].setValue(this.diametres.diametre);
              this.registerForm.controls['etat'].setValue(this.diametres.etat);
              this.registerForm.controls['description'].setValue(this.diametres.description);
              this.registerForm.controls['unite'].setValue(this.diametres.unite);




             
            
          }, error => { console.log("Error while gettig post details") });
        }
        
        
      });
     
      
     

  }
  

  // convenience getter for easy access to form fields
  get f() { return this.registerForm.controls; }

 
  
  diametreValidator(control: AbstractControl) {
    if (control.value ==='1,2' || control.value ==='BQ'|| control.value ==='1,4' || control.value ==='127' || control.value ==='65'|| control.value ==='AQ'|| control.value ==='1,5')
   { 
    return null ;
      
    }
    return { diametre: true };
  }
  
  onReset() {
      this.submitted = false;
      this.registerForm.reset();
  }
  save(diametre) {
    this.diametreService.addDiametre(diametre).subscribe(
      data =>{
       console.log(data);
      }, error => console.log(error));
   this.gotoList();

  }

  onSubmit(diametre) {
    this.submitted = true;
    
    if (this.registerForm.invalid) {
      return;
    }
    if(this.id!==0)
    {
      this.update(this.id,diametre);
    }
    else{
     this.save(diametre);}    alert('SUCCESS!! :-)\n\n' + JSON.stringify(this.registerForm.value, null, 4));
    this.onClose();
}
update(id,diametre) {
  this.diametreService.updateDiametre(id,diametre).subscribe(
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
    this.router.navigate(['/pages/Diametre']);  }
  getprestations(){
    this.prestationsService.getPrestations().subscribe(
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