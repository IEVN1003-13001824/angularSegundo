import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';  // Importar FormsModule para ngModel
import { CommonModule } from '@angular/common';
 
interface Employee {
  matricula: string;
  nombre: string;
  correo: string;
  edad: number;
  horasTrabajadas: number;
}
  
@Component({
  selector: 'app-empleados',
  standalone: true,
  imports: [FormsModule, CommonModule],  // Cambiar ReactiveFormsModule por FormsModule
  templateUrl: './empleados.component.html',
  styleUrls: ['./empleados.component.css']
})
export default class EmpleadosComponent implements OnInit {
  empleados: Employee[] = [];
  empleado: Employee = { matricula: '', nombre: '', correo: '', edad: 0, horasTrabajadas: 0 };
  selectedMatricula: string = '';
 
  ngOnInit(): void {
    const storedEmployees = localStorage.getItem('empleados');
    if (storedEmployees) {
      this.empleados = JSON.parse(storedEmployees);
    }
  }
 
  agregarEmpleado(): void {
    this.empleados.push({ ...this.empleado });
    this.guardarEnLocalStorage();
    this.resetEmpleado();
  }
 
  modificarEmpleado(): void {
    const index = this.empleados.findIndex(emp => emp.matricula === this.selectedMatricula);
    if (index !== -1) {
      this.empleados[index] = { ...this.empleado };
      this.guardarEnLocalStorage();
      this.resetEmpleado();
    }
  }
 
  eliminarEmpleado(): void {
    this.empleados = this.empleados.filter(emp => emp.matricula !== this.selectedMatricula);
    this.guardarEnLocalStorage();
  }
 
  calcularPago(horas: number): number {
    if (horas > 40) {
      const horasExtras = horas - 40;
      return (40 * 70) + (horasExtras * 140);
    }
    return horas * 70;
  }
 
  guardarEnLocalStorage(): void {
    localStorage.setItem('empleados', JSON.stringify(this.empleados));
  }
 
  resetEmpleado(): void {
    this.empleado = { matricula: '', nombre: '', correo: '', edad: 0, horasTrabajadas: 0 };
  }
}