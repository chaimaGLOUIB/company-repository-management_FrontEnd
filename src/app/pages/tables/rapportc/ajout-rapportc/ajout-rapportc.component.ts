import { Component, OnInit } from '@angular/core';

import { Router } from '@angular/router';
import { MatDialogRef } from '@angular/material/dialog';

import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { EquipementService } from '../../../../services/equipement/equipement.service';
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
import { RapportCService } from '../../../../services/rapportc/rapportc.service';

@Component({
  selector: 'app-ajout-rapportc',
  templateUrl: './ajout-rapportc.component.html',
  styleUrls: ['./ajout-rapportc.component.css']
})
export class AjoutRapportcComponent implements OnInit {
  registerForm: FormGroup;
  submitted = false;
  chantiers: any;
  sousTraitants: any;
  sondages: any;
  prestations: any;
 nbPoste: Array<number>;
  diametres: any;
  TypeConsommables: any;
  consommables: any;
  appareils: any;
  typeArrets: any;
  collaborateurs: any;
  postes:any;
  id: number;
   n:number=1;
   p:any;
   nbr:any;
  rapportcs: any;
  rapportc: any;
  equipements: any;
  date:any;
  constructor(private formBuilder: FormBuilder,
    private rapportcService: RapportCService,
    private Chantierervice: ChantierService,
    private equipementService: EquipementService,
    private sousTraitantService: Sous_TraitantService,
    private sondageService: SondageService,
    private prestationService: PrestationService,
    private diametreService: DiametreService,
    private collaborateurService: CollaborateurService,
    private appareilService: AppareilService,
    private typeConsommableService: TypeConsommableService,
    private consommableService: ConsommableService,
    private typeArretService: TypeArretService,
    private horairePosteService: Horaire_PosteService,

    private router: Router,
    public dialogRef: MatDialogRef<AjoutRapportcComponent>) { }

  ngOnInit() {
    this.getEquipement();
    this.getChantiers();
   
    
    
    this.registerForm = this.formBuilder.group({
      date: ['', Validators.required],
      equipement: ['', Validators.required],
      chantier: ['', Validators.required],
      numPoste: ['', Validators.required],
      CompteurDebut: [''],
      CompteurFin: [''],
      Comsommation: [''],
      commentaire: ['']
      
    });

    this.registerForm.get('sondage').valueChanges.subscribe(val => {
      this.registerForm.get('etat').setValue(val.etat);

    });
    this.registerForm.get('prestation').valueChanges.subscribe(val => {
     
        if(val.categorie.categoriePrestation!="SONDAGE CAROTTE LONG")
        {
          this.registerForm.get('avancement').setValue(0);
        }
    });
    

    this.rapportcService.IdData.subscribe(data => {
      this.id = data;
      if (this.id !== 0) {
        this.rapportcService.getRapportC(this.id).subscribe(data => {
          this.rapportcs = data;

          this.registerForm.controls['rapportc'].setValue(this.rapportcs.rapportc);
          this.registerForm.controls['type'].setValue(this.rapportcs.type);
          this.registerForm.controls['etat'].setValue(this.rapportcs.etat);
          this.registerForm.controls['description'].setValue(this.rapportcs.description);
          this.registerForm.controls['zone'].setValue(this.rapportcs.zone);
          this.registerForm.controls['equipement'].setValue(this.rapportcs.equipement);
          this.registerForm.controls['code_cible'].setValue(this.rapportcs.code_cible);
          this.registerForm.controls['code_initiale'].setValue(this.rapportcs.code_initiale);



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
  
  save(rapportc) {
    this.rapportcService.addRapportC(rapportc).subscribe(
      data => {
        console.log(data);
      }, error => console.log(error));
    this.gotoList();

  }

  onSubmit(rapportc) {
    this.submitted = true;

    if (this.registerForm.invalid) {
      return;
    }
    if (this.id !== 0) {
      this.update(this.id, rapportc);
    }
    else {
      this.save(rapportc);
    } alert('SUCCESS!! :-)\n\n' + JSON.stringify(this.registerForm.value, null, 4));
    this.onClose();
  }

  update(id, rapportc) {
    this.rapportcService.updateRapportC(id, rapportc).subscribe(
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
    this.router.navigate(['/rapportc']);
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
 
}