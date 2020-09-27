import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl, RequiredValidator, FormArray } from '@angular/forms';
import { Router } from '@angular/router';
import { MatDialogRef } from '@angular/material/dialog';
import { Horaire_PosteService } from '../../../../services/horaire_poste/horaire-poste.service';
import { NbDialogRef } from '@nebular/theme';

@Component({
  selector: 'app-edit-horaire-poste',
  templateUrl: './edit-horaire-poste.component.html',
  styleUrls: ['./edit-horaire-poste.component.css']
})
export class EditHorairePosteComponent implements OnInit {

  registerForm: FormGroup;
  registerForm1: FormArray;
  submitted = false;
  nbr: any;
  id: number;
  postes: any;
  nbrPoste: number;
  i: number = 0;
  constructor(private formBuilder: FormBuilder,
    private horaireService: Horaire_PosteService,
    private router: Router,
    public dialogRef: MatDialogRef<EditHorairePosteComponent>) { }

  ngOnInit() {
    this.horaireService.IdData.subscribe(data => {
      this.id = data;
    })


    this.registerForm = this.formBuilder.group({


      numPoste: ['', Validators.required],
      heureDebutTh: ['', Validators.required],
      heureFinTh: ['', Validators.required],

    });

    this.horaireService.IdData.subscribe(data => {
      this.id = data;
      if (this.id !== 0) {
        this.horaireService.getHoraire_Poste(this.id).subscribe(data => {
          this.postes = data;

          this.registerForm.controls['numPoste'].setValue(this.postes.numPoste);
          this.registerForm.controls['heureDebutTh'].setValue(this.postes.heureDebutTh);
          this.registerForm.controls['heurefinTh'].setValue(this.postes.heurefinTh);
         



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
  save(horaire) {
    this.horaireService.addHoraire_Poste(horaire).subscribe(
      data => {
        console.log(data);
      }, error => console.log(error));
    this.gotoList();

  }

  onSubmit(horaire) {
    this.submitted = true;

    if (this.registerForm.invalid) {
      return;
    }


      this.update(this.id,horaire);
      
    alert('SUCCESS!! :-)\n\n' + JSON.stringify(this.registerForm.value, null, 4));
    this.onClose();
  }
  update(id, horaire) {
    this.horaireService.updateHoraire_Poste(id, horaire).subscribe(
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
    this.router.navigate(['/pages/Horaire_Poste']);
  }
}
