import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { RapportBService } from '../../../../services/rapportb/rapportb.service';
import { Router } from '@angular/router';
import { MatDialogRef } from '@angular/material/dialog';
import { Affectation_EquipementService } from '../../../../services/Equipement/affectation-equipement.service';
import { DatePipe } from '@angular/common';
import { NbDialogRef } from '@nebular/theme';

@Component({
  selector: 'app-ajout-budget',
  templateUrl: './ajout-budget.component.html',
  styleUrls: ['./ajout-budget.component.css']
})
export class AjoutBudgetComponent implements OnInit {

  registerForm: FormGroup;
  submitted = false;
  zones: any;
  id: number;
  rapport: any;
  rapports: any;
  equipements: any;
  affectations:any;
  constructor(private datePipe: DatePipe,
    private formBuilder: FormBuilder,
    private rapportBService: RapportBService,
private affectationService:Affectation_EquipementService,
    private router: Router,
    public dialogRef: MatDialogRef<AjoutBudgetComponent>) { }

  ngOnInit() {
this.affectation();
    this.registerForm = this.formBuilder.group({
      date: ['', Validators.required],
    
      budget:['', Validators.required],
      planifieActualise: [''],
      forecast1: [''],
      forecast2: ['']
    });
    this.rapportBService.IdData.subscribe(
      data => {
        this.id = data;
        this.rapportBService.getRapportB(this.id).subscribe(
          data => {
            this.rapport = data;
            console.log(data);
          }, error => console.log(error));
      }, error => console.log(error));
  }


  // convenience getter for easy access to form fields
  get f() { return this.registerForm.controls; }




  onReset() {
    this.submitted = false;
    this.registerForm.reset();
  }
  

  onSubmit(ra) {
    this.submitted = true;

    if (this.registerForm.invalid) {
      return;
    }
    
   
    this.rapport['finance'].push(ra );
   for(let a of this.affectations)
   {
     if(a.equipement.id==this.rapport.equipement.id)
     {
       this.rapport.periode="de "+this.datePipe.
       
       
       
       transform(a.dateDebut, 'yyyy-MM-dd')+" jusqu'à "+
       this.datePipe.transform(a.dateFin, 'yyyy-MM-dd')
     }
   }
    console.log(this.rapport);
    console.log(ra);
    this.rapportBService.sendRapport(this.rapport)
   this.rapportBService.updateRapportB(this.id,this.rapport).subscribe(
      data => {
        console.log(data);
      }, error => console.log(error));
    
     alert('SUCCESS!! :-)\n\n' + JSON.stringify(this.registerForm.value, null, 4));
    this.onClose();
    this.gotoList();
  }
  update(id, rapport) {
    this.rapportBService.updateRapportB(id, rapport).subscribe(
      data => {
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
    this.router.navigate(['/pages/Rapport/Rapport_Budget_Machine/Rapportpdf']);
  }
affectation()
{
  this.affectationService.getAffectation_Equipements().subscribe(
    data => {
      this.affectations=data;
      console.log(data);
    }, error => console.log(error));
  
}



}
