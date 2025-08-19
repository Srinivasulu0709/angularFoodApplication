import { TestBed } from '@angular/core/testing';

import { ApiService } from './api.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { JwtModule } from '@auth0/angular-jwt';

describe('ApiService', () => {
  let service: ApiService;
    let httpmock:HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports:[HttpClientTestingModule,
        JwtModule.forRoot({ config: {} })
      ],
       providers:[ApiService]
    });
    service = TestBed.inject(ApiService);
    httpmock = TestBed.inject(HttpTestingController);
  });

   afterEach(() => {
    httpmock.verify();
  })

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('fetch data using GET', ()=> {
  const mockResponse = [
    {
      "name": "Afghanistan",
      "iso3": "AFG",
      "iso2": "AF",
      "states": [
        {
          "name": "Badakhshan",
          "state_code": "BDS"
        }
      ],
    },
  ];

  service.fetchCountryList().subscribe(data => {
    expect(data).toBe(mockResponse)
  });

  const req = httpmock.expectOne(service.apiUrlCountry);
  expect(req.request.method).toBe('GET');
  req.flush(mockResponse);

})
});
