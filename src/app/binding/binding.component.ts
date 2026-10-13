import { Component } from '@angular/core';

@Component({
  selector: 'app-binding',
  templateUrl: './binding.component.html',
  styles: [
  ]
})
export class BindingComponent {

  titre: string = "demo du data binding Interpolation";
  status : boolean = false;

  constructor() { }

  ngOnInit(): void {
  }
  

}
