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
  } from 'angular2/bootstrap';

  import {Http, httpInjectables} from 'angular2/http';

  import {print} from 'angular2/src/facade/lang';

  import {TestComp} from './comp';
  import {Zippy} from './zippy';
  import {SearchPanel} from './search';

import {Store, Todo, TodoFactory} from './TodoStore';

//create a simple angular component
@Component({
  selector: 'test-app'
  ,appInjector:[Store,TodoFactory]
  })
@View({
  template: `
  <search-panel></search-panel>
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

<button (click)="clearStore()">Clear</button>
<ul class="nameList">
  <li *ng-for="#todo of todoStore.list">
  {{todo.title}}
  </li>
  </ul>

  `,
  directives:[TestComp,Zippy,SearchPanel,NgFor]
  })
class TestApp {
  name: string;
  people:Object;
  http:Http;
  currentid:number;

  
  constructor(http:Http,public todoStore:Store,public factory:TodoFactory){
    this.http=http;
    this.currentid=null;
    this.name = 'Angular2';
    this.it=[];

    this.it.push('test');

    console.log(http);

    this.todoStore.add(this.factory.create('test',false));


    console.log(todoStore);

    this.todoStore.list.forEach((todo:Todo)=>{

      console.log(todo);

      });

    setTimeout(() => {
      this.name = 'Angular2!!! Yay2!';
      //print('test');
      },1500);
  }

  clearStore(){
    this.todoStore.clear();
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
bootstrap(TestApp)//,[httpInjectables]);