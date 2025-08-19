import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { JwtModule } from '@auth0/angular-jwt';
import { of } from 'rxjs';
import { HomepageComponent } from './homepage.component';
import { ApiService } from '../service/api.service';


describe('HomepageComponent', () => {
  let component: HomepageComponent;
  let fixture: ComponentFixture<HomepageComponent>;
  let service:ApiService;



  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        HomepageComponent,
        ReactiveFormsModule,
        HttpClientTestingModule,
        JwtModule.forRoot({ config: {} })
      ],
     
    }).compileComponents();

   
    fixture = TestBed.createComponent(HomepageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges(); // ✅ now ngOnInit runs safely
 
  });

 

  it('should create the form with userName control', () => {
    expect(component.userDetails).toBeTruthy();
    expect(component.userDetails.contains('userName')).toBeTrue();
  });



});


