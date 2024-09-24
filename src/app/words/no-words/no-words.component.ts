import { Component, inject } from "@angular/core";
import { AuthService } from "../../auth/auth.service";
import { RouterLink } from "@angular/router";

@Component({
    selector: "app-no-words",
    standalone: true,
    imports: [RouterLink],
    templateUrl: "./no-words.component.html",
    styleUrl: "./no-words.component.css",
})
export class NoWordsComponent {
	private authService = inject(AuthService);

	authenticated = this.authService.isAuthenticated;
}
