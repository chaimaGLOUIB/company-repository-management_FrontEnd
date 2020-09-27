import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { Sous_TraitantService } from '../../../../services/sous_traitant/sous-traitant.service';
import { Router } from '@angular/router';
import { MatDialogRef } from '@angular/material/dialog';
import {MatGridListModule} from '@angular/material/grid-list'
import { NbDialogRef } from '@nebular/theme';

@Component({
  selector: 'app-ajout-sous-traitant',
  templateUrl: './ajout-sous-traitant.component.html',
  styleUrls: ['./ajout-sous-traitant.component.css']
})
export class AjoutSousTraitantComponent implements OnInit {

  registerForm: FormGroup;
  submitted = false;
  sous_traitants:any;
  id:number;
  constructor(private formBuilder: FormBuilder,
    private sous_traitantService: Sous_TraitantService,
              private router: Router,
              public dialogRef: MatDialogRef<AjoutSousTraitantComponent>) { }

  ngOnInit() {
      this.registerForm = this.formBuilder.group({
          telephone: ['', Validators.minLength(6)],

          activite : [''],
          contact1: [''],
          contact2: [''],
          adresse: [''],
          fax: [''],
          email: ['',Validators.email],
          etat: ['', Validators.required],
          nom : ['', [Validators.required , this.sousTraitantValidator]]

          
      });
      this.sous_traitantService.IdData.subscribe(data => {
        this.id = data;
        if (this.id !== 0) {
          this.sous_traitantService.getSous_Traitant(this.id).subscribe(data => {
            this.sous_traitants= data;
            this.registerForm.controls['email'].setValue(this.sous_traitants.email);
            this.registerForm.controls['etat'].setValue(this.sous_traitants.etat);
            this.registerForm.controls['activite'].setValue(this.sous_traitants.activite);
            this.registerForm.controls['adresse'].setValue(this.sous_traitants.adresse);
             this.registerForm.controls['nom'].setValue(this.sous_traitants.nom);
              this.registerForm.controls['contact1'].setValue(this.sous_traitants.contact1);
              this.registerForm.controls['contact2'].setValue(this.sous_traitants.contact2);
              this.registerForm.controls['fax'].setValue(this.sous_traitants.fax);

            
          }, error => { console.log("Error while gettig post details") });
        }
        
        
      });
  }

  // convenience getter for easy access to form fields
  get f() { return this.registerForm.controls; }

  sousTraitantValidator(control: AbstractControl) {
    if (control.value === 'SPEKTRA' || control.value ==='GEOSOND'|| control.value ==='TechSub')
   {
    return null;
    }
    return { nom: true} ;
  }

  onReset() {
      this.submitted = false;
      this.registerForm.reset();
  }
  save(sous_traitant) {
    this.sous_traitantService.addSous_Traitant(sous_traitant).subscribe(
      data =>{
       console.log(data);
      }, error => console.log(error));
   this.gotoList();

  }

  onSubmit(sous_traitant) {
    this.submitted = true;
    
    if (this.registerForm.invalid) {
      return;
    }
    if(this.id!==0)
    {
      this.update(this.id,sous_traitant);
    }
    else{
     this.save(sous_traitant);}    alert('SUCCESS!! :-)\n\n' + JSON.stringify(this.registerForm.value, null, 4));
    this.onClose();
}
update(id,sous_traitant) {
  this.sous_traitantService.updateSous_Traitant(id,sous_traitant).subscribe(
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
    this.router.navigate(['/pages/Sous_Traitant']);
  }

}
