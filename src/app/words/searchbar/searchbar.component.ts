import { Component, inject, input, signal } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { ActivatedRoute, Params, Router, RouterLink } from "@angular/router";
import { AuthService } from "../../auth/auth.service";

@Component({
    selector: "app-searchbar",
    standalone: true,
    imports: [FormsModule, RouterLink],
    templateUrl: "./searchbar.component.html",
    styleUrl: "./searchbar.component.css",
})
export class SearchbarComponent {
    private router = inject(Router);
    private activatedRoute = inject(ActivatedRoute);
    private authService = inject(AuthService);

    languageId = input.required<string | null>();
	languageName = input.required<string | undefined>();
    search = signal<string>("");
    authenticated = this.authService.isAuthenticated;

    onTextChanged() {
        if (this.search() === "") {
            this.refreshPage();
        }
    }

    onSubmit() {
        this.refreshPage();
    }

    refreshPage() {
        const queryParams: Params = { search: this.search() };

        this.router.navigate([], {
            relativeTo: this.activatedRoute,
            queryParams,
            queryParamsHandling: "merge"
        });
    }
}
