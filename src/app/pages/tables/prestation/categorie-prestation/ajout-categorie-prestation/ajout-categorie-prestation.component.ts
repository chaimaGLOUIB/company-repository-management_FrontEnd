import { Component, OnInit } from '@angular/core';

import { Router } from '@angular/router';
import { MatDialogRef } from '@angular/material/dialog';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { Categorie_PrestationService } from '../../../../../services/prestation/categorie-prestation.service';
import { Type_PrestationService } from '../../../../../services/prestation/type-prestation.service';

@Component({
  selector: 'app-ajout-categorie-prestation',
  templateUrl: './ajout-categorie-prestation.component.html',
  styleUrls: ['./ajout-categorie-prestation.component.css']
})
export class AjoutCategoriePrestationComponent implements OnInit {
  registerForm: FormGroup;
  submitted = false;
  typePrestations : any;
  id:number;
  categories:any;

  constructor(private formBuilder: FormBuilder,
    private categoriePrestationService: Categorie_PrestationService,
    private typePrestationService: Type_PrestationService,
              private router: Router,
              public dialogRef: MatDialogRef<AjoutCategoriePrestationComponent>) { }

  ngOnInit() {
    this.getTypes();
      this.registerForm = this.formBuilder.group({
          description: [''],
         
          categoriePrestation : ['', [Validators.required , this.categoriePrestationValidator]],
         etat : ['', Validators.required],
         type_prestation: ['', Validators.required]


          
      });
      this.categoriePrestationService.IdData.subscribe(data => {
        this.id = data;
        if (this.id !== 0) {
          this.categoriePrestationService.getCategorie_Prestation(this.id).subscribe(data => {
            this.categories= data;
            
             this.registerForm.controls['categoriePrestation'].setValue(this.categories.categoriePrestation);
              this.registerForm.controls['type_Prestation'].setValue(this.categories.type_Prestation);
              this.registerForm.controls['etat'].setValue(this.categories.etat);
              this.registerForm.controls['description'].setValue(this.categories.description);

            
          }, error => { console.log("Error while gettig post details") });
        }
        
        
      });
  }

  // convenience getter for easy access to form fields
  get f() { return this.registerForm.controls; }

  categoriePrestationValidator(control: AbstractControl) {
    if (control.value === 'SONDAGE CAROTTE LONG' || control.value ==='ALESAGE' || control.value ==='SONDAGE DESTRUCTIF'|| control.value ==='TROU PILOTE')
    
   {  
    return null ;
    }
    return { categoriePrestation: true} ;
  }

  onReset() {
      this.submitted = false;
      this.registerForm.reset();
  }
  save(categoriePrestation) {
    this.categoriePrestationService.addCategorie_Prestation(categoriePrestation).subscribe(
      data =>{
       console.log(data);
      }, error => console.log(error));
   this.gotoList();

  }

  onSubmit(categoriePrestation) {
    this.submitted = true;
    
    if (this.registerForm.invalid) {
      return;
    }
    if(this.id!==0)
    {
      this.update(this.id,categoriePrestation);
    }
    else{
     this.save(categoriePrestation);}    alert('SUCCESS!! :-)\n\n' + JSON.stringify(this.registerForm.value, null, 4));
    this.onClose();
}
update(id,categoriePrestation) {
  this.categoriePrestationService.updateCategorie_Prestation(id,categoriePrestation).subscribe(
    data =>{
     console.log(data);
    }, error => console.log(error));
 this.gotoList();

}
getTypes(){
  this.typePrestationService.getType_Prestations().subscribe(
    data =>{
      this.typePrestations=data;
      console.log(data);
    },
   error =>{
     console.log(error);
   }
    
  )
}

onClose() {
  this.dialogRef.close();
}
  gotoList() {
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    this.router.onSameUrlNavigation = 'reload';
    this.router.navigate(['/pages/Prestation/Categorie_Prestation']);
  }
}