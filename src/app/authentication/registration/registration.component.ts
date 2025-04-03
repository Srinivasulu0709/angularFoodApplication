import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ApiService } from '../../service/api.service';

@Component({
  selector: 'app-registration',
  imports: [ReactiveFormsModule,CommonModule],
  templateUrl: './registration.component.html',
  styleUrl: './registration.component.scss'
})
export class RegistrationComponent implements OnInit  {

  registrationForm!: FormGroup;
  submitted:boolean = false;
  message:string = '';

  constructor(private fb:FormBuilder,private apiservice:ApiService) {}

  ngOnInit() {
    this.registrationForm = this.fb.group({
      username:['',Validators.required],
      email:['',[Validators.required, Validators.email]],
      password:['',[Validators.required, Validators.minLength(8)]],
      passwordConfirm:['',[Validators.required, Validators.minLength(8)]]
    },  { validator: this.passwordMatchValidator });

    this.getData();
  }

  getData() {
    this.apiservice.fetchData().subscribe(data => {
      console.log("data",data)
    })
  }
  passwordMatchValidator(form: FormGroup) {
    const password = form.get('password')?.value;
    const passwordConfirm = form.get('passwordConfirm')?.value;
    return password === passwordConfirm ? null : { mismatch: true };
  }

  onSubmit() {
    this.submitted = true;
    if(this.registrationForm.valid) {
      this.apiservice.createData(this.registrationForm.value).subscribe(res => {
        console.log("Response from API:", res);
        this.message = res.data 
      },
      error => {
        this.message = error.error.message
      }
    )
    }
   
  }

}
