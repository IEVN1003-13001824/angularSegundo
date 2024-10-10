import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-zodiaco',
  standalone: true,
  imports: [],
  templateUrl: './zodiaco.component.html',
  styleUrls: ['./zodiaco.component.css']
})
export class ZodiacoComponent implements OnInit {
  zodiacForm!: FormGroup;
  fullName: string = '';
  age: number | null = null;
  chineseZodiac: string = '';
  zodiacImage: string = '';

  zodiacSigns = [
    { name: 'Rat', image: 'path-to-rat-image' },
    { name: 'Ox', image: 'path-to-ox-image' },
    { name: 'Tiger', image: 'path-to-tiger-image' },
    // Añade los signos restantes con sus respectivas imágenes
  ];

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.zodiacForm = this.fb.group({
      firstName: ['', Validators.required],
      lastNamePaterno: ['', Validators.required],
      lastNameMaterno: ['', Validators.required],
      birthDate: ['', Validators.required],
      gender: ['', Validators.required],
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
