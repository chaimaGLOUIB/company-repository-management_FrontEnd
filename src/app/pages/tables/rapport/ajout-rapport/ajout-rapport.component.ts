import { Component, OnInit } from '@angular/core';

import { Router } from '@angular/router';
import * as moment from 'moment'
import { FormGroup, FormBuilder, Validators, AbstractControl, FormArray } from '@angular/forms';
import { EquipementService } from '../../../../services/equipement/equipement.service';
import { RapportService } from '../../../../services/rapport/rapport.service';
import { ChantierService } from '../../../../services/chantier/chantier.service';
import { Sous_TraitantService } from '../../../../services/sous_traitant/sous-traitant.service';
import { SondageService } from '../../../../services/sondage/sondage.service';
import { PrestationService } from '../../../../services/prestation/prestation.service';
import { DiametreService } from '../../../../services/diametre/diametre.service';
import { CollaborateurService } from '../../../../services/collaborateur/collaborateur.service';
import { AppareilService } from '../../../../services/appareil/appareil.service';
import { TypeConsommableService } from '../../../../services/consommable/type-consommable.service';
import { ConsommableService } from '../../../../services/consommable/consommable.service';
import { TypeArretService } from '../../../../services/categorie/type-arret.service';
import { Horaire_PosteService } from '../../../../services/horaire_poste/horaire-poste.service';
import { MarqueConsommableService } from '../../../../services/consommable/marque-consommable.service';

@Component({
  selector: 'app-ajout-rapport',
  templateUrl: './ajout-rapport.component.html',
  styleUrls: ['./ajout-rapport.component.css']
})
export class AjoutRapportComponent implements OnInit {
  registerForm1: FormGroup;
  registerForm2: FormGroup;
  registerForm3: FormGroup;
  registerForm4: FormGroup;
  registerForm5: FormGroup;
  submitted = false;
  chantiers: any;
  marques: any;
  heures: string;
  heuresAr2: any;
  heuresAr: any;
  sousTraitants: any;
  sondages: any;
  prestations: any;
  nbPoste: Array<number>;
  diametres: any;
  consommables: any = [{}];
  consommables1: any
  appareils: any;
  typeArrets: any;
  collaborateurs: any;
  postes: any;
  id: number;
  n: number = 1;
  p: any;
  nbr: any;
  rapports: any;
  rapport: any;
  equipements: any;
  date: any;
  index = 0;
  index2 = 0
  index3 = 0
  index4 = 0
  index5 = 0
  marque: any
  id1: any;
  typesNonProductives: number = 0
  rapp: any
  constructor(private formBuilder: FormBuilder,
    private rapportService: RapportService,
    private Chantierervice: ChantierService,
    private equipementService: EquipementService,
    private sousTraitantService: Sous_TraitantService,
    private sondageService: SondageService,
    private prestationService: PrestationService,
    private diametreService: DiametreService,
    private collaborateurService: CollaborateurService,
    private appareilService: AppareilService,
    private marqueConsommableService: MarqueConsommableService,
    private consommableService: ConsommableService,
    private typeArretService: TypeArretService,
    private horairePosteService: Horaire_PosteService,
    private router: Router,
  ) { }

