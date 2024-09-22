import { Component, computed, DestroyRef, inject, OnInit } from "@angular/core";
import { RouterLink, RouterLinkActive } from "@angular/router";
import { AuthService } from "../auth/auth.service";

@Component({
    selector: "app-header",
    standalone: true,
    imports: [RouterLink, RouterLinkActive],
    templateUrl: "./header.component.html",
    styleUrl: "./header.component.css",
})
export class HeaderComponent implements OnInit {
    private authService = inject(AuthService);
    private destroyRef = inject(DestroyRef);

    username = this.authService.signedInUsername;

    ngOnInit(): void {
        const subscription = this.authService.checkAuth().subscribe();
        this.destroyRef.onDestroy(() => subscription.unsubscribe());
    }
}
