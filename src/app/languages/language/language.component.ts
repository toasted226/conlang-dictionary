import { Component, inject, input } from "@angular/core";
import { Language } from "../languages.model";
import { RouterLink, RouterLinkActive } from "@angular/router";
import { AuthService } from "../../auth/auth.service";

@Component({
    selector: "app-language",
    standalone: true,
    imports: [RouterLink, RouterLinkActive],
    templateUrl: "./language.component.html",
    styleUrl: "./language.component.css",
})
export class LanguageComponent {
    private authService = inject(AuthService);

	language = input.required<Language>();
    authenticated = this.authService.isAuthenticated;
}
