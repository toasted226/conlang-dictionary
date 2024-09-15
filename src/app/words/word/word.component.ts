import { Component, input } from "@angular/core";
import { Word } from "../words.model";

@Component({
    selector: "app-word",
    standalone: true,
    imports: [],
    templateUrl: "./word.component.html",
    styleUrl: "./word.component.css",
})
export class WordComponent {
	word = input.required<Word>();
}
