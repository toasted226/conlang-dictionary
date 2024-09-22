import { AfterViewInit, Component, ElementRef, viewChild } from "@angular/core";

@Component({
    selector: "app-modal",
    standalone: true,
    imports: [],
    templateUrl: "./modal.component.html",
    styleUrl: "./modal.component.css",
})
export class ModalComponent implements AfterViewInit {
	private dialog = viewChild.required<ElementRef<HTMLDialogElement>>("dialog");

	ngAfterViewInit(): void {
		this.dialog().nativeElement.showModal();
	}
}
