import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SignupService } from 'src/app/Services/signup.service';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  signupForm: FormGroup;
  horizontalPosition: MatSnackBarHorizontalPosition = 'right';
  verticalPosition: MatSnackBarVerticalPosition = 'bottom';
  constructor(private fBuilder: FormBuilder, private signupService: SignupService,
    private router: Router, private snackBar: MatSnackBar) {
    this.signupForm = fBuilder.group({
      fullName: [null, [Validators.required, Validators.pattern('[A-Za-z ]{3,32}')]],
      email: [null, [Validators.required, Validators.email]],
    
      password: [null, [Validators.required]],
    })
  }
  ngOnInit(): void {
  }
  signUp() {
    this.signupService.signUp(this.signupForm.value).subscribe(
      {
        next: (res) => {
            this.snackBar.open('Signed Up successfully', 'Close', {
              duration: 5000,
              horizontalPosition: this.horizontalPosition,
              verticalPosition: this.verticalPosition,
            });
            this.signupForm.reset();
            this.router.navigate(['Login']);
        },
        error: () => {
          this.snackBar.open('Something went wrong!!', 'Close', {
            duration: 5000,
            horizontalPosition: this.horizontalPosition,
            verticalPosition: this.verticalPosition,
            panelClass: ["snack-style"]
          });
        }
      }
    )
  }
}
