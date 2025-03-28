import { Component, OnInit } from '@angular/core';
import { Form, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  submitted = false;
  loginForm: FormGroup;

  constructor(private fb: FormBuilder, private router: Router) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }
  
  ngOnInit(): void {
    
  }

  onSubmit() {
    this.submitted = true;
    
    if (this.loginForm.valid) {
      console.log("Login Successful", this.loginForm.value);
      alert("Logged In Successfully!");

      // Navigate to User Form on success
      this.router.navigate(['/userform']);
    }
  }
}
