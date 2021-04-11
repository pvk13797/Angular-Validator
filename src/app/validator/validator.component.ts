import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, Validators, FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-validator',
  templateUrl: './validator.component.html',
  styleUrls: ['./validator.component.css']
})
export class ValidatorComponent implements OnInit {

  title = 'Reactive-Form-Validator';
  submitted = false;

  eventForm = this.fb.group({
    events: this.fb.array([this.buildEvents()])
  });

  get events() {
    return this.eventForm.get('events') as FormArray;
  }

  onSubmit() {
    
    this.submitted = true;
    
    if (this.eventForm.invalid) {
      return;
    }

    if (this.submitted) {
      alert("We Done IT!");

    }
  }

  addEvents(formIndex: number, event: any) {
    this.events.push(this.buildEvents());
    this.submitted = false;

    const controlName = event.target.getAttribute('formControlName');

    this.events.controls.forEach((eachForm: FormGroup) => {
      eachForm.get('name').setErrors(null);
      eachForm.get('des').setErrors(null);
      eachForm.get('st').setErrors(null);
      eachForm.get('ed').setErrors(null);
    });

    //this.events.at(formIndex).get(controlName).updateValueAndValidity();

    /* this.events.controls.forEach(control => {
      control.get('name').setErrors(null);
      control.get('des').setErrors(null);
      control.get('st').setErrors(null);
      control.get('ed').setErrors(null); 
    }); */ 

  }

  deleteEvents(i: number) {
    this.events.removeAt(i);
  }

/*   validate(formIndex: number, event: any) {

    const controlName = event.target.getAttribute('formControlName');

      this.events.controls.forEach((eachForm: FormGroup) => {
        eachForm.get('name').setErrors(null);
        eachForm.get('des').setErrors(null);
        eachForm.get('st').setErrors(null);
        eachForm.get('ed').setErrors(null);
      });

    //this.events.at(formIndex).get(controlName).updateValueAndValidity();

  }  */

  public buildEvents(): FormGroup {
    return this.fb.group({
      name: new FormControl('', [Validators.required, Validators.maxLength(15)]),
      des: new FormControl('', [Validators.required]),
      st: new FormControl('', [Validators.required, Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$")]),
      ed: new FormControl('', [Validators.required, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')])
    });
  }
  
  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
  }

}
