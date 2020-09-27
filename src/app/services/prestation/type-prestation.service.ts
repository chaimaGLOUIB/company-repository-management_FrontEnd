import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class Type_PrestationService {
  private basUrl = 'http://localhost:8080/';

  IdSource = new  BehaviorSubject<number>(0);
  IdData:any;

  constructor(private hhtpClient: HttpClient) {
    this.IdData= this.IdSource.asObservable();
  }
  getType_Prestations(){
    return this.hhtpClient.get(this.basUrl+'Type_Prestations');
  }
  addType_Prestation(Type_Prestation){
    return this.hhtpClient.post(this.basUrl + 'Type_Prestation' , Type_Prestation);

  }
  gettype_PrestationsPages(page:number,size:number){
    return this.hhtpClient.get(this.basUrl+'type_Prestations?page='+page+'&size='+size);
  }
  gettype_PrestationsPage(page:number,size:number){
    return this.hhtpClient.get(this.basUrl+'Type_Prestations/'+page+'/'+size);
  }
  gettype_PrestationsByKeyword(mc:string,page:number,size:number){
    return this.hhtpClient.get(this.basUrl+'Type_Prestation/search/byNom?nom='+mc+'&page='+page+'&size='+size);
  }
  updateType_Prestation(id: number,Type_Prestation: any){
    return this.hhtpClient.put(this.basUrl + "Type_Prestation/" + id, Type_Prestation);
  }
  deleteType_Prestation(id :number){
    return this.hhtpClient.delete(this.basUrl + "Type_Prestation/" + id);

  }
 
  changeId(postId: number){
    this.IdSource.next(postId);
}
getType_Prestation(id){
  return this.hhtpClient.get(this.basUrl+"Type_Prestation/" + id);
}
}
