import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoginService } from 'src/app/Services/login.service';
import {
  MatSnackBar, MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar'
import { Router } from '@angular/router';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  horizontalPosition: MatSnackBarHorizontalPosition = 'right';
  verticalPosition: MatSnackBarVerticalPosition = 'bottom';

  constructor(private fBuilder: FormBuilder, private _loginService: LoginService,
    private _snackBar: MatSnackBar, private router: Router) {
    this.loginForm = this.fBuilder.group({
      email: [null, [Validators.required, Validators.email]],
      password: [null, [Validators.required, Validators.pattern('/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/')]],
    })
  }
  get email() {
    return this.loginForm.get("email");
  }
  get password() {
    return this.loginForm.get('password');
  }

  ngOnInit(): void {
  }
  login() {
    this._loginService.login().subscribe({
      next: (res) => {
        const user = res.find((item: any) => {
          return item.email === this.loginForm.value.email && item.password === this.loginForm.value.password;
        })
        if (user) {
          const newLocal = "Logged In Successfully!";
          this._snackBar.open(newLocal, "Close", {
            duration: 5000,
            horizontalPosition: this.horizontalPosition,
            verticalPosition: this.verticalPosition,
            panelClass: ["style-snack"]
          });
          this.loginForm.reset();
          this.router.navigate(['Home'])
        }
        else {
          this._snackBar.open("User Not Found", "Close", {
            duration: 5000,
            horizontalPosition: this.horizontalPosition,
            verticalPosition: this.verticalPosition,
          });
        }
      }, error: () => {
        this._snackBar.open("Something went wrong", "Close", {
          duration: 5000,
          horizontalPosition: "center",
          verticalPosition: "bottom",
        });
      }
    })
  }
  signup() {
    this.router.navigate(['Signup']);
  }
}
