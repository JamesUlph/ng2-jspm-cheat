import './style/style.less!';
import 'zone.js';
import 'reflect-metadata';
//you may need es6-shim if you get an error relating to list.fill
//import 'es6-shim';

import {
	Component,
	View,
	bootstrap,
	NgFor
	} from 'angular2/angular2';

	import {Http, httpInjectables} from 'angular2/http';

	import {Store, Todo, TodoFactory} from './TodoStore';

	import {TestComp} from './comp';
	import {Zippy} from './zippy';
	import {SearchPanel} from './search';

	@Component({
		selector: 'test-app'
		,appInjector:[Store,TodoFactory]
		})
	@View({
		template: `
		<div>Init</div>

		<zippy title="Staff - {{currentid}}">
		<ul class="nameList">
		<li *ng-for="#person of people" (click)="nameClick(person.id)" [class.selected]="person.id==currentid">{{person.name}}</li>
		</ul>
		</zippy>

		<zippy title="Samples"><span>None found</span></zippy>
		<search-panel></search-panel>
		<search-panel></search-panel>
		<button (click)="clearStore()">Clear</button>
		<zippy visible="true">
		<ul class="nameList">
		<li *ng-for="#todo of todoStore.list">
		{{todo.title}}
		</li>
		</ul>
		</zippy>
		<test-comp></test-comp>
		<test-comp></test-comp>
		
		`

		directives:[Zippy,SearchPanel,TestComp,NgFor]
		})

	class TestApp {
		http:Http;
		people[];
		currentid:number;

		constructor(http:Http,public todoStore:Store,public factory:TodoFactory){
			this.http=http;
			this.currentid=null;
			console.log(http);
			this.todoStore.add(this.factory.create('test',false));

			this.todoStore.list.forEach((todo:Todo)=>{
				console.log(todo);
				});

			this.http.get('./src/people.json').map(res=>res.json()).subscribe(people => this.people=people);

		}

		clearStore(){
			this.todoStore.clear();
		}

		nameClick(id){
			console.log(id);
			this.currentid=id;
		}
	}

	bootstrap(TestApp,[httpInjectables]);