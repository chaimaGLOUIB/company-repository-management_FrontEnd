import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class Affectation_EquipementService {
  private basUrl = 'http://localhost:8080/';

  IdSource = new  BehaviorSubject<number>(0);
  IdData:any;

  constructor(private hhtpClient: HttpClient) {
    this.IdData= this.IdSource.asObservable();
  }
  getAffectation_Equipements(){
    return this.hhtpClient.get(this.basUrl+'Affectation_Equipements');
  }
  addAffectation_Equipement(Affectation_Equipement){
    return this.hhtpClient.post(this.basUrl + 'Affectation_Equipement' , Affectation_Equipement);

  }
  updateAffectation_Equipement(id: number,Affectation_Equipement: any){
    return this.hhtpClient.put(this.basUrl + "Affectation_Equipement/" + id, Affectation_Equipement);
  }
  deleteAffectation_Equipement(id :number){
    return this.hhtpClient.delete(this.basUrl + "Affectation_Equipement/" + id);

  }
 
  changeId(postId: number){
    this.IdSource.next(postId);
}
getaffectation_EquipementsPages(page:number,size:number){
  return this.hhtpClient.get(this.basUrl+'affectation_Equipements?page='+page+'&size='+size);
}
getaffectation_EquipementsPage(page:number,size:number){
  return this.hhtpClient.get(this.basUrl+'Affectation_Equipements/'+page+'/'+size);
}
getaffectation_EquipementsByKeyword(mc:string,page:number,size:number){
  return this.hhtpClient.get(this.basUrl+'Affectation_Equipement/search/byNom?nom='+mc+'&page='+page+'&size='+size);
}
getAffectation_Equipement(id){
  return this.hhtpClient.get(this.basUrl+"Affectation_Equipement/" + id);
}
}
