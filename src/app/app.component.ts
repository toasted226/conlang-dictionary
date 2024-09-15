import { Component } from "@angular/core";
import { RouterOutlet } from "@angular/router";
import { HeaderComponent } from "./header/header.component";
import { LanguageListComponent } from "./languages/language-list/language-list.component";

@Component({
    selector: "app-root",
    standalone: true,
    imports: [RouterOutlet, HeaderComponent, LanguageListComponent],
    templateUrl: "./app.component.html",
    styleUrl: "./app.component.css",
})
export class AppComponent {
    title = "conlang-dictionary";
}