  ngOnInit() {
    this.rapportService.changeId(0,0);
    this.getEquipement();
    this.getMarque();
    this.getChantiers();
    this.getConsommable();
    this.getPrestation();
    this.getCollaborateurs();
    this.getDiametre();
    this.getHorairePoste();
    this.getSondage();
    this.getSous_traitant();
    this.getTypeArret();
    this.getAppareil();

    this.registerForm1 = this.formBuilder.group({
      date: ['', Validators.required],
      equipement: ['', Validators.required],
      nombrePoste: ['', Validators.required],
      chantier: ['', Validators.required],
      sous_traitant: ['', Validators.required],
      sondage: ['', Validators.required],
      etat: ['', Validators.required],
      prestation: ['', Validators.required],
      diametre: [''],

    });
    this.registerForm2 = this.formBuilder.group({
      posteRapport: this.formBuilder.group({
        numPoste: ['', Validators.required],
        heureDebutTh: [''],
        heureFinTh: [''],
        heureDebutRe: [''],
        heureFinRe: [''],
        avancement: ['', Validators.required],
        recuperation: [''],
        compteurFin: [''],
        hm: [''],
        ha: ['']
      }),
      arretRapport: this.formBuilder.array([this.addArretGroup()]),


    });
    this.registerForm3 = this.formBuilder.group({
      consommationGasoilRapport: this.formBuilder.group({
        compteurDebut: [''],
        compteurF: [''],
        consommationGasoil: [''],
        commentaire: ['']
      }),
      consommableRapport: this.formBuilder.array([this.addConsommableGroup()]),

    });
    this.registerForm4 = this.formBuilder.group({

      appareilRapport: this.formBuilder.array([this.addAppareilGroup()]),

    });
    this.registerForm5 = this.formBuilder.group({

      collaborateurRapport: this.formBuilder.array([this.addCollaborateurGroup()]),
      faitManquante: [''],

    });
    this.rapportService.Id1Data.subscribe(data => {
      this.id1 = data;
    });
    this.rapportService.IdData.subscribe(val => {
      this.id = val;
      console.log(val);

      if (this.id !== 0) {
        this.rapportService.getRapport(this.id).subscribe(data => {
          this.rapport = data;
console.log(data);
          this.registerForm1.patchValue({
            date: this.rapport.date,
            equipement: this.rapport.equipement,
            nombrePoste: this.rapport.nombrePoste,
            chantier: this.rapport.chantier,
            sous_traitant: this.rapport.sous_traitant,
            sondage: this.rapport.sondage,
            etat: this.rapport.etat,
            prestation: this.rapport.prestation,
            diametre: this.rapport.diametre,
          });
          this.registerForm2.patchValue({
            posteRapport: this.rapport.posteRapport,
            arretRapport: this.rapport.arretRapport,
          });
          this.registerForm3.patchValue({
            consommableRapport: this.rapport.consommableRapport,
            consommationGasoilRapport: this.rapport.consommationGasoilRapport,
          });
          this.registerForm4.patchValue({
            appreiltRapport: this.rapport.appreilRapport,
          });
          this.registerForm5.patchValue({
            collaborateurRapport: this.rapport.appreilRapport,
            faitManquante: this.rapport.faitManquante,

          })


        }, error => { console.log("Error while gettig post details") });
      }


    });
    this.registerForm1.get('sous_traitant').valueChanges.subscribe(val => {
      console.log(val)

      if (val.nom === 'TechSub') {

        this.registerForm1.get('diametre').setValidators(Validators.required);
        this.registerForm1.get('diametre').updateValueAndValidity();
        this.registerForm2.get('posteRapport').get('heureDebutTh').setValidators(Validators.required);
        this.registerForm2.get('posteRapport').get('heureDebutTh').updateValueAndValidity;
        this.registerForm2.get('posteRapport').get('heureFinTh').setValidators(Validators.required);
        this.registerForm2.get('posteRapport').get('heureFinTh').updateValueAndValidity;
        this.registerForm2.get('posteRapport').get('heureDebutRe').setValidators(Validators.required);
        this.registerForm2.get('posteRapport').get('heureDebutRe').updateValueAndValidity;
        this.registerForm2.get('posteRapport').get('heureFinRe').setValidators(Validators.required);
        this.registerForm2.get('posteRapport').get('heureFinRe').updateValueAndValidity;
        this.registerForm2.get('posteRapport').get('recuperation').setValidators(Validators.required);
        this.registerForm2.get('posteRapport').get('recuperation').updateValueAndValidity;
        this.registerForm2.get('posteRapport').get('compteurFin').setValidators(Validators.required);
        this.registerForm2.get('posteRapport').get('compteurFin').updateValueAndValidity;
        this.registerForm2.get('posteRapport').get('hm').setValidators(Validators.required);
        this.registerForm2.get('posteRapport').get('hm').updateValueAndValidity;
        this.registerForm2.get('posteRapport').get('ha').setValidators(Validators.required);
        this.registerForm2.get('posteRapport').get('ha').updateValueAndValidity;
        this.ConsommableArray.controls[this.index3].get('consommable').setValidators(Validators.required);
        this.ConsommableArray.controls[this.index3].get('consommable').updateValueAndValidity;
        this.ArretArray.controls[this.index].get('typeArret').setValidators(Validators.required);
        this.ArretArray.controls[this.index].get('typeArret').updateValueAndValidity;
        this.CollaborateurArray.controls[this.index5].get('matricule').setValidators(Validators.required);
        this.CollaborateurArray.controls[this.index5].get('matricule').updateValueAndValidity
        this.CollaborateurArray.controls[this.index5].get('fonction').setValidators(Validators.required);
        this.CollaborateurArray.controls[this.index5].get('fonction').updateValueAndValidity
        this.ArretArray.controls[this.index].get('heureArret').setValidators(Validators.required);
        this.ArretArray.controls[this.index].get('heureArret').updateValueAndValidity
        this.ArretArray.controls[this.index].get('heureDebut').setValidators(Validators.required);
        this.ArretArray.controls[this.index].get('heureDebut').updateValueAndValidity
        this.ArretArray.controls[this.index].get('heureFin').setValidators(Validators.required);
        this.ArretArray.controls[this.index].get('heureFin').updateValueAndValidity;

      }
    });
    this.ArretArray.valueChanges.subscribe(val => {
      if (this.ArretArray.controls[this.index].get('heureFin').value && this.ArretArray.controls[this.index].get('heureDebut').value)
        if (this.ArretArray.controls[this.index].get('heureFin').value > this.ArretArray.controls[this.index].get('heureDebut').value) {
          {
            this.heuresAr = moment(val[this.index].heureFin, "HH:mm").diff(moment(val[this.index].heureDebut, "HH:mm"))
            console.log(this.heuresAr)
            this.ArretArray.controls[this.index].patchValue({
              heureArret: moment.duration(this.heuresAr).hours() + 'h ' +
                moment.duration(this.heuresAr).minutes() + 'min'
            }, { emitEvent: false });

            if (this.index === this.index2) {

              if (this.index === 0) {
                this.heures = this.ArretArray.controls[this.index].get('heureArret').value
                this.index2 = this.index + 1;
                this.heuresAr2 = this.heuresAr;
                console.log('==0')
              }
              else {
                this.heures = moment.duration(moment(this.heures, 'hh:mm').add(this.heuresAr).format('hh:mm')).hours() + 'h ' + moment.duration(moment(this.heures, 'hh:mm').add(this.heuresAr).format('hh:mm')).minutes() + 'min '
                console.log(this.heures);
                this.index2 = this.index + 1;
                this.heuresAr2 = this.heuresAr;
                console.log("choo")
              }
            }
            else if (this.index2 === this.index + 1) {
              console.log(this.heures)
              console.log(moment(this.heuresAr2).format("hh:mm"))
              console.log(moment(this.heuresAr).format("hh:mm"))

              this.heures = moment.duration(moment(moment(this.heures, 'hh:mm').diff(this.heuresAr2)).add(this.heuresAr).format('hh:mm')).hours() + 'h ' +
                moment.duration(moment(moment(this.heures, 'hh:mm').diff(this.heuresAr2)).add(this.heuresAr).format('hh:mm')).minutes() + 'min'
              console.log(moment(this.heuresAr2, 'hh:mm'))
              this.heuresAr2 = this.heuresAr
            }


            this.registerForm2.get('posteRapport').get('ha').setValue(this.heures);
          }
        }
    });

    this.ConsommableArray.valueChanges.subscribe(val => {
      if (this.ConsommableArray.controls[this.index3].get('consommable').value) {
        for (let i of this.consommables) {
          if (i.nom == val[this.index3].consommable) {
            this.ConsommableArray.controls[this.index3].patchValue({ numSerie: i.numSerie, marque: i.marque }, { emitEvent: false });
            this.marque = i.marque.marqueConsommable;
            console.log(i.marque.marqueConsommable);
            console.log(i.numSerie)
          }
        }
      }

    });

    this.registerForm3.get('consommationGasoilRapport').get('compteurF').valueChanges.subscribe(val => {
      if (this.registerForm3.get('consommationGasoilRapport').get('compteurDebut').value) {
        this.registerForm3.get('consommationGasoilRapport').get('consommationGasoil').setValue((val - this.registerForm3.get('consommationGasoilRapport').get('compteurDebut').value) * 3.78);

      }
    });



    this.CollaborateurArray.valueChanges.subscribe(val => {
      if (this.CollaborateurArray.controls[this.index5].get('matricule').value) {
        for (let i of this.collaborateurs) {
          if (i.matricule == val[this.index5].matricule) {
            this.CollaborateurArray.controls[this.index5].patchValue({ nom: i.nom, prenom: i.prenom, fonction: i.fonction }, { emitEvent: false });
          }
        }
      }
    });


    this.registerForm1.get('equipement').valueChanges.subscribe(val => {
      this.registerForm1.get('nombrePoste').setValue(val.nombre_poste);
    });




    this.registerForm1.get('sous_traitant').valueChanges.subscribe(val => {
      if (val == "TECHSUB") {
        this.registerForm1.get('diametre').setValidators(Validators.required);

      }
    });
    this.registerForm1.get('sondage').valueChanges.subscribe(val => {
      this.registerForm1.get('etat').setValue(val.etat);

    });
    this.registerForm1.get('prestation').valueChanges.subscribe(val => {

      if (val.categorie.categoriePrestation != "SONDAGE CAROTTE LONG") {
        this.registerForm2.get('posteRapport').get('avancement').setValue(0);
      }
    });




    this.registerForm2.get('posteRapport').get('compteurFin').valueChanges.subscribe(val => {
      console.log(this.rapport);
      if (this.registerForm2.get('posteRapport').get('numPoste').value != 1) {
        this.registerForm2.get('posteRapport').get('hm').setValue(val - this.rapport.compteurFin);

      }
    });




    this.registerForm1.get('nombrePoste').valueChanges.subscribe(val => {
      this.nbPoste = new Array<number>(val);
      console.log(val);
      this.nbr = val;
    });
    this.registerForm1.get('date').valueChanges.subscribe(val => {

      this.date = val;
    });
    
    this.registerForm1.get('equipement').valueChanges.subscribe(val => {
    
        this.registerForm1.controls['prestation'].setValue(val.prestation);
      
      this.p = val.prestation;
      console.log(val.prestation);
            console.log(val);


    });
    this.registerForm1.get('prestation').valueChanges.subscribe(val => {
      this.diametres = val.diametres;
      for (let p of val.diametres) {
        if (p != undefined) {
          for (let v of p.type_consommable) {
            if (v != undefined) {
              for (let m of v.marques) {
                if (m != undefined) {
                  console.log(m);

                  for (let c of m.consommables) {
                    for (let e of this.consommables1) {
                      if (c.id === e.id) {


                        this.consommables.push(e);
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }

      console.log(this.consommables);


    });
    this.registerForm2.get('posteRapport').get('numPoste').valueChanges.subscribe(val => {
      this.getRapport(this.registerForm1.get('date').value, (this.registerForm2.get('posteRapport').get('numPoste').value - 1));
      for (let i = 0; i < this.nbr; i++) {
        if ((this.postes[i].numPoste) == val) {
          this.registerForm2.get('posteRapport').get('heureDebutTh').setValue(this.postes[i].heureDebutTh);
          this.registerForm2.get('posteRapport').get('heureFinTh').setValue(this.postes[i].heureFinTh);
        }
      }

    });

    this.rapportService.IdData.subscribe(data => {
      this.id = data;
      if (this.id !== 0) {
        this.rapportService.getRapport(this.id).subscribe(data => {
          this.rapports = data;





        }, error => { console.log("Error while gettig post details") });
      }


    });


  }
  compare(val1, val2) {
    return val1.id === val2.id;
  }
  onSubmit() {

    this.submitted = true;

    if (this.registerForm1.invalid && this.registerForm2.invalid && this.registerForm3.invalid
      && this.registerForm4.invalid && this.registerForm5.invalid) {
      return;
    }

    let rapport = Object.assign(this.registerForm1.value, this.registerForm2.value, this.registerForm3.value,
      this.registerForm4.value, this.registerForm5.value)
    console.log(rapport)
    if (this.id !== 0) {
      if (this.id1 == 0)
        this.update(this.id, rapport);
      else {
        this.save(rapport);
      }
    }
    else {
      this.save(rapport);
    }
    alert('SUCCESS!! :-)\n\n' + JSON.stringify(this.registerForm1.value, null, 4));

  }






  // convenience getter for easy access to form fields
  get f() { return this.registerForm1.controls; }
  get g() { return (<FormGroup>this.registerForm2.get('posteRapport')).controls; }
  get h() { return (<FormGroup>this.registerForm3.get('consommationGasoilRapport')).controls; }
  get m() { return this.registerForm4.controls; }
  get o() { return this.registerForm5.controls; }

  typeArretsNonProductives() {
    for (let i of this.typeArrets) {
      if (i.prductivite == 'oui') {
        this.typesNonProductives++;
      }
    }
  }
  addArretGroup() {
    return this.formBuilder.group({
      typeArret: [''],
      heureDebut: ['', Validators.required],
      heureFin: ['', Validators.required],

      heureArret: ['', Validators.required],

    });
  }
  addConsommableGroup() {
    return this.formBuilder.group({
      consommable: ['', Validators.required],
      numSerie: ['', Validators.required],
      marque: ['', Validators.required],
      quantite: ['', Validators.required],
    });
  }
  addAppareilGroup() {
    return this.formBuilder.group({
      deviation: ['', Validators.required],
      appareil: ['', Validators.required],
      observation: ['', Validators.required],

    });
  }
  addCollaborateurGroup() {
    return this.formBuilder.group({
      matricule: ['', Validators.required],
      nom: ['', Validators.required],
      prenom: ['', Validators.required],
      fonction: ['', Validators.required],
      absence: ['', Validators.required],
      motif: ['', Validators.required],
    });
  }

  addArret() {


    this.index++;
    this.ArretArray.push(this.addArretGroup());
    console.log((this.index))
  }
  addConsommable() {
    this.index3++;
    this.ConsommableArray.push(this.addConsommableGroup());

    console.log((this.index3))
  }
  addAppareil() {
    this.index4++;
    this.AppareilArray.push(this.addAppareilGroup());

    console.log((this.index4))
  }
  addColaborateur() {
    this.index5++;
    this.CollaborateurArray.push(this.addCollaborateurGroup());

    console.log((this.index5))
  }
  removeArret(i) {
    this.ArretArray.removeAt(i);
    console.log(i);
  }
  get ArretArray() {
    return <FormArray>this.registerForm2.get('arretRapport');
  }
  get ConsommableArray() {
    return <FormArray>this.registerForm3.get('consommableRapport');
  }
  get AppareilArray() {
    return <FormArray>this.registerForm4.get('appareilRapport');
  }
  get CollaborateurArray() {
    return <FormArray>this.registerForm5.get('collaborateurRapport');
  }



  save(rapport) {
    this.rapportService.addRapport(rapport).subscribe(
      data => {
        console.log(data);
      }, error => console.log(error));
    this.gotoList();

  }


  update(id, rapport) {
    this.rapportService.updateRapport(id, rapport).subscribe(
      data => {
        console.log(data);
      }, error => console.log(error));
    this.gotoList();

  }

  gotoList() {
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    this.router.onSameUrlNavigation = 'reload';
    this.router.navigate(['/pages/Rapport/Rapport_Journalier']);
  }
  getChantiers() {
    this.Chantierervice.getChantiers().subscribe(
      data => {
        this.chantiers = data;
        console.log(data);
      },
      error => {
        console.log(error);
      }

    )
  }
  getRapport(date, numPoste) {
    this.rapportService.getRapportByDateAndNum(date, numPoste).subscribe(
      data => {
        this.rapport = data;
        console.log(this.rapport);
      },
      error => {
        console.log(error);
      }

    )
  }
  getEquipement() {
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
  getConsommable() {
    this.consommableService.getConsommables().subscribe(
      data => {
        this.consommables1 = data;
        console.log(data);
      },
      error => {
        console.log(error);
      }

    )
  }
  getMarque() {
    this.marqueConsommableService.getMarqueConsommables().subscribe(
      data => {
        this.marques = data;
        console.log(data);
      },
      error => {
        console.log(error);
      }

    )
  }
  getSondage() {
    this.sondageService.getSondages().subscribe(
      data => {
        this.sondages = data;
        console.log(data);
      },
      error => {
        console.log(error);
      }

    )
  }
  getSous_traitant() {
    this.sousTraitantService.getSous_Traitants().subscribe(
      data => {
        this.sousTraitants = data;
        console.log(data);
      },
      error => {
        console.log(error);
      }

    )
  }
  getPrestation() {
    this.prestationService.getPrestations().subscribe(
      data => {
        this.prestations = data;
        console.log(data);
      },
      error => {
        console.log(error);
      }

    )
  } getDiametre() {
    this.diametreService.getDiametres().subscribe(
      data => {
        this.diametres = data;
        console.log(data);
      },
      error => {
        console.log(error);
      }

    )
  } getHorairePoste() {
    this.horairePosteService.getHoraire_Postes().subscribe(
      data => {
        this.postes = data;
        console.log(data);
      },
      error => {
        console.log(error);
      }

    )
  }

  getAppareil() {
    this.appareilService.getAppareils().subscribe(
      data => {
        this.appareils = data;
        console.log(data);
      },
      error => {
        console.log(error);
      }

    )
  }
  getTypeArret() {
    this.typeArretService.getTypeArrets().subscribe(
      data => {
        this.typeArrets = data;
        console.log(data);
      },
      error => {
        console.log(error);
      }

    )
  }
  getCollaborateurs() {
    this.collaborateurService.getCollaborateurs().subscribe(
      data => {
        this.collaborateurs = data;
        console.log(data);
      },
      error => {
        console.log(error);
      }

    )
  }
}