import {bootstrap, NgFor, Component, View,NgFor,Attribute} from 'angular2/bootstrap';

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