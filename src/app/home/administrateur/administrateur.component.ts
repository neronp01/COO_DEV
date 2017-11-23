import { Component, OnInit, Input, Inject } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import 'rxjs/add/operator/startWith';
import 'rxjs/add/observable/merge';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/observable/fromEvent';

@Component({
  selector: 'app-administrateur',
  templateUrl: './administrateur.component.html',
  styleUrls: ['./administrateur.component.css']
})

export class AdministrateurComponent implements OnInit {
@ Input () etat: string;
courriel: string;
  animal: string;
  name: string;
  constructor(public dialog: MatDialog) { }

  ngOnInit() {
    console.log('ICI' , this.etat)

  }
  openDialog(): void {
    const dialogRef = this.dialog.open(DialogAdmin, {
      width: '650px',
      data: { name: this.name, animal: this.animal }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.animal = result;
    });
  }
  adminEditMemb(e: any) {
this.courriel = e;
this.openDialog();
  }
}

@Component({
  selector: 'dialog-admin',
  templateUrl: 'dialog-admin.html',
  styleUrls: ['./administrateur.component.css']
})
export class DialogAdmin {
  etat = 'overviewEdit';
  constructor(
    public dialogRef: MatDialogRef<DialogAdmin>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  onNoClick(): void {
    this.dialogRef.close();
  }


}
