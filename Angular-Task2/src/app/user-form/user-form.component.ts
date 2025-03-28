import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.css']
})
export class UserFormComponent implements OnInit {
  userForm!: FormGroup;

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.userForm = this.fb.group({
      name: ['', Validators.required],
      DOB: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phoneNumber: ['', Validators.pattern('^[0-9]{10}$')], // Basic 10-digit phone number validation
      instituteName: [''],
      degree: [''],
      percentage: [null],
      hobbies: this.fb.array([]), // FormArray for checkboxes
      gender: ['', Validators.required],
      address: [''],
      summary: ['']
    });
  }

  onCheckboxChange(e: any) {
    const hobbies: FormArray = this.userForm.get('hobbies') as FormArray;
    if (e.target.checked) {
      hobbies.push(this.fb.control(e.target.value));
    } else {
      const index = hobbies.controls.findIndex(x => x.value === e.target.value);
      hobbies.removeAt(index);
    }
  }

  onSubmit() {
    if (this.userForm.valid) {
      console.log(this.userForm.value);
      // You can now send this data to your backend or perform other actions
    } else {
      // Handle form validation errors
      console.log('Form is invalid. Please check the fields.');
      // You might want to display error messages to the user
    }
  }

  onReset() {
    this.userForm.reset();
    // Reset the hobbies FormArray as well, as reset() might not clear it properly
    const hobbies: FormArray = this.userForm.get('hobbies') as FormArray;
    hobbies.clear();
  }
}