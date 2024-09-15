import { Component, input } from "@angular/core";
import { Language } from "../languages.model";
import { RouterLink, RouterLinkActive } from "@angular/router";

@Component({
    selector: "app-language",
    standalone: true,
    imports: [RouterLink, RouterLinkActive],
    templateUrl: "./language.component.html",
    styleUrl: "./language.component.css",
})
export class LanguageComponent {
	language = input.required<Language>();
}
