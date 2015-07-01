/// <reference path="../typings/angular2/angular2.d.ts" />

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
	import {MenuBar} from './menu-bar';

	@Component({
		selector: 'test-app'
		,appInjector:[Store,TodoFactory]
		})
	@View({
		template: `


<ul class="cal-wk">
<li class="cal-day">16</li>
<li class="cal-day">7</li>
<li class="cal-day">8</li>
<li class="cal-day">9</li>
<li class="cal-day">10</li>
<li class="cal-day">11</li>
<li class="cal-day">12</li>

</ul>

<div class="cal-wrapper">
<div class="days-title">
<div class="day title cell">Mo</div>
<div class="day title cell">Mo</div>
<div class="day title cell">Mo</div>
<div class="day title cell">Mo</div>
<div class="day title cell">Mo</div>
<div class="day title cell">Mo</div>
<div class="day title cell">Mo</div>
</div>

		<div class="days">
		<div class="day next cell">30</div>
		<div class="day next cell">31</div>
		<div class="day cell">1</div>
		<div class="day cell">2</div>
		<div class="day cell">3</div>
		<div class="day current cell">4</div>
		<div class="day cell">5</div>
		<div class="day cell">6</div>
		<div class="day cell">7</div>
		<div class="day cell">8</div>
		<div class="day cell">9</div>
		<div class="day cell">10</div>
		<div class="day cell">11</div>
		<div class="day cell">12</div>
		<div class="day cell">13</div>
		<div class="day cell">14</div>
		<div class="day cell">15</div>
		<div class="day cell">16</div>
		<div class="day cell">17</div>
		<div class="day cell">18</div>
		<div class="day cell">19</div>
		<div class="day next cell">20</div>
		<div class="day next cell">21</div>
		<div class="day next cell">22</div>
		</div>
		</div>
		
		<div>Init</div>

		<zippy title="Staff - {{currentid}}">
		<ul class="nameList">
		<li *ng-for="#person of people" (click)="nameClick(person.id)" [class.selected]="person.id==currentid">{{person.name}}</li>
		</ul>
		</zippy>

		<zippy title="Samples"><span>None found</span></zippy>
		<search-panel place="Container number"></search-panel>
		<search-panel place="Search..."></search-panel>
		<button [disabled]="!todoStore.list.length>0" (click)="clearStore()">Clear</button>
		<zippy visible="true">
		<ul class="nameList">
		<li *ng-for="#todo of todoStore.list">
		{{todo.title}}
		</li>
		</ul>
		</zippy>
		<zippy title="List">
		<test-comp></test-comp>
		<test-comp></test-comp>
		<test-comp></test-comp>
		</zippy>
		`,

		directives:[Zippy,SearchPanel,TestComp,MenuBar,NgFor]
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