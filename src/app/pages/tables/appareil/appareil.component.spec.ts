import { Component, OnInit } from '@angular/core';
import { AppareilService } from '../services/Appareil/Appareil.service';
import { MatDialog } from '@angular/material/dialog';
import { AjoutAppareilComponent } from './ajout-Appareil/ajout-Appareil.component';


@Component({
  selector: 'app-Appareil',
  templateUrl: './Appareil.component.html',
  styleUrls: ['./Appareil.component.css']
})
export class AppareilComponent implements OnInit {
public Appareils:any;
  constructor(private AppareilServ:AppareilService,
    public dialog: MatDialog) {}

  ngOnInit(): void {
    this.getAppareils();
  }

  getAppareils() {
  this.AppareilServ.getAppareils().subscribe(
    data => {
      this.Appareils = data;
      console.log(data);
    },
    err => {
      console.log(err);
    }
  );
}


  openDialog(): void {
    const dialogRef = this.dialog.open(AjoutAppareilComponent, {
      width: '500px',
      height: '400px',
      data: {}
    });

   

}
}
