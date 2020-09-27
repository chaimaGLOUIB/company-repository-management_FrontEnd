import { Component, OnInit, Injectable } from '@angular/core';

import { Router } from '@angular/router';
import { NbDialogRef } from '@nebular/theme';
import { RegionService } from '../../../../../services/region/region.service';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-ajout-region',
  templateUrl: './ajout-region.component.html',
  styleUrls: ['./ajout-region.component.css']
})

export class AjoutRegionComponent implements OnInit {
  registerForm: FormGroup;
  submitted = false;
  region: any;
  done: any;
  id: number;
  constructor(
    private formBuilder: FormBuilder,
    private service: RegionService,
    private router: Router,
    public dialogRef: MatDialogRef<AjoutRegionComponent>,
  ) { }



  ngOnInit() {
    this.service.IdData.subscribe(data => {
      this.id = data;


      if (this.id !== 0) {
        this.service.getRegion(this.id).subscribe(data => {
          this.region = data;


          this.registerForm.controls['nom'].setValue(this.region.nom);
          this.registerForm.controls['description'].setValue(this.region.description);


        }, error => { console.log("Error while gettig post details") });
      }
      else {
        this.initializeFormGroup;
      }

    });






    this.registerForm = this.formBuilder.group({
      description: [''],

      nom: ['', [Validators.required, this.regionValidator]]


    });

  }
  initializeFormGroup() {
    this.registerForm.setValue({

      nom: '',
      description: '',

    });
  }

  onSubmit(region) {

    this.submitted = true;

    if (this.registerForm.invalid) {
      return;
    }
    if (this.id !== 0) {
      this.update(this.id, region);
    }
    else { this.save(region); }
    this.done = 1;

    this.onClose();
  }

  // convenience getter for easy access to form fields
  get f() { return this.registerForm.controls; }

  regionValidator(control: AbstractControl) {
    if (control.value === 'nationnal' || control.value === 'internationnal') {
      return null;
    }
    return { nom: true };
  }

  onReset() {
    this.submitted = false;
    this.registerForm.reset();
  }
  save(region) {
    this.service.addRegion(region).subscribe(
      data => {
        console.log(data);
      }, error => console.log(error));
    this.gotoList();

  }
  update(id, region) {
    this.service.updateRegion(id, region).subscribe(
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
    this.router.navigate(['pages/Geographique/Region']);
  }
  Edit(p) {

  }
}