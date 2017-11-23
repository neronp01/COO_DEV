import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireAction } from 'angularfire2/database';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { AuthService } from '../services/auth-service';
import 'rxjs/add/operator/switchMap';

export interface Information {
  CotisationIndividuelle ?: number;
  calendrier ?: number;
  cotisationFamiliale ?: number;
  cotisationOrganisme ?: number;
  fraisDePosteOrnitaouais ?: number;
  fraisEnvoiCalendrier ?: number;
  fraisEnvoiGuide ?: number;
  guideDesSites ?: number;
  tps ?: number;
  tvq ?: number;
}

export interface IRole {
  administrateurSys ?: Array<string>;
  animExc ?: Array<string>;
  animKio ?: Array<string>;
  conseilAdmin ?: Array<string>;
  presidente ?: Array<string>;
  promoPubli ?: Array<string>;
  recenNoel ?: Array<string>;
  redacRevi ?: Array<string>;
  registraire ?: Array<string>;
  respEnvoie ?: Array<string>;
  siteWeb ?: Array<string>;
  tresorier ?: Array<string>;
}
@Injectable()
export class InformationService {
  infoDoc:  AngularFirestoreDocument<Information>;
  roleDoc:  AngularFirestoreDocument<IRole>;

  constructor( private dbc: AngularFirestore) { }

  get info(): Observable<Information[]>{
    let newInfo = new Observable<Information[]>();
    this.infoDoc = this.dbc.doc<Information>('informations/prix');
    return newInfo = this.infoDoc.valueChanges();
  }
  get infoRole(): Observable<any> {
    let newInfo = new Observable<any>();
    this.roleDoc = this.dbc.doc<IRole>('informations/role');
    return newInfo = this.roleDoc.valueChanges();
  }
}
