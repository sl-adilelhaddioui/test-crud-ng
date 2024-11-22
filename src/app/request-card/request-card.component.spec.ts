import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RequestCardComponent } from './request-card.component';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { By } from '@angular/platform-browser';
import { Request } from '../app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('RequestCardComponent', () => {
  let component: RequestCardComponent;
  let fixture: ComponentFixture<RequestCardComponent>;

  const mockRequest: Request = {
    name: 'Test Request',
    user: 'Test User',
    contract: 123,
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        MatMenuModule,
        MatButtonModule,
        MatIconModule,
        CommonModule,
        BrowserAnimationsModule
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(RequestCardComponent);
    component = fixture.componentInstance;
    component.request = mockRequest; // Provide mock input data
    fixture.detectChanges(); // Trigger initial change detection
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should render the request details in the template', () => {
    const compiled = fixture.nativeElement as HTMLElement;

    expect(compiled.textContent).toContain(mockRequest.name);
    expect(compiled.textContent).toContain(mockRequest.user);
    expect(compiled.textContent).toContain(String(mockRequest.contract));
  });

  it('should emit requestDelete when the delete action is triggered', () => {
    spyOn(component.requestDelete, 'emit');

    // Find and trigger the delete button/menu option
    const triggerButton = fixture.debugElement.query(By.css('.trigger-btn'));    // Adjust selector as per your template
    triggerButton.triggerEventHandler('click', null);

    const deleteButton = fixture.debugElement.query(By.css('.delete-btn')); // Adjust selector as per your template
    deleteButton.triggerEventHandler('click', null);

    expect(component.requestDelete.emit).toHaveBeenCalledWith(mockRequest);
  });

  it('should emit requestEdit when the edit action is triggered', () => {
    spyOn(component.requestEdit, 'emit');

    // Find and trigger the edit button/menu option
    const triggerButton = fixture.debugElement.query(By.css('.trigger-btn'));    // Adjust selector as per your template
    triggerButton.triggerEventHandler('click', null);

    const editButton = fixture.debugElement.query(By.css('.edit-btn')); // Adjust selector as per your template
    editButton.triggerEventHandler('click', null);

    expect(component.requestEdit.emit).toHaveBeenCalledWith(mockRequest);
  });

  it('should throw an error if "request" input is not provided', () => {
    component.request = undefined as unknown as Request; // Simulate missing input
    expect(() => fixture.detectChanges()).toThrowError(
      /Cannot read properties of undefined/
    );
  });
});
