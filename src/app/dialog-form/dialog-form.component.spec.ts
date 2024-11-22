import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogFormComponent } from './dialog-form.component';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { RequestsService } from '../services/requests.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';

describe('DialogFormComponent', () => {
  let component: DialogFormComponent;
  let fixture: ComponentFixture<DialogFormComponent>;

  let mockDialogRef: jasmine.SpyObj<MatDialogRef<DialogFormComponent>>;
  let mockRequestsService: jasmine.SpyObj<RequestsService>;
  const mockDialogData = { request: { name: 'Test Name', user: 'Test User', contract: 123 } };

  beforeEach(async () => {
    mockDialogRef = jasmine.createSpyObj('MatDialogRef', ['close']);
    mockRequestsService = jasmine.createSpyObj('RequestsService', ['editRequest', 'addRequest']);

    await TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,
        MatFormFieldModule,
        MatButtonModule,
        MatInputModule,
        NoopAnimationsModule, // To avoid animations issues during testing
      ],
      declarations: [],
      providers: [
        { provide: MatDialogRef, useValue: mockDialogRef },
        { provide: RequestsService, useValue: mockRequestsService },
        { provide: MAT_DIALOG_DATA, useValue: mockDialogData },
        FormBuilder,
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(DialogFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize the form with the data provided', () => {
    expect(component.form).toBeTruthy();
    expect(component.form.get('name')?.value).toEqual(mockDialogData.request.name);
    expect(component.form.get('user')?.value).toEqual(mockDialogData.request.user);
    expect(component.form.get('contract')?.value).toEqual(mockDialogData.request.contract);
  });

  it('should validate required fields in the form', () => {
    const nameControl = component.form.get('name');
    const userControl = component.form.get('user');

    nameControl?.setValue('');
    userControl?.setValue('');

    expect(nameControl?.valid).toBeFalse();
    expect(userControl?.valid).toBeFalse();
  });

  it('should call editRequest on submit when data is provided', () => {
    component.onSubmit();

    expect(mockRequestsService.editRequest).toHaveBeenCalledWith(
      mockDialogData.request,
      component.form.value
    );
    expect(mockDialogRef.close).toHaveBeenCalled();
  });

  it('should call addRequest on submit when no data is provided', () => {
    component.data = null; // Simulate no data provided
    fixture.detectChanges();

    component.onSubmit();

    expect(mockRequestsService.addRequest).toHaveBeenCalledWith(component.form.value);
    expect(mockDialogRef.close).toHaveBeenCalled();
  });

  it('should close the dialog on onClose', () => {
    component.onClose();
    expect(mockDialogRef.close).toHaveBeenCalled();
  });
});