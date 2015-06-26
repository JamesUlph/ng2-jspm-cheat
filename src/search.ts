import {Component, View, Binding,Attribute} from 'angular2/angular2';
import {Store, Todo, TodoFactory} from './TodoStore';

@Component({
	selector:'search-panel',
	properties:['place','visible']
})

@View({
	template:
	`<div>Search panel:</div>	
	<input type="text" #searchfilter placeholder="{{place ? place : '' }}" />
	<button (click)="doSearch(searchfilter)">Add</button>
	`,
	 appInjector:[Store,TodoFactory]
})

export class SearchPanel {
	searchFilter:string;
	constructor(@Attribute('place') place:string,public todoStore:Store,public factory:TodoFactory){
		this.searchFilter='';
		console.log(place);		
	}

	doneKeyup($event){
		console.log('key up ',$event);
	}

	doSearch(d){
		
		if (d.value=='') return;
			
		this.todoStore.add(this.factory.create(d.value,false));
			
		

		d.value='';
		

		

		
	}
}