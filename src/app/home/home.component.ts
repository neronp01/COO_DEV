import { Component, OnInit, Inject } from '@angular/core';
import { InfPersoInscMembService, Membre } from './../services/inf-perso-insc-memb.service';
import { InformationService } from './../services/information.service';
import { AuthService } from './../services/auth-service';
import {Observable} from 'rxjs/Observable';
import { NgStyle } from '@angular/common';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';



@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  providers: [InformationService]
})
export class HomeComponent implements OnInit {
  nom: string;
  adresse: string;
  courriel: string;
  _envoieCourriel: string;
  infoMembre: Membre;
  typeAbonement: string;
  liste = [];
  etat = 'liste';
  telephone: string;
  profession?: string;
  dateNaissance?: string;
  typeCotisation?: string;
  courrielConjouint?: string;
  teleList?: boolean;
  nomListe?: boolean;
  animExc?: boolean;
  recenNoel?: boolean;
  animKio?: boolean;
  consAdm?: boolean;
  redacRevi?: boolean;
  promoPubli?: boolean;
  tabRolePerso: Array<string>;
  tabRoleCOO: Array<Array<string>>;
  tabRoleTotal: Array<number>;
  tabRole: Array<string>;
  position = 'above';
  animal: string;
  name: string;
  etatAdmin= 'admin';
  constructor(private memb: InfPersoInscMembService, private se: AuthService, private inf: InformationService, public dialog: MatDialog) { }

  ngOnInit() {

    this.trouverUser();
    this.trouverRole();
  }
  openDialog(): void {
    let dialogRef = this.dialog.open(DialogOverviewExampleDialog, {
      width: '500px',
      data: { name: this.name, animal: this.animal }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.animal = result;
    });
  }
  trouverUser() {
    let user: Observable<firebase.User>;
    user = this.se.user.map(
      x => {
        this.trouverInfMembre(x.email);
     //   console.log('user' , x.email);
        return x;
      }
    );
    user.subscribe(x => {
      this.trouverInfMembre(x.email);
      this.courriel = x.email;
      // this.trouverUid(x.email);
    });
  }
  trouverInfMembre(courriel: string) {
    this.memb.trouverInfMembre(courriel).subscribe(x => { // this.infoMembre = x[0];
        const data = x[0];
        this.infoMembre = data['data'];
        this.nom = this.infoMembre.prenom + ' ' + this.infoMembre.nom;
        this.adresse = this.infoMembre.adresse + ' ' + this.infoMembre.ville + ' ' + this.infoMembre.codePostal;
        this.typeAbonement = this.infoMembre.typeCotisation;
        this.telephone = '(' + this.infoMembre.telephone.substring(0, 3) + ') ' + this.infoMembre.telephone.substring(3, 6) + '-' + this.infoMembre.telephone.substring(6, 10);
        this.profession = this.infoMembre.profession;
        this.dateNaissance = this.infoMembre.dateNaissance;
      }
    )
  }
  trouverRole() {

    this.tabRolePerso = [];
    this.tabRoleCOO = [];
    this.tabRole = [];
    this.tabRoleTotal = [];
    this.inf.infoRole.subscribe( x => {
      const temp = x['tabRole'];
      temp.forEach( y => {
        let tab: Array<string>;
        let obj: object;
        tab = [];
        obj = {};
        const temp2 = x[y];
        temp2.forEach( q => {
          if (this.courriel === q) {
            this.tabRolePerso.push(y);
          }
          this.memb.trouverInfMembre(q).subscribe( z => {
            const tabnom = z[0];
            const nom = tabnom['data'];
            tab.push(nom.prenom + ' ' + nom.nom);
          }
          );
        });
        this.tabRole.push(y);
        obj[y] = tab;
        this.tabRoleCOO.push(tab);
      });

       console.log('ici' , this.tabRoleCOO);
      console.log('ici' , this.tabRoleTotal);
    })
  }
  envoieCourriel(e: any) {
    this.etat = e[0];
    this._envoieCourriel = e[1];
  }
  envoie(e: any) {
    this.etat = e;
  }
  test() {
    console.log('test');
    this.tabRoleCOO.forEach( a => {
      console.log('a' , a);
      a.forEach( b => {
        console.log('b' , b)
      })
   //   this.tabRoleTotal.push(a.length);
    })
  }
  selectedTab(a: any){
    if ( a.index === 3) {
      this.etatAdmin = 'admin';
    } else if (a.index === 1) {
      this.etatAdmin = 'liste';
    } else {
      this.etatAdmin = '';
    }
    console.log(this.etatAdmin);
  }

}


@Component({
  selector: 'dialog-overview-example-dialog',
  templateUrl: 'dialog-overview-example-dialog.html',
  styleUrls: ['./home.component.css']
})
export class DialogOverviewExampleDialog {
etat = 'overviewEdit';
  constructor(
    public dialogRef: MatDialogRef<DialogOverviewExampleDialog>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  onNoClick(): void {
    this.dialogRef.close();
  }


}
