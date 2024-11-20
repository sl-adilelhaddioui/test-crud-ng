import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { BrowserAnimationsModule, NoopAnimationsModule } from '@angular/platform-browser/animations';
import { RequestsService } from '../services/requests.service';

@Component({
  selector: 'app-dialog-form',
  standalone: true,
  imports: [
    MatDialogModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatButtonModule,
    MatInputModule,
  ],
  templateUrl: './dialog-form.component.html',
  styleUrl: './dialog-form.component.scss'
})
export class DialogFormComponent {
  private fb = inject(FormBuilder); 
  private dialogRef = inject(MatDialogRef<DialogFormComponent>); // Inject MatDialogRef to close the dialog
  form!: FormGroup;
  private requestsService = inject(RequestsService);
  data = inject(MAT_DIALOG_DATA);

  constructor() {
    this.form = this.fb.group({
      name: [this.data?.request.name, Validators.required],
      user: [this.data?.request.user, Validators.required],
      contract: [this.data?.request.contract,],
    });
  }

  onSubmit(): void {
    if(this.data) {
      this.requestsService.editRequest(this.data.request, this.form.value);
    } else {
      this.requestsService.addRequest(this.form.value);
    }
    this.dialogRef.close(); 
  }

  onClose(): void {
    this.dialogRef.close(); 
  }
}
