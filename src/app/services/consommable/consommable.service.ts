import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ConsommableService {
  private basUrl = 'http://localhost:8080/';

  IdSource = new  BehaviorSubject<number>(0);
  IdData:any;

  constructor(private hhtpClient: HttpClient) {
    this.IdData= this.IdSource.asObservable();
  }
  getConsommables(){
    return this.hhtpClient.get(this.basUrl+'Consommables');
  }
  addConsommable(Consommable){
    return this.hhtpClient.post(this.basUrl + 'Consommable' , Consommable);

  }
  updateConsommable(id: number,Consommable: any){
    return this.hhtpClient.put(this.basUrl + "Consommable/" + id, Consommable);
  }
  deleteConsommable(id :number){
    return this.hhtpClient.delete(this.basUrl + "Consommable/" + id);

  }
  changeId(postId: number){
    this.IdSource.next(postId);
}
getconsommablesPages(page:number,size:number){
  return this.hhtpClient.get(this.basUrl+'consommables?page='+page+'&size='+size);
}
getconsommablesPage(page:number,size:number){
  return this.hhtpClient.get(this.basUrl+'Consommables/'+page+'/'+size);
}
getconsommablesByKeyword(mc:string,page:number,size:number){
  return this.hhtpClient.get(this.basUrl+'Consommables/search/byNom?nom='+mc+'&page='+page+'&size='+size);
}
getConsommable(id){
  return this.hhtpClient.get(this.basUrl+"Consommable/" + id);
}
}
