import { Component, EventEmitter, Output } from '@angular/core';


@Component({
  selector: 'app-profil-bar',
  standalone: true,
  imports: [],
  templateUrl: './profil-bar.component.html',
  styleUrl: './profil-bar.component.css'
})
export class ProfilBarComponent {
  @Output() sectionChanged = new EventEmitter<string>();

  // Funkcja do informowania o zmianie sekcji
  changeSection(section: string) {
    this.sectionChanged.emit(section);
  }
}