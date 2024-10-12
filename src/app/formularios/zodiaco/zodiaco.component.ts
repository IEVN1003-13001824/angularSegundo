import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-zodiaco',
  standalone: true,
  imports: [ReactiveFormsModule, NgIf],
  templateUrl: './zodiaco.component.html',
  styleUrls: ['./zodiaco.component.css']
})
export class ZodiacoComponent implements OnInit {
  zodiacForm!: FormGroup;
  fullName: string = '';
  age: number | null = null;
  chineseZodiac: string = '';
  zodiacImage: string = '';

  // Lista de signos zodiacales chinos con sus imágenes correspondientes
  zodiacSigns = [
    { name: 'Mono', image: 'https://ccl.uanl.mx/wp-content/uploads/2023/10/06_horoscopo_chino_Mono-768x657-1.jpg' }, // Año % 12 == 0
    { name: 'Gallo', image: 'https://ccl.uanl.mx/wp-content/uploads/2023/10/06_horoscopo_chino_Gallo-768x657-1.jpg' }, // Año % 12 == 1
    { name: 'Perro', image: 'https://ccl.uanl.mx/wp-content/uploads/2023/10/06_horoscopo_chino_Perro-768x657-1.jpg' }, // Año % 12 == 2
    { name: 'Cerdo', image: 'https://ccl.uanl.mx/wp-content/uploads/2023/10/06_horoscopo_chino_Cerdo-768x657-1.jpg' }, // Año % 12 == 3
    { name: 'Rata', image: 'https://ccl.uanl.mx/wp-content/uploads/2023/10/06_horoscopo_chino_Rata-768x657-1.jpg' }, // Año % 12 == 4
    { name: 'Buey', image: 'https://ccl.uanl.mx/wp-content/uploads/2023/10/06_horoscopo_chino_Buey-768x657-1.jpg' }, // Año % 12 == 5
    { name: 'Tigre', image: 'https://ccl.uanl.mx/wp-content/uploads/2023/10/06_horoscopo_chino_Tigre-768x657-1.jpg' }, // Año % 12 == 6
    { name: 'Conejo', image: 'https://ccl.uanl.mx/wp-content/uploads/2023/10/06_horoscopo_chino_Conejo-768x657-1.jpg' }, // Año % 12 == 7
    { name: 'Dragon', image: 'https://ccl.uanl.mx/wp-content/uploads/2023/10/06_horoscopo_chino_Dragon-768x657-1.jpg' }, // Año % 12 == 8
    { name: 'Serpiente', image: 'https://ccl.uanl.mx/wp-content/uploads/2023/10/06_horoscopo_chino_Serpiente-768x657-1.jpg' }, // Año % 12 == 9
    { name: 'Caballo', image: 'https://ccl.uanl.mx/wp-content/uploads/2023/10/06_horoscopo_chino_Caballo-768x657-1.jpg' }, // Año % 12 == 10
    { name: 'Cabra', image: 'https://ccl.uanl.mx/wp-content/uploads/2023/10/06_horoscopo_chino_Cabra-768x657-1.jpg' } // Año % 12 == 11
  ];

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.zodiacForm = this.fb.group({
      firstName: ['', Validators.required],
      lastNamePaterno: ['', Validators.required],
      lastNameMaterno: ['', Validators.required],
      birthDate: ['', Validators.required],
      gender: ['', Validators.required]
    });
  }

  onSubmit(): void {
    if (this.zodiacForm.valid) {
      const { firstName, lastNamePaterno, lastNameMaterno, birthDate } = this.zodiacForm.value;
      this.fullName = `${firstName} ${lastNamePaterno} ${lastNameMaterno}`;
      
      // Calcular edad
      const birth = new Date(birthDate);
      const today = new Date();
      this.age = today.getFullYear() - birth.getFullYear();
      const m = today.getMonth() - birth.getMonth();
      if (m < 0 || (m === 0 && today.getDate() < birth.getDate())) {
        this.age--;
      }

      // Calcular horóscopo chino
      const chineseYear = birth.getFullYear() % 12;
      this.chineseZodiac = this.zodiacSigns[chineseYear].name;
      this.zodiacImage = this.zodiacSigns[chineseYear].image;
    }
  }
}
