import { HttpClient } from "@angular/common/http";
import { inject, Injectable, signal } from "@angular/core";
import { catchError, tap, throwError } from "rxjs";
import { apiEndpoint } from "../app.config";

@Injectable({
    providedIn: "root",
})
export class AuthService {
    private username = signal("");
    signedInUsername = this.username.asReadonly();

    private auth = signal(false);
    isAuthenticated = this.auth.asReadonly();

    private httpClient = inject(HttpClient);

    signIn(credentials: { username: string; password: string }) {
        return this.httpClient
            .post(apiEndpoint + "/users/login", credentials, {
                withCredentials: true,
            })
            .pipe(
                catchError((err) => {
                    this.auth.set(false);
                    return throwError(() => new Error(err.error.error));
                }),
                tap({
                    next: () => {
                        this.username.set(credentials.username);
                        this.auth.set(true);
                    },
                })
            );
    }

    signOut() {
        return this.httpClient.get(
            apiEndpoint + "/users/logout",
            { withCredentials: true }
        ).pipe(
            tap({
                next: () => {
                    this.auth.set(false);
                    this.username.set("");
                }
            })
        );
    }

    checkAuth() {
        return this.httpClient
            .get<{ username: string }>(
                apiEndpoint + "/users/login",
                {
                    withCredentials: true,
                }
            )
            .pipe(
                tap({
                    next: (user) => {
                        this.username.set(user.username);
                        this.auth.set(true);
                    },
                    error: () => {
                        this.auth.set(false);
                    },
                })
            );
    }
}
