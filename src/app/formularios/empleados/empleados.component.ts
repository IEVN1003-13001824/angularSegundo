import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

interface Employee {
  matricula: string;
  nombre: string;
  correo: string;
  edad: number;
  horasTrabajadas: number;
  horasPorPagar: number;
  horasExtras: number;
  total: number;
}

@Component({
  selector: 'app-empleados',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './empleados.component.html',
  styleUrls: ['./empleados.component.css']
})
export default class EmpleadosComponent implements OnInit {
  empleados: Employee[] = [];
  empleado: Employee = { 
    matricula: '', 
    nombre: '', 
    correo: '', 
    edad: 0, 
    horasTrabajadas: 0, 
    horasPorPagar: 0, 
    horasExtras: 0, 
    total: 0 
  };
  selectedMatricula: string = '';
  totalGeneral: number = 0;

  ngOnInit(): void {
    const storedEmployees = localStorage.getItem('empleados');
    if (storedEmployees) {
      this.empleados = JSON.parse(storedEmployees);
    }
    this.calcularTotalGeneral();
  }

  agregarEmpleado(): void {
    const nuevoEmpleado = { ...this.empleado, ...this.calcularPago(this.empleado.horasTrabajadas) };
    this.empleados.push(nuevoEmpleado);
    this.guardarEnLocalStorage();
    this.resetEmpleado();
    this.calcularTotalGeneral();
  }

  modificarEmpleado(): void {
    const index = this.empleados.findIndex(emp => emp.matricula === this.selectedMatricula);
    if (index !== -1) {
      this.empleados[index] = { ...this.empleado, ...this.calcularPago(this.empleado.horasTrabajadas) };
      this.guardarEnLocalStorage();
      this.resetEmpleado();
      this.calcularTotalGeneral();
    }
  }

  eliminarEmpleado(): void {
    this.empleados = this.empleados.filter(emp => emp.matricula !== this.selectedMatricula);
    this.guardarEnLocalStorage();
    this.calcularTotalGeneral();
  }

  calcularPago(horas: number): { horasPorPagar: number; horasExtras: number; total: number } {
    let horasPorPagar = horas;
    let horasExtras = 0;
    let total = 0;

    if (horas > 40) {
      horasExtras = horas - 40;
      horasPorPagar = 40;
      total = (horasPorPagar * 70) + (horasExtras * 140);
    } else {
      total = horas * 70;
    }
    return { horasPorPagar, horasExtras, total };
  }

  calcularTotalGeneral(): void {
    this.totalGeneral = this.empleados.reduce((acc, emp) => acc + emp.total, 0);
  }

  guardarEnLocalStorage(): void {
    localStorage.setItem('empleados', JSON.stringify(this.empleados));
  }

  resetEmpleado(): void {
    this.empleado = { 
      matricula: '', 
      nombre: '', 
      correo: '', 
      edad: 0, 
      horasTrabajadas: 0, 
      horasPorPagar: 0, 
      horasExtras: 0, 
      total: 0 
    };
  }
}