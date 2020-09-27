import { Component, OnInit } from '@angular/core';
import { ZoneService } from '../../../services/zone/zone.service';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AjoutZoneComponent } from './ajout-zone/ajout-zone.component';


@Component({
  selector: 'app-zone',
  templateUrl: './zone.component.html',
  styleUrls: ['./zone.component.css']
})
export class ZoneComponent implements OnInit {
public zones:any;
public page:number=0;
public size:number=5;
public total:number;
public pages : Array<number>;
  constructor(private zoneServ:ZoneService,
    private router:Router,
    public dialog: MatDialog) {}

  ngOnInit(): void {
    this.getzones();
  }

  getzones() {
  this.zoneServ.getzonesPage(this.page,this.size).subscribe(
    data => {
      
      this.total=data["totalPages"];
      this.pages=new Array<number>(this.total);
      this.zones = data["content"];
      console.log(data);
    },
    err => {
      console.log(err);
    }
  );
}
onChercher(value){
  this.zoneServ.getzonesByKeyword(value.cle,this.page,this.size).subscribe(
    data => {
      
      this.total=data["totalPages"];
      this.pages=new Array<number>(this.total);
      this.zones =  data["content"];
      console.log(data);
    },
    err => {
      console.log(err);
    }
  ); 
}

onPage(i){
  this.page=i;
  this.getzones();
}
  openDialogEdit(id): void {
    this.zoneServ.changeId(id);
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "60%";
    this.dialog.open(AjoutZoneComponent,dialogConfig);
    
}
openDialog(): void {
  this.zoneServ.changeId(0);
  const dialogConfig = new MatDialogConfig();
  dialogConfig.disableClose = true;
  dialogConfig.autoFocus = true;
  dialogConfig.width = "60%";
  this.dialog.open(AjoutZoneComponent,dialogConfig);
  
}
Supprimer(id){
  if (window.confirm('Are you sure you want to delete?')) {

    this.zoneServ.deleteZone(id).subscribe(
      res => {
          
        this.router.routeReuseStrategy.shouldReuseRoute = () => false;
      this.router.onSameUrlNavigation = 'reload';
      this.router.navigate(['/pages/Geographique/Zone']);  
  
            console.log(res);
  
        },  
      err => {
          console.log(err);
  });
} else {
  id.confirm.reject();
}
}
}
