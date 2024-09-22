import { Component, DestroyRef, inject } from "@angular/core";
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms";
import { LanguagesService } from "../../languages/languages.service";

@Component({
    selector: "app-new-language",
    standalone: true,
    imports: [ReactiveFormsModule],
    templateUrl: "./new-language.component.html",
    styleUrl: "./new-language.component.css",
})
export class NewLanguageComponent {
	form = new FormGroup({
		languageName: new FormControl("", {
			validators: [Validators.required]
		})
	});

	private languagesService = inject(LanguagesService);
	private destroyRef = inject(DestroyRef);

	onSubmit() {
		if (!this.form.valid) {
			return;
		}

		if (this.form.controls.languageName !== null) {
			const postSub = this.languagesService.newLanguage(this.form.value.languageName!).subscribe({
				error: (err) => {
					// Handle errors
				}
			});

			const getSub = this.languagesService.getLanguages().subscribe({
				error: (err) => {
					// Handle errors
				}
			});

			this.destroyRef.onDestroy(() => {
				postSub.unsubscribe();
				getSub.unsubscribe();
			});
		}
	}
}
