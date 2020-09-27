import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EquipementService {
  private basUrl = 'http://localhost:8080/';

  IdSource = new  BehaviorSubject<number>(0);
  IdData:any;
  EquipementSource = new  BehaviorSubject<any>(0);
  EquipementData:any;

  constructor(private hhtpClient: HttpClient) {
    this.IdData= this.IdSource.asObservable();
    this.EquipementData= this.EquipementSource.asObservable();

  }
  sendEquipement(Equipement: any){
    this.EquipementSource.next(Equipement);
  }
  getEquipements(){
    return this.hhtpClient.get(this.basUrl+'Equipements');
  }
  addEquipement(Equipement){
    return this.hhtpClient.post(this.basUrl + 'Equipement' , Equipement);

  }
  updateEquipement(id: number,Equipement: any){
    return this.hhtpClient.put(this.basUrl + "Equipement/" + id, Equipement);
  }
  deleteEquipement(id :number){
    return this.hhtpClient.delete(this.basUrl + "Equipement/" + id);

  }
  changeId(postId: number){
    this.IdSource.next(postId);
}
getequipementsPages(page:number,size:number){
  return this.hhtpClient.get(this.basUrl+'equipements?page='+page+'&size='+size);
}
getequipementsPage(page:number,size:number){
  return this.hhtpClient.get(this.basUrl+'Equipement/'+page+'/'+size);
}
getequipementsByKeyword(mc:string,page:number,size:number){
  return this.hhtpClient.get(this.basUrl+'equipements/search/byNom?mc='+mc+'&page='+page+'&size='+size);
}
getEquipement(id){
  return this.hhtpClient.get(this.basUrl+"Equipement/" + id);
}
}
