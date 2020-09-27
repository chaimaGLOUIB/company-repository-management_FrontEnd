import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TablesComponent } from './tables.component';
import { SmartTableComponent } from './smart-table/smart-table.component';
import { TreeGridComponent } from './tree-grid/tree-grid.component';

import { RegionComponent } from './region/region.component';
import { AjoutRegionComponent } from './region/ajout_region/ajout-region/ajout-region.component';
import { EditRegionComponent } from './region/edit_region/edit-region/edit-region.component';
import { PaysComponent } from './pays/pays.component';
import { ZoneComponent } from './zone/zone.component';
import { ClientComponent } from './client/client.component';
import { ChantierComponent } from './chantier/chantier.component';
import { PrestationComponent } from './prestation/prestation.component';
import { DiametreComponent } from './diametre/diametre.component';
import { AppareilComponent } from './appareil/appareil.component';
import { SondageComponent } from './sondage/sondage.component';
import { CollaborateurComponent } from './collaborateur/collaborateur.component';
import { ConsommableComponent } from './consommable/consommable.component';
import { EquipementComponent } from './equipement/equipement.component';
import { TypePrestationComponent } from './prestation/type-prestation/type-prestation.component';
import { CategoriePrestationComponent } from './prestation/categorie-prestation/categorie-prestation.component';
import { AffectationEquipementComponent } from './equipement/affectation-equipement/affectation-equipement.component';
import { TypeArretComponent } from './arret/type-arret/type-arret.component';
import { CategorieArretComponent } from './arret/categorie-arret/categorie-arret.component';
import { TypeConsommableComponent } from './consommable/type-consommable/type-consommable.component';
import { MarqueConsommableComponent } from './consommable/marque-consommable/marque-consommable.component';
import { CompteAnalytiqueComponent } from './compte-analytique/compte-analytique.component';
import { SousTraitantComponent } from './sous-traitant/sous-traitant.component';
import { HorairePosteComponent } from './horaire-poste/horaire-poste.component';
import { AjoutZoneComponent } from './zone/ajout-zone/ajout-zone.component';
import { AjoutAppareilComponent } from './appareil/ajout-appareil/ajout-appareil.component';
import { AjoutChantierComponent } from './chantier/ajout-chantier/ajout-chantier.component';
import { AjoutTypePrestationComponent } from './prestation/type-prestation/ajout-type-prestation/ajout-type-prestation.component';
import { AjoutCategoriePrestationComponent } from './prestation/categorie-prestation/ajout-categorie-prestation/ajout-categorie-prestation.component';
import { AjoutPrestationComponent } from './prestation/ajout-prestation/ajout-prestation.component';
import { AjoutEquipementComponent } from './equipement/ajout-equipement/ajout-equipement.component';
import { AjoutAffectationEquipementComponent } from './equipement/affectation-equipement/ajout-affectation-equipement/ajout-affectation-equipement.component';
import { AjoutSondageComponent } from './sondage/ajout-sondage/ajout-sondage.component';
import { AjoutCollaborateurComponent } from './collaborateur/ajout-collaborateur/ajout-collaborateur.component';
import { AjoutCompteAnalytiqueComponent } from './compte-analytique/ajout-compte-analytique/ajout-compte-analytique.component';
import { AjoutCategorieArretComponent } from './arret/categorie-arret/ajout-categorie-arret/ajout-categorie-arret.component';
import { AjoutTypeArretComponent } from './arret/type-arret/ajout-type-arret/ajout-type-arret.component';
import { AjoutTypeConsommableComponent } from './consommable/type-consommable/ajout-type-consommable/ajout-type-consommable.component';
import { AjoutMarqueConsommableComponent } from './consommable/marque-consommable/ajout-marque-consommable/ajout-marque-consommable.component';
import { AjoutConsommableComponent } from './consommable/ajout-consommable/ajout-consommable.component';
import { AjoutHorairePosteComponent } from './horaire-poste/ajout-horaire-poste/ajout-horaire-poste.component';
import { EditHorairePosteComponent } from './horaire-poste/edit-horaire-poste/edit-horaire-poste.component';
import { AjoutSousTraitantComponent } from './sous-traitant/ajout-sous-traitant/ajout-sous-traitant.component';
import { AjoutDiametreComponent } from './diametre/ajout-diametre/ajout-diametre.component';
import { EditDiametreComponent } from './diametre/edit-diametre/edit-diametre.component';
import { RapportComponent } from './rapport/rapport.component';
import { RapportbComponent } from './rapportb/rapportb.component';
import { RapportcComponent } from './rapportc/rapportc.component';
import { AjoutRapportComponent } from './rapport/ajout-rapport/ajout-rapport.component';
import { AjoutRapportbComponent } from './rapportb/ajout-rapportb/ajout-rapportb.component';
import { AjoutRapportcComponent } from './rapportc/ajout-rapportc/ajout-rapportc.component';
import { AjoutClientComponent } from './client/ajout-client/ajout-client.component';
import { AjoutPaysComponent } from './pays/ajout-pays/ajout-pays.component';
import { RapportspdfComponent } from './rapport/rapportspdf/rapportspdf.component';
import { RapportMpdfComponent } from './rapportb/rapportMpdf/rapportMpdf.component';
import { AjoutBudgetComponent } from './rapportb/ajout-budget/ajout-budget.component';
import { RegisterUserComponent } from './register-user/register-user.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { LogoutComponent } from '../logout/logout.component';
import { AjoutUserComponent } from './register-user/AjoutUser/ajout-user/ajout-user.component';

