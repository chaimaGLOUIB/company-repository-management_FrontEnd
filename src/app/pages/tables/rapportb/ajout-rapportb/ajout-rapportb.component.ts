import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { ZoneService } from '../../../../services/zone/zone.service';
import { EquipementComponent } from '../../equipement/equipement.component';
import { EquipementService } from '../../../../services/equipement/equipement.service';
import { Router } from '@angular/router';
import { RapportBService } from '../../../../services/rapportb/rapportb.service';
import { PrestationService } from '../../../../services/prestation/prestation.service';
import { Affectation_EquipementService } from '../../../../services/Equipement/affectation-equipement.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-ajout-rapportb',
  templateUrl: './ajout-rapportb.component.html',
  styleUrls: ['./ajout-rapportb.component.css'],
  providers: [DatePipe]
})
export class AjoutRapportbComponent implements OnInit {
  date = new Date();
  myDate: any;
  alert: boolean = false;
  alert2: boolean = false;

  registerForm: FormGroup;
  submitted = false;
  zones: any;
  equipements: any;
  prestations: any;
  affectations: any;
  rapport: any;
  id: number;
  constructor(private datePipe: DatePipe,
    private formBuilder: FormBuilder,
    private rapportb: RapportBService,
    private zoneService: ZoneService,
    private prestationService: PrestationService,
    private equipementService: EquipementService,
    private affectationEquipement: Affectation_EquipementService,
    private router: Router,
  ) { this.myDate = this.datePipe.transform(this.date, 'yyyy-MM-dd'); }

  ngOnInit() {
    this.getEquipements();
    this.getAffectation();
    this.getPrestations();
    this.getZones();
    this.registerForm = this.formBuilder.group({
      equipement: ['', Validators.required],
      prestation: ['', Validators.required],
      zone: ['', Validators.required],
      periode: ['', Validators.required],
      finance: this.formBuilder.array([this.formBuilder.group({
        date: ['', Validators.required],
        budget: ['', Validators.required],
        planifieActualise: [''],
        forecast1: [''],
        forecast2: [''],

      })
      ])
    });

    this.registerForm.get('equipement').valueChanges.subscribe(val => {
      this.registerForm.get('prestation').setValue(val.prestation);

      for (let a of this.affectations) {
        console.log(this.myDate);
        Date.parse(this.myDate);
        console.log(Date.parse(this.datePipe.transform(a.dateDebut, 'yyyy-MM-dd')));

        console.log(a.dateFin);
        if (a.equipement.nom == this.registerForm.get('equipement').value.nom) {
          if (Date.parse(this.myDate) > Date.parse(this.datePipe.transform(a.dateDebut, 'yyyy-MM-dd'))
            && Date.parse(this.myDate) < Date.parse(this.datePipe.transform(a.dateFin, 'yyyy-MM-dd'))) {
            if (a.etat == 0) { this.alert = true }
            else {
              console.log(this.datePipe.transform(a.dateDebut, 'yyyy-MM-dd'))

              this.registerForm.get('zone').setValue(a.zone);
              this.registerForm.get('periode').setValue("de " + this.datePipe.transform(a.dateDebut, 'yyyy-MM-dd') + " jusqu'à " +
                this.datePipe.transform(a.dateFin, 'yyyy-MM-dd'));
              a.etat = 0
              this.affectationEquipement.updateAffectation_Equipement(a.id, a).subscribe(
                data => {
                  console.log(data);
                }, error => console.log(error));
            }
          }

          else {
            this.alert2 = true;
            this.onReset();
            return;
          }
        }
      }

    });






  }


  // convenience getter for easy access to form fields
  get f() { return this.registerForm.controls; }

  onClose() {
    this.alert = false;
    this.alert2 = false;

  }
  save(rapportM) {
    this.rapportb.addRapportB(rapportM).subscribe(
      data => {
        console.log(data);
      }, error => console.log(error));
    this.gotoList();

  }

  onSubmit(rapportM) {
    this.submitted = true;

    if (this.registerForm.invalid) {
      return;
    }

    this.save(rapportM); alert('SUCCESS!! :-)\n\n' + JSON.stringify(this.registerForm.value, null, 4));

  }

  onReset() {
    this.submitted = false;
    this.registerForm.reset();
  }

  gotoList() {
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    this.router.onSameUrlNavigation = 'reload';
    this.router.navigate(['/pages/Rapport/Rapport_Budget_Machine']);
  }
  getEquipements() {
    this.equipementService.getEquipements().subscribe(
      data => {
        this.equipements = data;
        console.log(data);
      },
      error => {
        console.log(error);
      }

    )
  }
  get FinanceArray() {
    return <FormArray>this.registerForm.get('finance');
  }
  getAffectation() {
    this.affectationEquipement.getAffectation_Equipements().subscribe(
      data => {
        this.affectations = data;
        console.log(data);
      },
      error => {
        console.log(error);
      }

    )
  }
  getZones() {
    this.zoneService.getZones().subscribe(
      data => {
        this.zones = data;
        console.log(data);
      },
      error => {
        console.log(error);
      }

    )
  }
  getPrestations() {
    this.prestationService.getPrestations().subscribe(
      data => {
        this.prestations = data;
        console.log(data);
      },
      error => {
        console.log(error);
      }

    )
  }
}
