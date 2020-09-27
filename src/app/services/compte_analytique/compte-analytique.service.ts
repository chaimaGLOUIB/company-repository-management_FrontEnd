import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class Compte_AnalytiqueService {
  private basUrl = 'http://localhost:8080/';

  IdSource = new  BehaviorSubject<number>(0);
  IdData:any;

  constructor(private hhtpClient: HttpClient) {
    this.IdData= this.IdSource.asObservable();
  }
  getCompte_Analytiques(){
    return this.hhtpClient.get(this.basUrl+'Compte_Analytiques');
  }
  addCompte_Analytique(Compte_Analytique){
    return this.hhtpClient.post(this.basUrl + 'Compte_Analytique' , Compte_Analytique);

  }
  updateCompte_Analytique(id: number,Compte_Analytique: any){
    return this.hhtpClient.put(this.basUrl + "Compte_Analytique/" + id, Compte_Analytique);
  }
  deleteCompte_Analytique(id :number){
    return this.hhtpClient.delete(this.basUrl + "Compte_Analytique/" + id);

  }
  changeId(postId: number){
    this.IdSource.next(postId);
}
getcompte_AnalytiquesPages(page:number,size:number){
  return this.hhtpClient.get(this.basUrl+'compte_Analytiques?page='+page+'&size='+size);
}
getcompte_AnalytiquesPage(page:number,size:number){
  return this.hhtpClient.get(this.basUrl+'Compte_Analytique/'+page+'/'+size);
}
getcompte_AnalytiquesByKeyword(mc:string,page:number,size:number){
  return this.hhtpClient.get(this.basUrl+'Compte_Analytique/search/byNom?nom='+mc+'&page='+page+'&size='+size);
}
getCompte_Analytique(id){
  return this.hhtpClient.get(this.basUrl+"Compte_Analytique/" + id);
}
}
