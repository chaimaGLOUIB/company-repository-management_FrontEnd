import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { Compte_AnalytiqueService } from '../../../../services/compte_analytique/compte-analytique.service';
import { Router } from '@angular/router';
import { MatDialogRef } from '@angular/material/dialog';
import { NbDialogRef } from '@nebular/theme';

@Component({
  selector: 'app-ajout-compte-analytique',
  templateUrl: './ajout-compte-analytique.component.html',
  styleUrls: ['./ajout-compte-analytique.component.css']
})
export class AjoutCompteAnalytiqueComponent implements OnInit {

    registerForm: FormGroup;
    submitted = false;
    comptes:any;
    id:number;

  
  
    constructor(private formBuilder: FormBuilder,
      private compteService: Compte_AnalytiqueService,
                private router: Router,
                public dialogRef: MatDialogRef<AjoutCompteAnalytiqueComponent>) { }
  
    ngOnInit() {
        this.registerForm = this.formBuilder.group({
           
          description: [''],
           
            compte : ['', [Validators.required , this.compteValidators]]
  
            
        });
        this.compteService.IdData.subscribe(data => {
          this.id = data;
        
       
          if (this.id !== 0) {
            this.compteService.getCompte_Analytique(this.id).subscribe(data => {
              this.comptes= data;
              
              
                this.registerForm.controls['compte'].setValue(this.comptes.compte);
                this.registerForm.controls['description'].setValue(this.comptes.description);
                
  
  
  
               
              
            }, error => { console.log("Error while gettig post details") });
          }
          
          
        });
       
  
    }
  
    // convenience getter for easy access to form fields
    get f() { return this.registerForm.controls; }
  
    compteValidators(control: AbstractControl) {
      if (control.value === '820000' || control.value ==='1740100' || control.value ==='1754900')
     {
      return null ;
      }
      return { compte: true} ;
    }
  
    onReset() {
        this.submitted = false;
        this.registerForm.reset();
    }
    save(compte) {
      this.compteService.addCompte_Analytique(compte).subscribe(
        data =>{
         console.log(data);
        }, error => console.log(error));
     this.gotoList();
  
    }
  
    onSubmit(compte) {
      this.submitted = true;
      
      if (this.registerForm.invalid) {
        return;
      }
      if(this.id!==0)
      {
        this.update(this.id,compte);
      }
      else{
       this.save(compte);}      alert('SUCCESS!! :-)\n\n' + JSON.stringify(this.registerForm.value, null, 4));
      this.onClose();
  }
  update(id,compte) {
    this.compteService.updateCompte_Analytique(id,compte).subscribe(
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
      this.router.navigate(['/pages/Compte_Analytique']);
    }
  }


