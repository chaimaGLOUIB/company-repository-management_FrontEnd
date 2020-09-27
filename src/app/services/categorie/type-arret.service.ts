import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TypeArretService {
  private basUrl = 'http://localhost:8080/';
  IdSource = new  BehaviorSubject<number>(0);
  IdData:any;

  constructor(private hhtpClient: HttpClient) {
    this.IdData= this.IdSource.asObservable();
  }

  getTypeArrets(){
    return this.hhtpClient.get(this.basUrl+'TypeArrets');
  }
  addTypeArret(TypeArret){
    return this.hhtpClient.post(this.basUrl + 'TypeArret' , TypeArret);

  }
  updateTypeArret(id: number,TypeArret: any){
    return this.hhtpClient.put(this.basUrl + "TypeArret/" + id, TypeArret);
  }
  deleteTypeArret(id :number){
    return this.hhtpClient.delete(this.basUrl + "TypeArret/" + id);

  }
  changeId(postId: number){
    this.IdSource.next(postId);
}
gettypeArretsPages(page:number,size:number){
  return this.hhtpClient.get(this.basUrl+'typeArrets?page='+page+'&size='+size);
}

gettypeArretsPage(page:number,size:number){
  return this.hhtpClient.get(this.basUrl+'TypeArrets/'+page+'/'+size);
}
gettypeArretsByKeyword(mc:string,page:number,size:number){
  return this.hhtpClient.get(this.basUrl+'TypeArret/search/byNom?nom='+mc+'&page='+page+'&size='+size);
}
getTypeArret(id){
  return this.hhtpClient.get(this.basUrl+"TypeArret/" + id);
}
}
