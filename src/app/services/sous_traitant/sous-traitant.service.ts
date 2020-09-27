import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class Sous_TraitantService {
  private basUrl = 'http://localhost:8080/';

  IdSource = new  BehaviorSubject<number>(0);
  IdData:any;

  constructor(private hhtpClient: HttpClient) {
    this.IdData= this.IdSource.asObservable();
  }
  getsous_TraitantsPages(page:number,size:number){
    return this.hhtpClient.get(this.basUrl+'sous_Traitants?page='+page+'&size='+size);
  }
  getsous_TraitantsPage(page:number,size:number){
    return this.hhtpClient.get(this.basUrl+'Sous_Traitants/'+page+'/'+size);
  }
  getsous_TraitantsByKeyword(mc:string,page:number,size:number){
    return this.hhtpClient.get(this.basUrl+'Sous_Traitant/search/byNom?nom='+mc+'&page='+page+'&size='+size);
  }
  getSous_Traitants(){
    return this.hhtpClient.get(this.basUrl+'Sous_Traitants');
  }
  addSous_Traitant(Sous_Traitant){
    return this.hhtpClient.post(this.basUrl + 'Sous_Traitant' , Sous_Traitant);

  }
  updateSous_Traitant(id: number,Sous_Traitant: any){
    return this.hhtpClient.put(this.basUrl + "Sous_Traitant/" + id, Sous_Traitant);
  }
  deleteSous_Traitant(id :number){
    return this.hhtpClient.delete(this.basUrl + "Sous_Traitant/" + id);

  }
  changeId(postId: number){
    this.IdSource.next(postId);
}
getSous_Traitant(id){
  return this.hhtpClient.get(this.basUrl+"Sous_Traitant/" + id);
}
}
