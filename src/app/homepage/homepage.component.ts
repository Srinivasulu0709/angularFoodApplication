import { Component, OnInit } from '@angular/core';
import { ApiService } from '../service/api.service';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { country, State } from '../interface/state';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-homepage',
  imports: [ReactiveFormsModule,FormsModule,CommonModule],
  templateUrl: './homepage.component.html',
  styleUrl: './homepage.component.scss'
})
export class HomepageComponent implements OnInit {

  userDetails!:FormGroup;
  countries:country[] = [];
  states:State[] = [];
  isSubmitted:boolean = false;
  tableData:any[] = [];

  selectedCountry:String = '';
  selectedState:String = '';
   editIndex: number | null = null;


  constructor(private apiservice:ApiService, private fb:FormBuilder) {
     this.userDetails = this.fb.group({
      userName:[''],
      regNumber:[],
      state:[{ value: '', disabled: true }],
      country:[]
    })
  }

  ngOnInit(): void {
    this.getCountyDetails()
  }

 getCountyDetails() {
  this.apiservice.fetchCountryList().subscribe(res => {
    this.countries = res.data;
  })
 }

 onCountryChange(event: Event) {
   const selectedIso3 = (event.target as HTMLSelectElement).value;
    const selectedCountry = this.countries.find(c => c.iso3 === selectedIso3);
    this.states = selectedCountry ? selectedCountry.states : [];
    this.userDetails.patchValue({ state: '' });

    if (this.states.length) {
      this.userDetails.get('state')?.enable();
      } else {
        this.userDetails.get('state')?.disable();
      }
  }

 trackByCountry(index:number,country:country)  {
  return country.iso3;
 }

 trackByState(index:number, state:State) {
  return state.state_code;
 }

 onSubmit() {
  if(this.userDetails.valid) {
    this.tableData.push(this.userDetails.value)
    this.userDetails.reset();
     this.userDetails.get('state')?.disable();
  }

  console.table("table",this.tableData)
 }

 onEdit(index:number) {
  this.editIndex = index;
  this.userDetails.patchValue(this.tableData[index])
 }

 deleteRow(index:number) {
  this.tableData.splice(index,1)
 }

 resetFroms() {
  this.isSubmitted = true;
  this.userDetails.reset();
 }

  logout() {
    this.apiservice.logout();
  }
}
