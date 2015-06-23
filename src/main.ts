//import deps

import './style/style.less!';

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
  NgFor,
  Inject
  } from 'angular2/angular2';

  import {Http, httpInjectables} from 'angular2/http';

  import {print} from 'angular2/src/facade/lang';

  import {TestComp} from './comp';
  import {Zippy} from './zippy';


//create a simple angular component
@Component({
  selector: 'test-app'
  })
@View({
  template: `

  <h4>Hello {{name}}</h4><test-comp></test-comp>
  <button (click)="addRow()">Add</button>


  <zippy title="Names" visible="true">
  <button (click)="loadNames()">Load</button>
  Current ID={{currentid}}
  <ul class="nameList">
  <li *ng-for="#person of people" [class.selected]="person.id==currentid" (click)="nameClick(person.id)">
  {{person.name}}
  </li>
  </ul>
  </zippy>

  <zippy title="Items">
  <test-comp></test-comp>
  <zippy title="Sub Items">
  <ul class="nameList">
  <li>Item1</li>
  <li>Item2</li>
  <li>Item3</li>
  </ul>
  </zippy>
  </zippy>
  <zippy (open)="pushLog('open')" (close)="pushLog('close')" title="Details">

  <test-comp *ng-for="t of it"></test-comp>
  </zippy>
  `,
  directives:[TestComp,Zippy,NgFor]
  })
class TestApp {
  name: string;
  people:Object;
  http:Http;
  currentid:number;

  constructor(http:Http){
    this.http=http;
    this.currentid=null;
    this.name = 'Angular2';
    this.it=[];

    this.it.push('test');

    console.log(http);


    



    setTimeout(() => {
      this.name = 'Angular2!!! Yay2!';
      print('test');
      },1500);
  }

  loadNames(){
    this.http.get('./src/people.json').map(res=>res.json()).subscribe(people => this.people=people);

  }

  addRow(){
    this.it.push('');
  }

  nameClick(id){
    console.log(id);
    this.currentid=id;
  }

  pushLog(action){
    switch(action){
      case 'open':
      print('open');
      break
      case 'close':
      print('close');
      break;
    }
    
  }
}

//start our app
bootstrap(TestApp,[httpInjectables]);