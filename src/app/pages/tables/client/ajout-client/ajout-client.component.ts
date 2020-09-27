import { Component, OnInit } from '@angular/core';

import { Router } from '@angular/router';
import { MatDialogRef } from '@angular/material/dialog';
import { ClientService } from '../../../../services/client/client.service';
import { NbDialogRef } from '@nebular/theme';

import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { PaysService } from '../../../../services/pays/pays.service';

@Component({
  selector: 'app-ajout-client',
  templateUrl: './ajout-client.component.html',
  styleUrls: ['./ajout-client.component.css']
})
export class AjoutClientComponent implements OnInit {
  registerForm: FormGroup;
  registerForm1: FormGroup;
  submitted = false;
  clients:any;
  pays:any;
  id:any;
  constructor(private formBuilder: FormBuilder,
    private clientService: ClientService,
    private paysService: PaysService,
              private router: Router,
              public dialogRef: MatDialogRef<AjoutClientComponent>) { }

  ngOnInit() {
  this.getPays();
      this.registerForm = this.formBuilder.group({
          description: [''],
          pays: ['', [Validators.required]],
          typeClient: ['', [Validators.required]],
          etat : ['', Validators.required],
          nom : ['', [Validators.required,this.clientValidator]]

          
      });
     
      
      this.clientService.IdData.subscribe(data => {
        this.id = data;
      
     
        if (this.id !== 0) {
          this.clientService.getClient(this.id).subscribe(data => {
            this.clients= data;
            
            
              this.registerForm.controls['nom'].setValue(this.clients.nom);
              this.registerForm.controls['description'].setValue(this.clients.description);
              this.registerForm.controls['pays'].setValue(this.clients.pays);
              this.registerForm.controls['etat'].setValue(this.clients.etat);
              this.registerForm.controls['typeClient'].setValue(this.clients.typeClient);


             
            
          }, error => { console.log("Error while gettig post details") });
        }
        
        
      });

  }
  

  // convenience getter for easy access to form fields
  get f() { return this.registerForm.controls; }

 
  
  clientValidator(control: AbstractControl) {
    if (control.value ==='CMG' || control.value ==='SMI' || control.value ==='LAFARGE' || control.value ==='OCP')
   {
    return null ;
      
    }
    return { nom: true };
  }
  
  onReset() {
      this.submitted = false;
      this.registerForm.reset();
  }
  save(client) {
    this.clientService.addClient(client).subscribe(
      data =>{
       console.log(data);
      }, error => console.log(error));
   this.gotoList();

  }

  onSubmit(client) {
    this.submitted = true;
    
    if (this.registerForm.invalid) {
      return;
    }
    if(this.id!==0)
    {
      this.update(this.id,client);
    }
    else{this.save(client);}    alert('SUCCESS!! :-)\n\n' + JSON.stringify(this.registerForm.value, null, 4));
    this.onClose();
}
update(id,Client) {
  this.clientService.updateClient(id,Client).subscribe(
    data =>{
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
    this.router.navigate(['/pages/Geographique/Client']);  
  }
  
  getPays(){
    this.paysService.getPayss().subscribe(
      data =>{
        this.pays=data;
        console.log(data);
      },
     error =>{
       console.log(error);
     }
      
    )
  }
}