import {bootstrap, NgFor, Component, View,Attribute} from 'angular2/angular2';

@Component({
	selector: 'search-panel',
	properties:['place']
})
@View({
	template: `<div>Panel
	<input type="text" [placeholder]="place" (keyup)="doneKeyup($event)">
	</div>`
})

export class SearchPanel {

	constructor(@Attribute('place') place:string){

	}

	doneKeyup($event){
		console.log('key up ',$event);
	}
}
