import { Component, DestroyRef, inject, OnInit } from "@angular/core";
import { LanguagesService } from "../languages.service";
import { LanguageComponent } from "../language/language.component";

@Component({
    selector: "app-language-list",
    standalone: true,
    imports: [LanguageComponent],
    templateUrl: "./language-list.component.html",
    styleUrl: "./language-list.component.css",
})
export class LanguageListComponent implements OnInit {
    private languagesService = inject(LanguagesService);
    private destroyRef = inject(DestroyRef);

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
