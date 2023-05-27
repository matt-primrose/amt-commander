import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AddDeviceComponent } from './add-device.component';
import { AppModule } from 'src/app/app.module';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

describe('AddDeviceComponent', () => {
  let component: AddDeviceComponent;
  let fixture: ComponentFixture<AddDeviceComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [AppModule],
      declarations: [AddDeviceComponent],
      providers: [
        { provide: MatDialogRef, useValue: {} },
        { provide: MAT_DIALOG_DATA, useValue: {}}
      ]
    }).compileComponents();
    fixture = TestBed.createComponent(AddDeviceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