const routes: Routes = [
  {
    path: 'Geographique',
    component: TablesComponent,
    children: [
      {
        path: 'Region',
        component: RegionComponent,
      },
      {
        path: 'Pays',
        component: PaysComponent,
      },
      {
        path: 'Client',
        component: ClientComponent,
      },
      {
        path: 'Zone',
        component: ZoneComponent,
      },
      {
        path: 'Chantier',
        component: ChantierComponent,
      },
    ],
  },

  {
    path: 'Prestation',
    component: TablesComponent,
    children: [
      {
        path: 'Prestation',
        component: PrestationComponent,
      },
      {
        path: 'Type_Prestation',
        component: TypePrestationComponent,
      },
      {
        path: 'Categorie_Prestation',
        component: CategoriePrestationComponent,
      },

    ],
  },
  {
    path: 'auth',
    component: TablesComponent,
    children: [
      {
        path: 'register',
        component: RegisterUserComponent,
      },
      {
        path: 'reset-password',
        component: ResetPasswordComponent,
      },
      {
        path: 'log-out',
        component: LogoutComponent,
      },

    ],
  },

  {
    path: 'Equipement',
    component: TablesComponent,
    children: [
      {
        path: 'Equipement',
        component: EquipementComponent,
      },
      {
        path: 'Affectation_Equipement',
        component: AffectationEquipementComponent,
      },

    ],
  },
  {
    path: 'Diametre',
    component: DiametreComponent,

  },
  {
    path: 'Appareil',
    component: AppareilComponent,

  },
  {
    path: 'Sondage',
    component: SondageComponent,

  },
  {
    path: 'Arret',
    component: TablesComponent,
    children: [
      {
        path: 'Categorie_Arret',
        component: CategorieArretComponent,
      },
      {
        path: 'Type_Arret',
        component: TypeArretComponent,
      },

    ],
  },
  {
    path: 'Collaborateur',
    component: CollaborateurComponent,

  },
  {
    path: 'Consommable',
    component: TablesComponent,
    children: [
      {
        path: 'Type_Consommable',
        component: TypeConsommableComponent,
      },
      {
        path: 'Marque_Consommable',
        component: MarqueConsommableComponent,
      },
      {
        path: 'Consommable',
        component: ConsommableComponent,
      },

    ],
  },
  {
    path: 'Horaire_Poste',
    component: HorairePosteComponent,

  },
  {
    path: 'Compte_Analytique',
    component: CompteAnalytiqueComponent,

  },
  {
    path: 'Sous_Traitant',
    component: SousTraitantComponent,

  },
  {
    path: 'Rapport',
    component: TablesComponent,
    children: [
      {
        path: 'Rapport_Journalier',
        component: RapportComponent,
      },
      {
        path: 'Rapport_Journalier/Ajout_Rapport_Journalier',
        component: AjoutRapportComponent,

      },
      {
        path:  'Rapport_Journalier/Rapportpdf',
        component: RapportspdfComponent,

      },


      {
        path: 'Rapport_Budget_Machine',
        component: RapportbComponent,
      },
      {
        path: 'Rapport_Budget_Machine/Ajout_Rapport_Machine',
        component: AjoutRapportbComponent,

      },
      {
        path: 'Rapport_Budget_Machine/Ajout_Budget_Machine',
        component: AjoutBudgetComponent,

      },
      {
        path:  'Rapport_Budget_Machine/Rapportpdf',
        component: RapportMpdfComponent,

      },


      {
        path: 'Rapport_Budget_Machine/Ajout_Rapport_Budget_Machine',
        component: AjoutRapportbComponent,

      },




    ],
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TablesRoutingModule { }

export const routedComponents = [
  TablesComponent,
  SmartTableComponent,
  TreeGridComponent,
  RegionComponent,
  AjoutRegionComponent,
  AjoutPaysComponent,
  EditRegionComponent,
  PaysComponent,
  ZoneComponent,
  ClientComponent,
  ChantierComponent,
  PrestationComponent,
  DiametreComponent,
  AppareilComponent,
  SondageComponent,
  CollaborateurComponent,
  ConsommableComponent,
  EquipementComponent,
  TypePrestationComponent,
  CategoriePrestationComponent,
  AffectationEquipementComponent,
  TypeArretComponent,
  CategorieArretComponent,
  TypeConsommableComponent,
  MarqueConsommableComponent,
  CompteAnalytiqueComponent,
  SousTraitantComponent,
  HorairePosteComponent,
  AjoutZoneComponent,
  AjoutAppareilComponent,
RegisterUserComponent,
AjoutUserComponent,
ResetPasswordComponent,
  AjoutClientComponent,
  AjoutChantierComponent,
  AjoutTypePrestationComponent,
  AjoutCategoriePrestationComponent,
  AjoutPrestationComponent,
  AjoutEquipementComponent,
  AjoutAffectationEquipementComponent,
  AjoutSondageComponent,
  AjoutCollaborateurComponent,
  AjoutCompteAnalytiqueComponent,
  AjoutCategorieArretComponent,
  AjoutTypeArretComponent,
  AjoutTypeConsommableComponent,
  AjoutMarqueConsommableComponent,
  AjoutConsommableComponent,
  AjoutHorairePosteComponent,
  EditHorairePosteComponent,
  AjoutSousTraitantComponent,
  AjoutDiametreComponent,
  EditDiametreComponent,
  RapportComponent,
  RapportbComponent,
  RapportcComponent,
  AjoutRapportComponent,
  AjoutRapportbComponent,
  AjoutRapportcComponent,
RapportspdfComponent,
RapportMpdfComponent,
AjoutBudgetComponent
];
