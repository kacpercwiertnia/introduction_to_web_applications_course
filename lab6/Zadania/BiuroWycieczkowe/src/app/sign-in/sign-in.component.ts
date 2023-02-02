import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent {
  signInForm: FormGroup = this.formBuilder.group({
    email: new FormControl('', Validators.required ),
    password: new FormControl('', Validators.required),
  });
  
  constructor(
    public authService: AuthService,
    private formBuilder : FormBuilder
  ){}

  onSubmit(): void{
    this.authService.SignIn(this.signInForm.value.email, this.signInForm.value.password)
  }
}
