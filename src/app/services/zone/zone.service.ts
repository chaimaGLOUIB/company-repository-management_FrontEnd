import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ZoneService {
  private basUrl = 'http://localhost:8080/';

  IdSource = new  BehaviorSubject<number>(0);
  IdData:any;

  constructor(private hhtpClient: HttpClient) {
    this.IdData= this.IdSource.asObservable();
  }
  getzonesPages(page:number,size:number){
    return this.hhtpClient.get(this.basUrl+'zones?page='+page+'&size='+size);
  }
  getzonesByKeyword(mc:string,page:number,size:number){
    return this.hhtpClient.get(this.basUrl+'Zone/search/byNom?nom='+mc+'&page='+page+'&size='+size);
  }
  getzonesPage(page:number,size:number){
    return this.hhtpClient.get(this.basUrl+'Zones/'+page+'/'+size);
  }
  getZones(){
    return this.hhtpClient.get(this.basUrl+'Zones');
  }
  addZone(Zone){
    return this.hhtpClient.post(this.basUrl + 'Zone' , Zone);

  }
  updateZone(id: number,Zone: any){
    return this.hhtpClient.put(this.basUrl + "Zone/" + id, Zone);
  }
  deleteZone(id :number){
    return this.hhtpClient.delete(this.basUrl + "Zone/" + id);

  }
  changeId(postId: number){
    this.IdSource.next(postId);
}
getZone(id){
  return this.hhtpClient.get(this.basUrl+"Zone/" + id);
}
}
