import {
    Component,
    computed,
    DestroyRef,
    inject,
    OnInit,
    signal,
} from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { LanguagesService } from "../../languages/languages.service";
import {
    FormControl,
    FormGroup,
    ReactiveFormsModule,
    Validators,
} from "@angular/forms";

@Component({
    selector: "app-edit-language",
    standalone: true,
    imports: [ReactiveFormsModule],
    templateUrl: "./edit-language.component.html",
    styleUrl: "./edit-language.component.css",
})
export class EditLanguageComponent implements OnInit {
    form = new FormGroup({
        languageName: new FormControl("", {
            validators: [Validators.required],
        }),
    });

	private router = inject(Router);
    private activatedRoute = inject(ActivatedRoute);
    private languagesService = inject(LanguagesService);
    private destroyRef = inject(DestroyRef);

    languageId = signal<string>("1");
    languageName = computed(
        () =>
            this.languagesService
                .allLanguages()
                .find((l) => l.language_id.toString() === this.languageId())
                ?.name
    );

    ngOnInit(): void {
        this.activatedRoute.paramMap.subscribe({
            next: (params) => {
                this.languageId.set(
                    params.get("languageId") ? params.get("languageId")! : "1"
                );
            },
        });
    }

    onSubmit() {
        if (!this.form.valid) {
            return;
        }

        const putSub = this.languagesService
            .updateLanguage(
                this.languageId(),
                this.form.controls.languageName.value!
            )
            .subscribe({
                error: (err) => {
                    // Handle errors
                },
            });

        this.destroyRef.onDestroy(() => {
            putSub.unsubscribe();
        });
    }

    onDelete() {
        const deleteSub = this.languagesService
            .deleteLanguage(this.languageId())
            .subscribe({
				error: (err) => {
					// Handle errors
				}
			});
			
		this.destroyRef.onDestroy(() => {
			deleteSub.unsubscribe();
		});

		setTimeout(() => {
			this.router.navigateByUrl(this.router.parseUrl(""));
		}, 10);		
    }
}
