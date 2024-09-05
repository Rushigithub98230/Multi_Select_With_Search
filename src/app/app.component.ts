import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';


interface Patient {
  id: number;
  name: string;
}



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  patientControl = new FormControl();
  searchTerm: string = '';

  // Full patient list
  patients: Patient[] = [
    { id: 1, name: 'John Doe' },
    { id: 2, name: 'Jane Smith' },
    { id: 3, name: 'Michael Johnson' },
    { id: 4, name: 'Emily Davis' }
  ];

  // Filtered patient list based on search
  filteredPatients: Patient[] = [...this.patients];

  // To track selected patients
  selectedPatients: Patient[] = [];

  ngOnInit(): void {}

  // Filter patients based on the search term
  filterPatients() {
    const searchTermLower = this.searchTerm.toLowerCase();
    this.filteredPatients = this.patients.filter(patient => 
      patient.name.toLowerCase().includes(searchTermLower)
    );
  }

  // Compare function for the multi-select
  compareById(patient1: Patient, patient2: Patient): boolean {
    return patient1 && patient2 && patient1.id === patient2.id;
  }

  // Update selected patients when an option is selected/deselected
  onSelectionChange(event: any) {
    this.selectedPatients = event.value;
  }

  // Display selected patient names in the trigger
  selectedPatientsDisplay(): string {
    if (!this.selectedPatients || this.selectedPatients.length === 0) {
      return ''; // Return an empty string if no patients are selected
    }
    return this.selectedPatients
      .filter(patient => patient && patient.name) // Filter out any undefined or null patients
      .map(patient => patient.name)
      .join(', ');
  }
  
  // Function triggered when dropdown is closed
  onDropDownClose() {
    // Add your logic here, e.g., send selected IDs to a backend
    console.log("Selected patient IDs: ", this.selectedPatients.map(patient => patient.id));
  }
}
