import {
    ChangeDetectionStrategy,
    Component,
    DestroyRef,
    inject,
    OnInit,
    signal,
} from "@angular/core";
import { SearchbarComponent } from "../searchbar/searchbar.component";
import { LanguagesService } from "../../languages/languages.service";
import { ActivatedRoute, RouterLink } from "@angular/router";
import { WordsService } from "../words.service";
import { WordComponent } from "../word/word.component";
import { AuthService } from "../../auth/auth.service";

@Component({
    selector: "app-words-list",
    standalone: true,
    imports: [SearchbarComponent, WordComponent, RouterLink],
    templateUrl: "./words-list.component.html",
    styleUrl: "./words-list.component.css",
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WordsListComponent implements OnInit {
    private languagesService = inject(LanguagesService);
    private wordsService = inject(WordsService);
    private authService = inject(AuthService);
    private destroyRef = inject(DestroyRef);
    private activatedRoute = inject(ActivatedRoute);

    languageId = signal<string | null>("1");
    languageName = signal<string | undefined>("");
    words = this.wordsService.allWords;
    authenticated = this.authService.isAuthenticated;

    ngOnInit(): void {
        const paramSub = this.activatedRoute.paramMap.subscribe({
            next: (params) => {
                this.languageId.set(params.get("languageId"));
                this.onLanguageIdUpdate();
            },
        });

        const querySub = this.activatedRoute.queryParamMap.subscribe({
            next: (queryParams) => {
                const search = queryParams.get("search");
                if (search) {
                    this.onLanguageIdUpdate(search);
                } else {
                    this.onLanguageIdUpdate();
                }
            }
        });

        this.destroyRef.onDestroy(() => {
            paramSub.unsubscribe();
            querySub.unsubscribe();
        });
    }

    onLanguageIdUpdate(searchTerm?: string) {
        if (this.languageId() === null) {
            return;
        }

        const subscription = this.wordsService
            .getWords(this.languageId()!, searchTerm)
            .subscribe({
                error: (err) => {
                    // handle error
                },
            });

        this.destroyRef.onDestroy(() => subscription.unsubscribe());

        this.languageName.set(
            this.languagesService
                .allLanguages()
                .find((l) => l.language_id.toString() === this.languageId()!)
                ?.name
        );
    }
}
