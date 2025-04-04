import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ApiService } from '../../service/api.service';
import { User } from '../../interface/user';
import { Router } from '@angular/router';

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

  constructor(private fb:FormBuilder,private apiservice:ApiService,private router:Router) {}

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

  navigateLogin() {
    this.router.navigate(['/login']);
  }

  onSubmit() {
    this.submitted = true;
    if(this.registrationForm.valid) {

      const userData:User = this.registrationForm.value;

      this.apiservice.createData(userData).subscribe({
        next:(res) => {
          this.message = res.data 
        },
        error:(err) => {
         const apiMessage = err.error?.message;

         if(apiMessage?.includes("already registerd") || apiMessage?.includes("Duplicate")) {
          this.message = "This email is already in use. Please try another.";
         }
          
        }
      });
    }
  }

}
