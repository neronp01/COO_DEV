import { Component, OnInit, Output, EventEmitter, Input  } from '@angular/core';
import { InfPersoInscMembService, Membre } from '../../services/inf-perso-insc-memb.service';
import { AuthService } from '../../services/auth-service';
import {Observable} from 'rxjs/Observable';
import * as firebase from 'firebase';


@Component({
  selector: 'app-facture',
  templateUrl: './facture.component.html',
  styleUrls: ['./facture.component.css']
})
export class FactureComponent implements OnInit {
  @ Output() fuillet = new EventEmitter <string>();
  infoMembre: Membre;
  nom: string;
  adresse: string;
  courriel: string;
constructor(private memb: InfPersoInscMembService , private se: AuthService ) {
  }

  ngOnInit() {
    this.trouverUser()
  }

  trouverUser() {
    let user: Observable<firebase.User>;
    user = this.se.user.map(
      x => { return x; }
    );
    user.subscribe( x => {
       this.trouverInfMembre(x.email);
       this.courriel = x.email;
      // this.trouverUid(x.email);
      console.log('email', x.email)
    });
  }

  trouverInfMembre(courriel: string) {
    this.memb.trouverInfMembre(courriel).subscribe( x =>
      { // this.infoMembre = x[0];
        const data = x[0];
        this.infoMembre = data['data'];
        console.log('lala',this.infoMembre.nomListe);
        this.nom = this.infoMembre.prenom + ' ' + this.infoMembre.nom;
        this.adresse = this.infoMembre.adresse + ' ' + this.infoMembre.ville + ' ' + this.infoMembre.codePostal;
      }
    )
  }

}
