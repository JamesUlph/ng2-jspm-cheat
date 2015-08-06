import {Component, View, EventEmitter} from 'angular2/angular2';

import {ObservableWrapper} from 'angular2/src/facade/async';

@Component({
	selector:'zippy',
	properties:['title','visible'],
	events:['openHandler: open','closeHandler:close']
	})

@View({
	template:`

<div class="zippy">
	<div (click)="toggle()" class="zippy__title">
		{{ visible ? '&blacktriangledown;' : '&blacktriangleright;'}} {{title}}
	</div>
	<div [hidden]="!visible" class="zippy__content">
	<ng-content><ng-content>
	</div>
</div>
	`})

export class Zippy {
	visible:boolean=false;
	title:string='';

	openHandler:EventEmitter=new EventEmitter();
	closeHandler:EventEmitter=new EventEmitter();

	toggle(){

		

		this.visible=!this.visible;

		if (this.visible){
			ObservableWrapper.callNext(this.openHandler,null);
		}
		else {
			ObservableWrapper.callNext(this.closeHandler,null);
		}
	}
}