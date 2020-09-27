import { Component, OnInit } from '@angular/core';

import { Router } from '@angular/router';
import { MatDialogRef } from '@angular/material/dialog';
import { ZoneService } from '../../../../services/zone/zone.service';

import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { ClientService } from '../../../../services/client/client.service';
import { NbDialogRef } from '@nebular/theme';

@Component({
  selector: 'app-ajout-zone',
  templateUrl: './ajout-zone.component.html',
  styleUrls: ['./ajout-zone.component.css']
})
export class AjoutZoneComponent implements OnInit {
  registerForm: FormGroup;
  submitted = false;
  zones:any;
  id:number;
  clients:any;
  constructor(private formBuilder: FormBuilder,
    private zoneService: ZoneService,
    private clientService: ClientService,
              private router: Router,
              public dialogRef: MatDialogRef<AjoutZoneComponent>) { }

  ngOnInit() {
  this.getClients();
      this.registerForm = this.formBuilder.group({
          description: [''],
          client: ['', [Validators.required]],
          etat : ['', Validators.required],
          nom : ['', [Validators.required,this.zoneValidator]]

          
      });
      this.zoneService.IdData.subscribe(data => {
        this.id = data;
        if (this.id !== 0) {
          this.zoneService.getZone(this.id).subscribe(data => {
            this.zones= data;
            
             this.registerForm.controls['nom'].setValue(this.zones.nom);
              this.registerForm.controls['client'].setValue(this.zones.client);
              this.registerForm.controls['etat'].setValue(this.zones.etat);
              this.registerForm.controls['description'].setValue(this.zones.description);

            
          }, error => { console.log("Error while gettig post details") });
        }
        
        
      });
      
     

  }
  

  // convenience getter for easy access to form fields
  get f() { return this.registerForm.controls; }

 
  
  zoneValidator(control: AbstractControl) {
    if (control.value ==='CMG DS' || control.value ==='CMG HAJJAR' || control.value ==='SMI' )
   {
    return null ;
      
    }
    return { nom: true };
  }
  
  onReset() {
      this.submitted = false;
      this.registerForm.reset();
  }
  save(zone) {
    
    this.zoneService.addZone(zone).subscribe(
      data =>{
       console.log(data);
      }, error => console.log(error));
   this.gotoList();

  }

  onSubmit(zone) {
    this.submitted = true;
    
    if (this.registerForm.invalid) {
      return;
    }
    if(this.id!==0)
    {
      this.update(this.id,zone);
    }
    else{
     this.save(zone);}    alert('SUCCESS!! :-)\n\n' + JSON.stringify(this.registerForm.value, null, 4));
    this.onClose();
}
update(id,zone) {
  this.zoneService.updateZone(id,zone).subscribe(
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
    this.router.navigate(['/pages/Geographique/Zone']);  }
  getClients(){
    this.clientService.getClients().subscribe(
      data =>{
        this.clients=data;
        console.log(data);
      },
     error =>{
       console.log(error);
     }
      
    )
  }
}