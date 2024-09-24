import { Component, inject, input } from "@angular/core";
import { Word } from "../words.model";
import { AuthService } from "../../auth/auth.service";
import { RouterLink } from "@angular/router";

@Component({
    selector: "app-word",
    standalone: true,
    imports: [RouterLink],
    templateUrl: "./word.component.html",
    styleUrl: "./word.component.css",
})
export class WordComponent {
    private authService = inject(AuthService);

    authenticated = this.authService.isAuthenticated;
	word = input.required<Word>();
}
