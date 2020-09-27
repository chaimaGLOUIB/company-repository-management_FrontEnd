import { Component, OnInit } from '@angular/core';
import { RegionService } from '../../../services/region/region.service';
import { NbDialogService } from '@nebular/theme';
import { Router } from '@angular/router';
import { AjoutRegionComponent } from './ajout_region/ajout-region/ajout-region.component';
import { MatDialogConfig, MatDialog } from '@angular/material/dialog';


@Component({
  selector: 'app-region',
  templateUrl: './region.component.html',
  styleUrls: ['./region.component.css']
})
export class RegionComponent implements OnInit {
public regions:any;
public page:number=0;
public size:number=5;
public total:number;
public pages : Array<number>;
  constructor(private regionServ:RegionService,
    private router:Router,
    public dialog: MatDialog) {}

  ngOnInit(): void {
    this.getregions();
  }

  getregions() {
  this.regionServ.getRegionss(this.page,this.size).subscribe(
    data => {
      
      this.total=data["totalPages"];
      this.pages=new Array<number>(this.total);
      this.regions = data["content"];
      console.log(data);
    },
    err => {
      console.log(err);
    }
  );
}
onChercher(value){
  this.regionServ.getRegionsByKeyword(value.cle,this.page,this.size).subscribe(
    data => {
      
      this.total=data["totalPages"];
      this.pages=new Array<number>(this.total);
      this.regions =  data["content"];
      console.log(data);
    },
    err => {
      console.log(err);
    }
  ); 
}

onPage(i){
  this.page=i;
  this.getregions();
}
  openDialogEdit(id): void {
    this.regionServ.changeId(id);
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "60%";
    this.dialog.open(AjoutRegionComponent,dialogConfig);
    
}
openDialog(): void {
  this.regionServ.changeId(0);
  const dialogConfig = new MatDialogConfig();
  dialogConfig.disableClose = true;
  dialogConfig.autoFocus = true;
  dialogConfig.width = "60%";
  this.dialog.open(AjoutRegionComponent,dialogConfig);
  
}
Supprimer(id){
  if (window.confirm('Are you sure you want to delete?')) {

    this.regionServ.deleteRegion(id).subscribe(
      res => {
          
        this.router.routeReuseStrategy.shouldReuseRoute = () => false;
      this.router.onSameUrlNavigation = 'reload';
      this.router.navigate(['pages/Geographique/Region']);
  
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
