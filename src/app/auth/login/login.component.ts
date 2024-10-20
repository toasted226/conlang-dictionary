import { Component, DestroyRef, inject, signal } from "@angular/core";
import { ModalComponent } from "../../shared/modal/modal.component";
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms";
import { AuthService } from "../auth.service";
import { Router } from "@angular/router";

@Component({
    selector: "app-login",
    standalone: true,
    imports: [ModalComponent, ReactiveFormsModule],
    templateUrl: "./login.component.html",
    styleUrl: "./login.component.css",
})
export class LoginComponent {
	form = new FormGroup({
		username: new FormControl<string>("", {
			validators: [Validators.required]
		}),
		password: new FormControl<string>("", {
			validators: [Validators.required]
		})
	});

	errorMessage = signal("");

	private authService = inject(AuthService);
	private destroyRef = inject(DestroyRef);
	private router = inject(Router);

	onSubmit() {
		if (!this.form.valid) {
			return;
		}

		if (this.form.controls.username.value !== null && this.form.controls.password.value !== null) {
			const subscription = this.authService.signIn({
				username: this.form.controls.username.value,
				password: this.form.controls.password.value
			}).subscribe({
				next: () => {
					this.router.navigateByUrl(this.router.parseUrl(""));
				},
				error: (err: Error) => {
					console.log(err);
					this.errorMessage.set("Invalid credentials");
					setTimeout(() => this.errorMessage.set(""), 5000);
				}
			});

			this.destroyRef.onDestroy(() => subscription.unsubscribe());

			this.form.reset();
		}
	}
}
