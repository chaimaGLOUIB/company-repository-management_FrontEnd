import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MarqueConsommableService {
  private basUrl = 'http://localhost:8080/';

  IdSource = new  BehaviorSubject<number>(0);
  IdData:any;

  constructor(private hhtpClient: HttpClient) {
    this.IdData= this.IdSource.asObservable();
  }
  getMarqueConsommables(){
    return this.hhtpClient.get(this.basUrl+'MarqueConsommables');
  }
  addMarqueConsommable(MarqueConsommable){
    return this.hhtpClient.post(this.basUrl + 'MarqueConsommable' , MarqueConsommable);

  }
  updateMarqueConsommable(id: number,MarqueConsommable: any){
    return this.hhtpClient.put(this.basUrl + "MarqueConsommable/" + id, MarqueConsommable);
  }
  
  deleteMarqueConsommablet(id :number){
    return this.hhtpClient.delete(this.basUrl + "MarqueConsommable/" + id);

  }
  changeId(postId: number){
    this.IdSource.next(postId);
}
getmarqueConsommablesPages(page:number,size:number){
  return this.hhtpClient.get(this.basUrl+'marqueConsommables?page='+page+'&size='+size);
}
getmarqueConsommablesPage(page:number,size:number){
  return this.hhtpClient.get(this.basUrl+'MarqueConsommables/'+page+'/'+size);
}
getmarqueConsommablesByKeyword(mc:string,page:number,size:number){
  return this.hhtpClient.get(this.basUrl+'MarqueConsommable/search/byNom?nom='+mc+'&page='+page+'&size='+size);
}
getMarqueConsommable(id){
  return this.hhtpClient.get(this.basUrl+"MarqueConsommable/" + id);
}
}
