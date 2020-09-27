import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TypeConsommableService {
  private basUrl = 'http://localhost:8080/';

  IdSource = new  BehaviorSubject<number>(0);
  IdData:any;

  constructor(private hhtpClient: HttpClient) {
    this.IdData= this.IdSource.asObservable();
  }
  getTypeConsommables(){
    return this.hhtpClient.get(this.basUrl+'TypeConsommables');
  }
  addTypeConsommable(TypeConsommable){
    return this.hhtpClient.post(this.basUrl + 'TypeConsommable' , TypeConsommable);

  }
  updateTypeConsommable(id: number,TypeConsommable: any){
    return this.hhtpClient.put(this.basUrl + "TypeConsommable/" + id, TypeConsommable);
  }
  
  deleteTypeConsommable(id :number){
    return this.hhtpClient.delete(this.basUrl + "TypeConsommable/" + id);

  }
  changeId(postId: number){
    this.IdSource.next(postId);
}
gettypeConsommablesPages(page:number,size:number){
  return this.hhtpClient.get(this.basUrl+'typeConsommables?page='+page+'&size='+size);
}
gettypeConsommablesPage(page:number,size:number){
  return this.hhtpClient.get(this.basUrl+'TypeConsommables/'+page+'/'+size);
}
gettypetypeConsommablesByKeyword(mc:string,page:number,size:number){
  return this.hhtpClient.get(this.basUrl+'TypeConsommable/search/byNom?nom='+mc+'&page='+page+'&size='+size);
}
getTypeConsommable(id){
  return this.hhtpClient.get(this.basUrl+"TypeConsommable/" + id);
}
}
