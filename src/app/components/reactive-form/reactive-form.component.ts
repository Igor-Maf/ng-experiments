import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-reactive-form',
  templateUrl: './reactive-form.component.html',
  styleUrls: ['./reactive-form.component.scss']
})
export class ReactiveFormComponent implements OnInit {
  dynamicForm: FormGroup;

  filterTypes = ['TRANSFER', 'EXPORT', 'IMPORT'];
  apiTypes = ['Less than', 'Equals', 'Greater than'];

  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    this.dynamicForm = this.fb.group({
      filters: this.fb.array([])
    });
  }

  get filtersFormArray() {
    return (this.dynamicForm.get('filters') as FormArray);
  }

  createFilterGroup() {
    return this.fb.group({
      filterType: [],
      apiType: []
    });
  }

  addFilterToFilters() {
    this.filtersFormArray.push(this.createFilterGroup());
  }

  removeFilterFromFilters(i) {
    this.filtersFormArray.removeAt(i);
  }

  getFilterGroupAtIndex(i) {
    return (this.filtersFormArray.at(i) as FormGroup);
  }

  getFormControl() {
    return this.fb.control(null);
  }

  selectedAPIChanged(i) {
    this.getFilterGroupAtIndex(i).addControl('value', this.getFormControl());
  }

  save() {
    console.log(this.dynamicForm.value);
  }
}
