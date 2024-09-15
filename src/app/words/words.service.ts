import { inject, Injectable, signal } from "@angular/core";
import { Word } from "./words.model";
import { HttpClient } from "@angular/common/http";
import { tap } from "rxjs";

@Injectable({
    providedIn: "root",
})
export class WordsService {
    words = signal<Word[]>([]);
    private allWords = this.words.asReadonly();

    private httpClient = inject(HttpClient);

    getWords(languageId: string) {
        return this.httpClient
            .get<Word[]>("http://localhost:5000/api/v1/words/" + languageId)
            .pipe(
				tap({
					next: (words) => {
						this.words.set(words);
					},
					error: (err) => {
						console.log(err);
					}
				})
			);
    }
}
