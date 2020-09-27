import { Component, OnInit } from '@angular/core';

import { Router } from '@angular/router';
import { MatDialogRef } from '@angular/material/dialog';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { CategorieArretService } from '../../../../../services/categorie/categorie-arret.service';
import { NbDialogRef } from '@nebular/theme';


@Component({
  selector: 'app-ajout-categorie-arret',
  templateUrl: './ajout-categorie-arret.component.html',
  styleUrls: ['./ajout-categorie-arret.component.css']
})
export class AjoutCategorieArretComponent implements OnInit {
  registerForm: FormGroup;
  submitted = false;
  categoriearrets : any;
  id:number;

  constructor(private formBuilder: FormBuilder,
    private categoriearretService: CategorieArretService,
              private router: Router,
              public dialogRef: MatDialogRef<AjoutCategorieArretComponent>) { }

  ngOnInit() {
    
      this.registerForm = this.formBuilder.group({
          description: [''],
         
          categorieArret : ['', [Validators.required , this.categoriearretValidator]],
         
      });
      this.categoriearretService.IdData.subscribe(data => {
        this.id = data;
      
     
        if (this.id !== 0) {
          this.categoriearretService.getCategorieArret(this.id).subscribe(data => {
            this.categoriearrets= data;
            
            
              this.registerForm.controls['categorieArret'].setValue(this.categoriearrets.categorieArret);
              this.registerForm.controls['description'].setValue(this.categoriearrets.description);
             

             
            
          }, error => { console.log("Error while gettig post details") });
        }
        
        
      });

  }

  // convenience getter for easy access to form fields
  get f() { return this.registerForm.controls; }

  categoriearretValidator(control: AbstractControl) {
    if (control.value === 'Arrêt client' || control.value ==='arrêt Techsub Mce' || control.value ==='arrêt Techsub sondage')
    
   {  
    return null ;
    }
    return { categorieArret: true} ;
  }

  onReset() {
      this.submitted = false;
      this.registerForm.reset();
  }
  save(categoriearret) {
    this.categoriearretService.addCategorieArret(categoriearret).subscribe(
      data =>{
       console.log(data);
      }, error => console.log(error));
   this.gotoList();

  }

  onSubmit(categoriearret) {
    this.submitted = true;
    
    if (this.registerForm.invalid) {
      return;
    }
    if(this.id!==0)
    {
      this.update(this.id,categoriearret);
    }
    else{this.save(categoriearret);}
    alert('SUCCESS!! :-)\n\n' + JSON.stringify(this.registerForm.value, null, 4));
    this.onClose();
}


onClose() {
  this.dialogRef.close();
}
  gotoList() {
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    this.router.onSameUrlNavigation = 'reload';
    this.router.navigate(['/pages/Arret/Categorie_Arret']);
  }
  update(id,appareil) {
    this.categoriearretService.updateCategorieArret(id,appareil).subscribe(
      data =>{
       console.log(data);
      }, error => console.log(error));
   this.gotoList();

  }
}