import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UtilisateurService {
  private basUrl = 'http://localhost:8080/';
  
  IdSource = new  BehaviorSubject<number>(0);
  IdData:any;

  constructor(private hhtpClient: HttpClient) {
    this.IdData= this.IdSource.asObservable();

  }
  changeId(postId: number){
    this.IdSource.next(postId);
}
  getUsers(){
    return this.hhtpClient.get(this.basUrl + 'Users');
  }
  getUser(id: number){
    return this.hhtpClient.get(this.basUrl + 'User/'+ id);
  }
  getUserU(username: String ){
    return this.hhtpClient.get(this.basUrl + 'user/' + username);
  }
  addUser(User: any){
    return this.hhtpClient.post(this.basUrl + 'User', User);
  }
  updateUser(id: number,User: any){
    return this.hhtpClient.put(this.basUrl + 'User/' + id, User);
  }

  exitUser(user: any){
    return this.hhtpClient.post(this.basUrl + 'Utilisateuruser'  , user);
  }
  activeUser(id: number, User: any){
    return this.hhtpClient.put(this.basUrl + 'User/active/' + id , User);
  }
  notactiveUser(id: number, User: any){
    return this.hhtpClient.put(this.basUrl + 'User/notactive/' + id , User);
  }
  getUsersP(page:number,size:number){
    return this.hhtpClient.get(this.basUrl+'Users/'+page+'/'+size);
  }
  getUsersByKeyword(mc:string,page:number,size:number){
    return this.hhtpClient.get(this.basUrl+'User/search/byNom?nom='+mc+'&page='+page+'&size='+size);
  }
  deleteUser(id :number){
    return this.hhtpClient.delete(this.basUrl + "User/" + id);

  }
}
