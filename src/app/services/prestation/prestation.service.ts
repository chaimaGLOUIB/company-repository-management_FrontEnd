import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PrestationService {
  private basUrl = 'http://localhost:8080/';
  IdSource = new  BehaviorSubject<number>(0);
  IdData:any;

  constructor(private hhtpClient: HttpClient) {
    this.IdData= this.IdSource.asObservable();
  }
  getPrestations(){
    return this.hhtpClient.get(this.basUrl+'Prestations');
  }
  addPrestation(Prestation){
    return this.hhtpClient.post(this.basUrl + 'Prestation' , Prestation);

  }
  updatePrestation(id: number,Prestation: any){
    return this.hhtpClient.put(this.basUrl + "Prestation/" + id, Prestation);
  }
  deletePrestation(id :number){
    return this.hhtpClient.delete(this.basUrl + "Prestation/" + id);

  }
  changeId(postId: number){
    this.IdSource.next(postId);
}
getprestationsPages(page:number,size:number){
  return this.hhtpClient.get(this.basUrl+'prestations?page='+page+'&size='+size);
}
getprestationsPage(page:number,size:number){
  return this.hhtpClient.get(this.basUrl+'Prestations/'+page+'/'+size);
}
getprestationsByKeyword(mc:string,page:number,size:number){
  return this.hhtpClient.get(this.basUrl+'Prestation/search/byNom?nom='+mc+'&page='+page+'&size='+size);
}
getPrestation(id){
  return this.hhtpClient.get(this.basUrl+"Prestation/" + id);
}
}
