import {Component, View, Binding} from 'angular2/angular2';
import {Store, Todo, TodoFactory} from './TodoStore';

@Component({
	selector:'search-panel'
})

@View({
	template:
	`<div>Search panel:</div>	
	<input type="text" #searchfilter />
	<button (click)="doSearch(searchfilter)">Search</button>
	`,
	 appInjector:[Store,TodoFactory]
})

export class SearchPanel {
	searchFilter:string;
	constructor(public todoStore:Store,public factory:TodoFactory){
		this.searchFilter='';
	}

	doneKeyup($event){
		console.log('key up ',$event);
	}

	doSearch(d){
		
		this.todoStore.add(this.factory.create(d.value,false));

		d.value='';

		
	}
}