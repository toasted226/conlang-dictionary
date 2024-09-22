import { Component, DestroyRef, inject, OnInit } from "@angular/core";
import { LanguagesService } from "../languages.service";
import { LanguageComponent } from "../language/language.component";
import { AuthService } from "../../auth/auth.service";
import { RouterLink, RouterLinkActive } from "@angular/router";

@Component({
    selector: "app-language-list",
    standalone: true,
    imports: [LanguageComponent, RouterLink, RouterLinkActive],
    templateUrl: "./language-list.component.html",
    styleUrl: "./language-list.component.css",
})
export class LanguageListComponent implements OnInit {
    private authService = inject(AuthService);
    private languagesService = inject(LanguagesService);
    private destroyRef = inject(DestroyRef);

    authenticated = this.authService.isAuthenticated;
    languages = this.languagesService.allLanguages;

    ngOnInit(): void {
        const subscription = this.languagesService.getLanguages().subscribe({
			error: (err) => {
				// handle error
			}
		});

		this.destroyRef.onDestroy(() => subscription.unsubscribe());
    }
}
