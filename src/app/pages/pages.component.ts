import { Component } from '@angular/core';

import { MENU_ITEMS } from './pages-menu';
import { MENU_ITEMS2 } from './pages-menu2';
import { TokenStorageService } from '../services/auth/token-storage.service';

@Component({
  selector: 'ngx-pages',
  styleUrls: ['pages.component.scss'],
  template: `
    <ngx-one-column-layout>
      <nb-menu  *ngIf='menu && info' [items]="menu"></nb-menu>
      <router-outlet></router-outlet>
    </ngx-one-column-layout>
  `,
})
export class PagesComponent {

  menu :any;
  info :any
  constructor(private token: TokenStorageService) { }

  ngOnInit() {
    this.info = {
      token: this.token.getToken(),
      username: this.token.getUsername(),
      authorities: this.token.getAuthorities()
    };
    if(this.info.authorities == 'ROLE_ADMIN')
    { this.menu = MENU_ITEMS;}
   else{
    this.menu = MENU_ITEMS2
   }

  }
}
