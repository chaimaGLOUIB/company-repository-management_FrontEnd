import { Component, OnInit } from '@angular/core';

import { Router } from '@angular/router';
import { MatDialogRef } from '@angular/material/dialog';
import { AppareilService } from '../../../../services/appareil/appareil.service';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { NbDialogRef } from '@nebular/theme';

@Component({
  selector: 'app-ajout-appareil',
  templateUrl: './ajout-appareil.component.html',
  styleUrls: ['./ajout-appareil.component.css']
})
export class AjoutAppareilComponent implements OnInit {
  registerForm: FormGroup;
  submitted = false;
  appareil:any;
  id : number;
  constructor(private formBuilder: FormBuilder,
    private appareilService: AppareilService,
              private router: Router,
              public dialogRef: MatDialogRef<AjoutAppareilComponent>) { }

  ngOnInit() {
   
     
      this.registerForm = this.formBuilder.group({ 
          nom : ['', [Validators.required,this.appareilValidators]],
          description: [''],
          mesure: ['', Validators.required],
          etat: ['', Validators.required],    
      });
      this.appareilService.IdData.subscribe(data => {
        this.id = data;
      
     
        if (this.id !== 0) {
          this.appareilService.getAppareil(this.id).subscribe(data => {
            this.appareil = data;
            
            
              this.registerForm.controls['nom'].setValue(this.appareil.nom);
              this.registerForm.controls['description'].setValue(this.appareil.description);
              this.registerForm.controls['mesure'].setValue(this.appareil.mesure);
              this.registerForm.controls['etat'].setValue(this.appareil.etat);

             
            
          }, error => { console.log("Error while gettig post details") });
        }
        
        
      });
  }
  
  appareilValidators(control: AbstractControl) {
    if (control.value ==='8711' || control.value ==='8702' || control.value ==='9395')
   {
    return null 

      
    }
    return {appareil: true };
  }

  // convenience getter for easy access to form fields
  get f() { return this.registerForm.controls; }

 

  onReset() {
      this.submitted = false;
      this.registerForm.reset();
  }
  save(appareil) {
    this.appareilService.addAppareil(appareil).subscribe(
      data =>{
       console.log(data);
      }, error => console.log(error));
   this.gotoList();

  }

  onSubmit(appareil) {
    this.submitted = true;
    
    if (this.registerForm.invalid) {
      return;
    }
    if(this.id!==0)
    {
      this.update(this.id,appareil);
    }
    else{
     this.save(appareil);}
    alert('SUCCESS!! :-)\n\n' + JSON.stringify(this.registerForm.value, null, 4));
    this.onClose();
}

onClose() {
  this.dialogRef.close();
}
  gotoList() {
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    this.router.onSameUrlNavigation = 'reload';
    this.router.navigate(['/pages/Appareil']); 
   }
   update(id,appareil) {
    this.appareilService.updateAppareil(id,appareil).subscribe(
      data =>{
       console.log(data);
      }, error => console.log(error));
   this.gotoList();

  }
  }



