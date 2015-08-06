/// <reference path="../typings/angular2/angular2.d.ts" />

import './style/style.less!';
import './style/cal.less!';

import 'zone.js';
import 'reflect-metadata';
//you may need es6-shim if you get an error relating to list.fill
import 'es6-shim';

import {
	Component,
	View,
	bootstrap,
	NgFor
	} from 'angular2/angular2';

	import {Http, httpInjectables} from 'angular2/http';

	import {formDirectives, NgControl, Validators, NgFormModel, FormBuilder} from 'angular2/forms';

	import {Store, Todo, TodoFactory} from './TodoStore';

	import {TestComp} from './comp';
	import {Zippy} from './zippy';
	import {SearchPanel} from './search';
	import {MenuBar} from './menu-bar';

	@Component({
		selector: 'test-app'
		,viewInjector:[FormBuilder,Store,TodoFactory]
		})
	@View({
		template: `

<div class="calendar">
<div class="header">
	<i class="fa-angle-left"><</i>
	
	<span>July 2015</span>
	<i class="fa-angle-right">></i>
</div>
	<div class="week names">
		<span class="day">Sun</span>
		<span class="day">Mon</span>
		<span class="day">Tue</span>
		<span class="day">Wed</span>
		<span class="day">Thu</span>
		<span class="day">Fri</span>
		<span class="day">Sat</span>
	</div>
	<div class="week">
		<span class="day different-month">1</span>
		<span class="day">2</span>
		<span class="day">3</span>
		<span class="day">4</span>
		<span class="day selected">5</span>
		<span class="day">6</span>
		<span class="day">7</span>
	</div>
	<div class="week">
	<span class="day ">1</span>
		<span class="day">2</span>
		<span class="day">3</span>
		<span class="day">4</span>
		<span class="day">5</span>
		<span class="day">6</span>
		<span class="day">7</span>
	</div>
</div>


<search-panel></search-panel>
<search-panel></search-panel>
<div class="clndr">
	<div class="controls">
		<div class="clndr-previous-button"><</div>
		<div class="month">July</div>
		<div class="clndr-next-button">></div>
		
		
	</div>
	<div class="headers">
	<div class="day-header">S</div>
	<div class="day-header">S</div>
	<div class="day-header">S</div>
	<div class="day-header">S</div>
	<div class="day-header">S</div>
	<div class="day-header">S</div>
	<div class="day-header">S</div>
	</div>	
</div>





	
		
		<div>Init</div>

		

		<form [ng-form-model]="form">
		
		<select (change)="setCurrent($event)" ng-control="currentid" >
		<option  *ng-for="#p of people"  [value]="p.id"  [selected]="p.id==form.currentid">{{p.name}}</option>
		</select>
		</form>

		<button (click)="clearPeople()">Clear</button>

		<zippy title="Staff - {{form.currentid}}" (open)="openClick()">		
		<ul>
		<li *ng-for="#p of people" (click)="nameClick(p.id)" [class.selected]="p.id==form.currentid">{{p.name}}</li>
		</ul>
		</zippy>


		

		<zippy title="Samples" (open)="openClick()"><span>None found</span></zippy>
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

		directives:[formDirectives,Zippy,SearchPanel,TestComp,MenuBar,NgFor]
		})

	class TestApp {
		form;
		http:Http;
		people[];
		currentid:number;

		constructor(fb:FormBuilder,http:Http,public todoStore:Store,public factory:TodoFactory){
			this.http=http;
			this.currentid=null;
			this.people = null;

			this.form = fb.group({'currentid':[0]});

			console.log(fb);

			console.log(http);
			this.todoStore.add(this.factory.create('test',false));

			this.todoStore.list.forEach((todo:Todo)=>{
				console.log(todo);
				});			
			
			//this.http.get('./src/people.json').toRx().map(res=>res.json()).subscribe(people => this.people=people);



		}

		setCurrent(x,y){
			console.log(this.form.value);
			this.form.currentid = this.form.value.currentid;
		}

		clearPeople(){
			this.people = null;
		}

		loadError(msg){
			console.log('fault:',msg);
		}

		loadComplete(){
			console.log('complete');
			this.form.currentid= 0;
		}

		openClick(){			
			console.log('open');

			if (this.people==null){
				console.log('loading people');
				this.http.get('./src/people.json').toRx().map(res=> res.json()).subscribe(
					people => this.people = people,
					x=> this.loadError(x),
					() => this.loadComplete()
				);

				


			}

			
		}

		clearStore(){
			this.todoStore.clear();
			console.log(this.people);
		}

		nameClick(id){
			console.log(id);
			
			this.form.currentid = id;
		}
	}

	bootstrap(TestApp,[httpInjectables]);