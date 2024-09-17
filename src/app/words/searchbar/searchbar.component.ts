import { Component, inject, input, signal } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { ActivatedRoute, Params, Router } from "@angular/router";

@Component({
    selector: "app-searchbar",
    standalone: true,
    imports: [FormsModule],
    templateUrl: "./searchbar.component.html",
    styleUrl: "./searchbar.component.css",
})
export class SearchbarComponent {
	languageName = input.required<string | undefined>();
    search = signal<string>("");

    private router = inject(Router);
    private activatedRoute = inject(ActivatedRoute);

    onSubmit() {
        const queryParams: Params = { search: this.search() };

        this.router.navigate([], {
            relativeTo: this.activatedRoute,
            queryParams,
            queryParamsHandling: "merge"
        });
    }
}
