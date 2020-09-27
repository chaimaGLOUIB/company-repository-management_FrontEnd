import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class Horaire_PosteService {
  private basUrl = 'http://localhost:8080/';

  IdSource = new  BehaviorSubject<number>(0);
  IdData:any;

  constructor(private hhtpClient: HttpClient) {
    this.IdData= this.IdSource.asObservable();
  }

  getHoraire_Postes(){
    return this.hhtpClient.get(this.basUrl+'Horaire_Postes');
  }
  addHoraire_Poste(Horaire_Poste){
    return this.hhtpClient.post(this.basUrl + 'Horaire_Poste' , Horaire_Poste);

  }
  updateHoraire_Poste(id: number,Horaire_Poste: any){
    return this.hhtpClient.put(this.basUrl + "Horaire_Poste/" + id, Horaire_Poste);
  }
  
  deleteHoraire_Poste(id :number){
    return this.hhtpClient.delete(this.basUrl + "Horaire_Poste/" + id);

  }
  changeId(postId: number){
    this.IdSource.next(postId);
}
gethoraire_PostesPages(page:number,size:number){
  return this.hhtpClient.get(this.basUrl+'horaire_Postes?page='+page+'&size='+size);
}
gethoraire_PostesPage(page:number,size:number){
  return this.hhtpClient.get(this.basUrl+'Horaire_Postes/'+page+'/'+size);
}
gethoraire_PostesByKeyword(mc:string,page:number,size:number){
  return this.hhtpClient.get(this.basUrl+'Horaire_Poste/search/byNom?nom='+mc+'&page='+page+'&size='+size);
}
getHoraire_Poste(id){
  return this.hhtpClient.get(this.basUrl+"Horaire_Poste/" + id);
}
}
