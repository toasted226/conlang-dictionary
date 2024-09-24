import { Component, DestroyRef, inject, OnInit, signal } from "@angular/core";
import { WordsService } from "../../words/words.service";
import { WordData } from "../../words/words.model";
import { ActivatedRoute, Router } from "@angular/router";
import { LanguagesService } from "../../languages/languages.service";
import { FormsModule } from "@angular/forms";

@Component({
    selector: "app-edit-word",
    standalone: true,
    imports: [FormsModule],
    templateUrl: "./edit-word.component.html",
    styleUrl: "./edit-word.component.css",
})
export class EditWordComponent implements OnInit {
    private languagesService = inject(LanguagesService);
    private wordsService = inject(WordsService);
    private activatedRoute = inject(ActivatedRoute);
	private router = inject(Router);
    private destroyRef = inject(DestroyRef);

    languageId = signal<string | undefined>("");
    wordId = signal<string | undefined>("");

    languageName = signal<string | undefined>("");

	creationMessage = signal("");

    word = signal<WordData>({
        word: "",
        phonetic_transcription: "",
        translation: "",
        part_of_speech: "",
        example: "",
        example_translation: "",
    });

    ngOnInit(): void {
        const paramSub = this.activatedRoute.paramMap.subscribe({
            next: (params) => {
                this.languageId.set(params.get("languageId")!);
                this.wordId.set(params.get("wordId")!);
                this.refreshData();
            },
        });

        this.destroyRef.onDestroy(() => paramSub.unsubscribe());
    }

    refreshData() {
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

        this.wordsService.getWords(this.languageId()!).subscribe({
            next: () => {
                const fullWord = this.wordsService
                    .allWords()
                    .find((w) => w.word_id.toString() === this.wordId())!;

                let ipa = fullWord.phonetic_transcription;
                // Remove slashes from beginning and end
                if (ipa.length > 2) {
                    ipa = ipa.substring(1, ipa.length - 1);
                }

                this.word.set({
                    word: fullWord.word,
                    phonetic_transcription: ipa,
                    translation: fullWord.translation,
                    part_of_speech: fullWord.part_of_speech,
                    example: fullWord.example,
                    example_translation: fullWord.example_translation,
                });
            },
        });
    }

    onSubmit() {
        if (
            this.word().word === "" ||
            this.word().part_of_speech === "" ||
            this.word().translation === ""
        ) {
			return;
        }

		let editedWord = this.word();

		if (this.word().phonetic_transcription.length > 0) {
			const ipa = "/" + this.word().phonetic_transcription + "/";
			editedWord = {
				word: this.word().word,
				part_of_speech: this.word().part_of_speech,
				translation: this.word().translation,
				phonetic_transcription: ipa,
				example: this.word().example,
				example_translation: this.word().example_translation
			};
		}

		const subscription = this.wordsService.updateWord(this.languageId()!, this.wordId()!, editedWord).subscribe({
			error: (err) => {
				// Handle errors
			}
		});

		this.creationMessage.set(`Updated word`);
		setTimeout(() => this.creationMessage.set(""), 2000);

		this.destroyRef.onDestroy(() => subscription.unsubscribe());
    }

    onDelete() {
		const subscription = this.wordsService.deleteWord(this.languageId()!, this.wordId()!).subscribe({
			next: () => {
				setTimeout(() => {
					this.router.navigateByUrl(this.router.parseUrl(`/languages/${this.languageId()}`));
				}, 10);
			},
			error: (err) => {
				// Handle errors
			}
		});

		this.destroyRef.onDestroy(() => subscription.unsubscribe());
	}
}
