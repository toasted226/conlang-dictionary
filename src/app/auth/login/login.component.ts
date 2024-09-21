import { Component } from '@angular/core';
import { ModalComponent } from "../../shared/modal/modal.component";

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ModalComponent],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

}
