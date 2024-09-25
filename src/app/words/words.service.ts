import { inject, Injectable, signal } from "@angular/core";
import { Word, WordData } from "./words.model";
import { HttpClient } from "@angular/common/http";
import { tap } from "rxjs";
import { apiEndpoint } from "../app.config";

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
                apiEndpoint + "/words/" + languageId + searchQuery
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
            .post(`${apiEndpoint}/words/${languageId}`, word, {
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

    updateWord(languageId: string, wordId: string, word: WordData) {
        return this.httpClient
            .put(
                `${apiEndpoint}/words/${languageId}/${wordId}`,
                word,
                {
                    withCredentials: true,
                }
            )
            .pipe(
                tap({
                    error: (err) => {
                        console.log(err);
                    },
                })
            );
    }

    deleteWord(languageId: string, wordId: string) {
        return this.httpClient.delete(
            `${apiEndpoint}/words/${languageId}/${wordId}`,
            { withCredentials: true }
        )
        .pipe(
            tap({
                error: (err) => {
                    console.log(err);
                }
            })
        );
    }
}
