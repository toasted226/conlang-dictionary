import { HttpClient } from "@angular/common/http";
import { DestroyRef, inject, Injectable, OnInit, signal } from "@angular/core";
import { Language } from "./languages.model";
import { tap } from "rxjs";
import { apiEndpoint } from "../app.config";

@Injectable({
    providedIn: "root",
})
export class LanguagesService {
    private languages = signal<Language[]>([]);
    allLanguages = this.languages.asReadonly();

    private httpClient = inject(HttpClient);
	private destroyRef = inject(DestroyRef);

	private refreshLanguages() {
		const subscription = this.getLanguages().subscribe();
		this.destroyRef.onDestroy(() => subscription.unsubscribe());
	}

    getLanguages() {
        return this.httpClient
            .get<Language[]>(apiEndpoint + "/languages/")
            .pipe(
                tap({
                    next: (languages) => {
                        this.languages.set(languages);
                    },
                    error: (err) => {
                        console.log(err);
                    },
                })
            );
    }

    newLanguage(name: string) {
        return this.httpClient
            .post(
                apiEndpoint + "/languages",
                { name },
                { withCredentials: true }
            )
            .pipe(
                tap({
					next: () => {
						this.refreshLanguages();
					},
                    error: (err) => {
                        console.log(err);
                    },
                })
            );
    }

    updateLanguage(id: string, name: string) {
        return this.httpClient.put(
            `${apiEndpoint}/languages/${id}`,
            { name },
            { withCredentials: true }
        )
		.pipe(
			tap({
				next: () => {
					this.refreshLanguages();
				},	
				error: (err) => {
					console.log(err);
				}
			})
		);
    }

	deleteLanguage(id: string) {
        return this.httpClient.delete(
            `${apiEndpoint}/languages/${id}`,
            { withCredentials: true }
        )
		.pipe(
			tap({
				next: () => {
					this.refreshLanguages();
				},	
				error: (err) => {
					console.log(err);
				}
			})
		);
	}
}
