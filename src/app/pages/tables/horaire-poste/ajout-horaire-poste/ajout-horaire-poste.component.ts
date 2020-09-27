import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl, RequiredValidator, FormArray } from '@angular/forms';
import { Router } from '@angular/router';
import { MatDialogRef } from '@angular/material/dialog';
import { Horaire_PosteService } from '../../../../services/horaire_poste/horaire-poste.service';
import { NbDialogRef } from '@nebular/theme';

@Component({
  selector: 'app-ajout-horaire-poste',
  templateUrl: './ajout-horaire-poste.component.html',
  styleUrls: ['./ajout-horaire-poste.component.css']
})
export class AjoutHorairePosteComponent implements OnInit {

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
    public dialogRef: MatDialogRef<AjoutHorairePosteComponent>) { }

  ngOnInit() {
    this.registerForm = this.formBuilder.group({


      nombrePoste: ['', Validators.required],

      postes: this.formBuilder.array([this.addPosteGroup()]),

    });


    this.registerForm.get('nombrePoste').valueChanges.subscribe(val => {

      if (this.i != 1) {
        this.addPoste(val);
        this.i = 1;
      }
      else {
        this.removePoste(val);
        console.log(val)
        this.addPoste(val);
      }
    });

    this.horaireService.IdData.subscribe(data => {
      this.id = data;
      if (this.id !== 0) {
        this.horaireService.getHoraire_Poste(this.id).subscribe(data => {
          this.postes = data;

          this.registerForm.controls['nombrePoste'].setValue(this.postes.nombrePoste);
          this.registerForm.controls['poste1'].setValue(this.postes.poste1);
          this.registerForm.controls['poste1'].setValue(this.postes.poste1);
          this.registerForm.controls['poste2'].setValue(this.postes.poste2);
          this.registerForm.controls['poste3'].setValue(this.postes.poste3);
          this.registerForm.controls['heureDebut1'].setValue(this.postes.heureDebut1);
          this.registerForm.controls['heureDebut2'].setValue(this.postes.heureDebut2);
          this.registerForm.controls['heureDebut3'].setValue(this.postes.heureDebut3);
          this.registerForm.controls['heurefin1'].setValue(this.postes.heurefin1);
          this.registerForm.controls['heurefin2'].setValue(this.postes.heurefin2);
          this.registerForm.controls['heurefin3'].setValue(this.postes.heurefin3);



        }, error => { console.log("Error while gettig post details") });
      }


    });

  }
  // convenience getter for easy access to form fields
  get f() { return this.registerForm.controls; }

  addPosteGroup() {
    return this.formBuilder.group({
      numPoste: ['', Validators.required],
      heureDebutTh: ['', Validators.required],
      heureFinTh: ['', Validators.required],

    })
  }
  removePoste(v) {
    for (let i = 0; i < v; i++) {
      this.posteArray.removeAt(i);
    }
  }


  addPoste(v) {
    console.log(v);
    for (let i = 1; i < v; i++) {
      this.posteArray.push(this.addPosteGroup());
    }
  }
  get posteArray() {
    return <FormArray>this.registerForm.get('postes');
  }








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
console.log(horaire.postes);
    this.submitted = true;

    if (this.registerForm.invalid) {
      return;
    }

    if (this.id !== 0) {
      this.update(this.id, horaire);
    }
    else {
      for(let i=0;i< horaire.postes.length;i++)
      {
      this.save(horaire.postes[i]);
      console.log(horaire.postes[i])
      }
    } alert('SUCCESS!! :-)\n\n' + JSON.stringify(this.registerForm.value, null, 4));
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
