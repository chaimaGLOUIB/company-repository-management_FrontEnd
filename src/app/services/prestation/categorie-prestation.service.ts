import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class Categorie_PrestationService {
  private basUrl = 'http://localhost:8080/';

  IdSource = new  BehaviorSubject<number>(0);
  IdData:any;

  constructor(private hhtpClient: HttpClient) {
    this.IdData= this.IdSource.asObservable();
  }

  getCategorie_Prestations(){
    return this.hhtpClient.get(this.basUrl+'Categorie_Prestations');
  }
  addCategorie_Prestation(Categorie_Prestation){
    return this.hhtpClient.post(this.basUrl + 'Categorie_Prestation' , Categorie_Prestation);

  }
  updateCategorie_Prestation(id: number,Categorie_Prestation: any){
    return this.hhtpClient.put(this.basUrl + "Categorie_Prestation/" + id, Categorie_Prestation);
  }
  deleteCategorie_Prestation(id :number){
    return this.hhtpClient.delete(this.basUrl + "Categorie_Prestation/" + id);

  }
  changeId(postId: number){
    this.IdSource.next(postId);
}
getcategorie_PrestationsPages(page:number,size:number){
  return this.hhtpClient.get(this.basUrl+'categorie_Prestations?page='+page+'&size='+size);
}
getcategorie_PrestationsPage(page:number,size:number){
  return this.hhtpClient.get(this.basUrl+'Categorie_Prestations/'+page+'/'+size);
}
getcategorie_PrestationsByKeyword(mc:string,page:number,size:number){
  return this.hhtpClient.get(this.basUrl+'Categorie_Prestation/search/byNom?nom='+mc+'&page='+page+'&size='+size);
}
getCategorie_Prestation(id){
  return this.hhtpClient.get(this.basUrl+"Categorie_Prestation/" + id);
}
}
