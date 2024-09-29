import { Component, inject, input, OnInit, signal } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { ActivatedRoute, Params, Router, RouterLink } from "@angular/router";
import { AuthService } from "../../auth/auth.service";
import { LanguagesService } from "../../languages/languages.service";

@Component({
    selector: "app-searchbar",
    standalone: true,
    imports: [FormsModule, RouterLink],
    templateUrl: "./searchbar.component.html",
    styleUrl: "./searchbar.component.css",
})
export class SearchbarComponent implements OnInit {
    private router = inject(Router);
    private activatedRoute = inject(ActivatedRoute);
    private authService = inject(AuthService);
    private languagesService = inject(LanguagesService);

    languageId = signal<string | null>("");
    languageName = signal<string | undefined>("");
    search = signal<string>("");
    authenticated = this.authService.isAuthenticated;

    ngOnInit(): void {
        this.activatedRoute.paramMap.subscribe({
            next: (params) => {
                this.languageId.set(params.get("languageId"));
                this.languagesService.getLanguages().subscribe({
                    next: () => {
                        this.languageName.set(
                            this.languagesService
                                .allLanguages()
                                .find(
                                    (l) =>
                                        l.language_id.toString() ===
                                        this.languageId()
                                )?.name
                        );
                    },
                });
            },
        });
    }

    onTextChanged() {
        if (this.search() === "") {
            this.refreshPage();
        }
    }

    onSubmit() {
        this.refreshPage();
    }

    refreshPage() {
        const queryParams: Params = {
            search: this.search(),
        };

        this.router.navigate([], {
            relativeTo: this.activatedRoute,
            queryParams,
            queryParamsHandling: "merge",
        });
    }
}
