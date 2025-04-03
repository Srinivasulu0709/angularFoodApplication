import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from '../../service/api.service';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule,CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit {

  loginForm!: FormGroup;
  submitted:boolean = false;
  message:string = '';

  constructor(private fb:FormBuilder,private router:Router,private apiService:ApiService){}

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email:['',[Validators.required, Validators.email]],
      password:['',[Validators.required, Validators.minLength(8)]],
    })
  }

  navigateRegister() {
    this.router.navigate(['/register'])
  }

  onSubmit() {
    this.submitted = true;

    if(this.loginForm.valid){
      this.apiService.userLogin(this.loginForm.value).subscribe(res => {
        localStorage.setItem('token',res.token);
        this.message = 'Login succesfully';
      }, err => {
        this.message = err.error.message || 'Login failed'
      }
    )
    }
   
  }

}
