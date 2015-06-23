//import deps

import 'test.css!';

import 'zone.js';
import 'reflect-metadata';
//you may need es6-shim if you get an error relating to list.fill
import 'es6-shim';

//if using traceur compiler:
//import {
//  ComponentAnnotation as Component,
//  ViewAnnotation as View,
//  bootstrap
//} from 'angular2/angular2';
//OR
//if using babel or typescript compiler:
import {
  Component,
  View,
  bootstrap,
  NgFor
  } from 'angular2/angular2';

import {print} from 'angular2/src/facade/lang';

import {TestComp} from './comp';



//create a simple angular component
@Component({
  selector: 'test-app'
  })
@View({
  template: `

  <h4>Hello {{name}}</h4><test-comp></test-comp>
  <button (click)="addRow()">Add</button>
  <test-comp></test-comp>
  <test-comp *ng-for="t of it"></test-comp>
  `,
  directives:[TestComp,NgFor]
  })
class TestApp {
  name: string;
  constructor(){
    this.name = 'Angular2';
    this.it=[];

    this.it.push('test');

    setTimeout(() => {
      this.name = 'Angular2!!! Yay2!';
      print('test');
      },1500);
  }

  addRow(){
    this.it.push('');
  }
}

//start our app
bootstrap(TestApp);