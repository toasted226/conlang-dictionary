import { Component } from '@angular/core';
import { ModalComponent } from '../../shared/modal/modal.component';

@Component({
  selector: 'app-add-language',
  standalone: true,
  imports: [ModalComponent],
  templateUrl: './add-language.component.html',
  styleUrl: './add-language.component.css'
})
export class AddLanguageComponent {

}
