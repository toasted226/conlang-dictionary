import { HttpClient } from "@angular/common/http";
import { inject, Injectable, signal } from "@angular/core";
import { Language } from "./languages.model";
import { tap } from "rxjs";

@Injectable({
    providedIn: "root",
})
export class LanguagesService {
	private languages = signal<Language[]>([]);
	allLanguages = this.languages.asReadonly();

	private httpClient = inject(HttpClient);

	getLanguages() {
		return this.httpClient.get<Language[]>("http://localhost:5000/api/v1/languages/").pipe(
			tap({
				next: (languages) => {
					this.languages.set(languages);
				},
				error: (err) => {
					console.log(err);
				}
			})
		);
	}
}
