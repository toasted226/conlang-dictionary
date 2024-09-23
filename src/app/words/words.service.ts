import { inject, Injectable, signal } from "@angular/core";
import { Word, WordData } from "./words.model";
import { HttpClient } from "@angular/common/http";
import { tap } from "rxjs";

@Injectable({
    providedIn: "root",
})
export class WordsService {
    private words = signal<Word[]>([]);
    allWords = this.words.asReadonly();

    private httpClient = inject(HttpClient);

    getWords(languageId: string, search?: string) {
        let searchQuery = "";
        if (search) {
            searchQuery = `/?search=${search}`;
        }

        return this.httpClient
            .get<Word[]>(
                "http://localhost:5000/api/v1/words/" + languageId + searchQuery
            )
            .pipe(
                tap({
                    next: (words) => {
                        this.words.set(words);
                    },
                    error: (err) => {
                        console.log(err);
                    },
                })
            );
    }

    newWord(languageId: string, word: WordData) {
        return this.httpClient
            .post(`http://localhost:5000/api/v1/words/${languageId}`, word, {
                withCredentials: true,
            })
            .pipe(
                tap({
                    error: (err) => {
                        console.log(err);
                    },
                })
            );
    }
}
