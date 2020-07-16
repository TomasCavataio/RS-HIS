import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { UsersListComponent } from 'src/app/containers/users-list/users-list.component';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss']
})
export class DialogComponent {

  constructor(
    public dialogRef: MatDialogRef<UsersListComponent>,
    @Inject(MAT_DIALOG_DATA) public user: { title: string, body: string }) { }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
