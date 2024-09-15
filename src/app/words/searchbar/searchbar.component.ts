import { Component, input } from "@angular/core";

@Component({
    selector: "app-searchbar",
    standalone: true,
    imports: [],
    templateUrl: "./searchbar.component.html",
    styleUrl: "./searchbar.component.css",
})
export class SearchbarComponent {
	languageName = input.required<string | undefined>();
}
