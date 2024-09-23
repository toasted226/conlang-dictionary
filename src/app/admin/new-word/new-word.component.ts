import { Component, DestroyRef, inject, OnInit, signal } from "@angular/core";
import { LanguagesService } from "../../languages/languages.service";
import { WordData } from "../../words/words.model";
import { ActivatedRoute } from "@angular/router";
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms";
import { WordsService } from "../../words/words.service";

@Component({
    selector: "app-new-word",
    standalone: true,
    imports: [ReactiveFormsModule],
    templateUrl: "./new-word.component.html",
    styleUrl: "./new-word.component.css",
})
export class NewWordComponent implements OnInit {
	form = new FormGroup({
		word: new FormControl("", {
			validators: [Validators.required]
		}),
		partOfSpeech: new FormControl("", {
			validators: [Validators.required]
		}),
		translation: new FormControl("", {
			validators: [Validators.required]
		}),
		phoneticTranscription: new FormControl(""),
		example: new FormControl(""),
		exampleTranslation: new FormControl(""),
	});

    private languagesService = inject(LanguagesService);
	private wordsService = inject(WordsService);
    private activatedRoute = inject(ActivatedRoute);
	private destroyRef = inject(DestroyRef);

    languageId = signal<string | undefined>("");
    languageName = signal<string | undefined>("");

	creationMessage = signal<string>("");

    ngOnInit(): void {
        this.activatedRoute.paramMap.subscribe({
            next: (params) => {
                this.languageId.set(
                    params.get("languageId") ? params.get("languageId")! : ""
                );
                this.refreshLanguages();
            },
        });
    }

    refreshLanguages() {
        this.languagesService.getLanguages().subscribe({
            next: () => {
                this.languageName.set(
                    this.languagesService
                        .allLanguages()
                        .find(
                            (l) =>
                                l.language_id.toString() === this.languageId()
                        )?.name
                );
            },
        });
    }

	onSubmit() {
		if (!this.form.valid) {
			return;
		}

		const word: WordData = {
			word: this.form.value.word!,
			part_of_speech: this.form.value.partOfSpeech!,
			translation: this.form.value.translation!,
			phonetic_transcription: this.form.value.phoneticTranscription ? `/${this.form.value.phoneticTranscription!}/` : "",
			example: this.form.value.example ? this.form.value.example! : "",
			example_translation: this.form.value.exampleTranslation ? this.form.value.exampleTranslation! : "",
		};

		const subscription = this.wordsService.newWord(this.languageId()!, word).subscribe({
			next: () => {
				this.creationMessage.set(`Added ${word.word} to ${this.languageName()} dictionary`);
				setTimeout(() => this.creationMessage.set(""), 2000);
				this.form.reset();
			},
			error: (err) => {
				// Handle errors
			}
		});

		this.destroyRef.onDestroy(() => subscription.unsubscribe());
	}
}
