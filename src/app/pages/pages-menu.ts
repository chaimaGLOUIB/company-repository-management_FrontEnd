import { NbMenuItem } from '@nebular/theme';

export const MENU_ITEMS: NbMenuItem[] = [
 
  {
    title: 'Dashboard',
    icon: 'home-outline',
    link: '/pages/charts/chartjs'
  },
  {
    title: 'RAPPORT',
    group: true,
  },
  {
    title: 'Rapport',
    icon: 'layout-outline',
    children: [
      {
        title: 'Rapport Journalier',
        link: '/pages/Rapport/Rapport_Journalier',
      },
      {
        title: 'Rapport Budget Machine',
        link: '/pages/Rapport/Rapport_Budget_Machine',
      },
      
     
      
    ],
      
  },
  
  {
    title: 'REFERENCIEL',
    group: true,
  },
  {
    title: 'Geographique',
    icon: 'layout-outline',
    children: [
      {
        title: 'Region',
        link: '/pages/Geographique/Region',
      },
      {
        title: 'Pays',
        link: '/pages/Geographique/Pays',
      },
      {
        title: 'Client',
        link: '/pages/Geographique/Client',
      },
      {
        title: 'Zone',
        link: '/pages/Geographique/Zone',
      },
      {
        title: 'Chantier',
        link: '/pages/Geographique/Chantier',
      },
     
      
    ],
  },
  {
    title: 'Prestation',
    icon: 'edit-2-outline',
    children: [
      {
        title: 'Type Prestation',
        link: '/pages/Prestation/Type_Prestation',
      },
      {
        title: 'Categorie Prestation',
        link: '/pages/Prestation/Categorie_Prestation',
      },
      {
        title: 'Prestation',
        link: '/pages/Prestation/Prestation',
      },
     
    ],
  },
  {
    title: 'Equipement',
    icon: 'keypad-outline',
    link: '/pages/ui-features',
    children: [
      {
        title: 'Equipement',
        link: '/pages/Equipement/Equipement',
      },
      {
        title: 'Affectation Equipement',
        link: '/pages/Equipement/Affectation_Equipement',
      },
      
    ],
  },
  {
    title: 'Diametre',
    icon: 'shopping-cart-outline',
    link: '/pages/Diametre',
    
  },
  {
    title: 'Appareil',
    icon: 'shopping-cart-outline',
    link: '/pages/Appareil',
    
  },
  {
    title: 'Sondage',
    icon: 'shopping-cart-outline',
    link: '/pages/Sondage',
    
  },
  {
    title: 'Arret',
    icon: 'browser-outline',
    children: [
      {
        title: 'Categorie Arret',
        link: '/pages/Arret/Categorie_Arret',
      },
      {
        title: 'Type Arret',
        link: '/pages/Arret/Type_Arret',
      },
      
    ],
  },
  {
    title: 'Collaborateur',
    icon: 'message-circle-outline',
    link: '/pages/Collaborateur',

  },
  {
    title: 'Consommable',
    icon: 'map-outline',
    children: [
      {
        title: 'Type Consommable',
        link: '/pages/Consommable/Type_Consommable',
      },
      {
        title: 'Marque Consommable',
        link: '/pages/Consommable/Marque_Consommable',
      },
      {
        title: 'Consommable',
        link: '/pages/Consommable/Consommable',
      },
      
    ],
  },
  {
    title: 'Horaire Poste',
    icon: 'pie-chart-outline',
    link:'/pages/Horaire_Poste',
  },
  
  {
    title: 'Compte Analytique',
    icon: 'pie-chart-outline',
    link:'/pages/Compte_Analytique',
  },
  {
    title: 'Sous Traitant',
    icon: 'pie-chart-outline',
    link:'/pages/Sous_Traitant',
  },
  
  {
    title: 'Auth',
    icon: 'lock-outline',
    children: [
      
      {
        title: 'Register',
        link: '/pages/auth/register',
      },
     
      {
        title: 'Reset Password',
        link: '/pages/auth/reset-password',
      },
      {
        title: 'log out',
        link: '/pages/auth/log-out',
      },
    ],
  },
];
