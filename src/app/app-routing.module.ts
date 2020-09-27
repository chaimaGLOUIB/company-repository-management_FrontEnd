import { ExtraOptions, RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import {
 
  NbResetPasswordComponent, NbAuthComponent,
} from '@nebular/auth';
import { LoginComponent } from './pages/login/login.component';



const routes: Routes = [
  { 
    path: 'pages',
    loadChildren: () => import('./pages/pages.module')
      .then(m => m.PagesModule), 
  },
  {
    path: 'auth',
    component: NbAuthComponent,
    children: [
      {
        path: 'login',
        component: LoginComponent,
      },
   
]},
{ path: '', redirectTo: 'auth/login', pathMatch: 'full' },
{ path: '**', redirectTo: 'auth/login' },
]
const config: ExtraOptions = {
  useHash: false,
};

@NgModule({
  imports: [RouterModule.forRoot(routes, config)],
  exports: [RouterModule],
})
export class AppRoutingModule {
}
