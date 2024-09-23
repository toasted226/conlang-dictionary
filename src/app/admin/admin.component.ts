import { Component, DestroyRef, inject } from "@angular/core";
import { Router, RouterLink, RouterLinkActive, RouterOutlet } from "@angular/router";
import { AuthService } from "../auth/auth.service";

@Component({
    selector: "app-admin",
    standalone: true,
    imports: [RouterOutlet, RouterLink, RouterLinkActive],
    templateUrl: "./admin.component.html",
    styleUrl: "./admin.component.css",
})
export class AdminComponent {
    private authService = inject(AuthService);
    private destroyRef = inject(DestroyRef);
    private router = inject(Router);

    signOut() {
        const signOutSub = this.authService.signOut().subscribe();
        
        setTimeout(() => this.router.navigateByUrl(this.router.parseUrl("/login")), 10);
        
        this.destroyRef.onDestroy(() => {
            signOutSub.unsubscribe();
        });
    }
}
