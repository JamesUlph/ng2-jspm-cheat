import './style/style.less!';

import 'zone.js';

import 'reflect-metadata';
//you may need es6-shim if you get an error relating to list.fill
import 'es6-shim';

import {bootstrap, NgFor, Component, View,NgFor} from 'angular2/bootstrap';

import {Http, httpInjectables} from 'angular2/http';
import {formDirectives, NgControl, Validators, NgFormModel, FormBuilder} from 'angular2/forms';

import {Zippy} from './zippy';
import {SearchPanel} from './searchpanel';

@Component({ 
	selector: 'test-app',
	viewBindables:[FormBuilder]
})
	@View({
		template: `<div>Test

	<zippy title="Staff" (open)="openClick()">
	Staff list

	<div *ng-for="#p of people" [class.selected]="p.id==form.value.currentid" (click)="setCurrent(p.id)">{{p.name}}</div>
	</zippy>

<span>CurrentID={{form.value.currentid}}</span>

<form [ng-form-model]="form">



<select ng-control="currentid" >
<option  *ng-for="#p of people"  [value]="p.id"  [selected]="p.id==form.value.currentid">{{p.name}}</option>
</select>

<search-panel place="Search..."></search-panel>

</form>

<div class="panel"><div class="panel-title">title</div><div class="panel-content">test test test</div></div>

	</div>`
		, directives: [Zippy,SearchPanel,NgFor,formDirectives]
	})


class TestApp {
	form: any;
	http:Http;
	people:any[];
	constructor(public fb:FormBuilder,http:Http){
		this.http = http;
		this.form = fb.group({'currentid':[6]});
	


	}

	setCurrent(id){
		console.log(id);
		this.form.value.currentid = id;
	}


	openClick(){

		if (this.people==null) {
			this.http.get('./src/people.json').toRx().map(res=>res.json()).subscribe(people => this.people=people);
		}
		
	}
}

//export function main() {
		bootstrap(TestApp,[httpInjectables,FormBuilder]);
//	}