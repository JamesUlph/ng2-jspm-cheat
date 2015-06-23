
import {
	Component,
	View,
	bootstrap
	} from 'angular2/angular2';

	@Component({
		selector: 'test-comp'
		})
	@View({
		template: `
		
		<div class="clickable" (click)="invoke()">Test comp {{name}}</div>

		`
		})

	export class TestComp {
		name: string;
		constructor(){
			this.name = 'Angular2';
			setTimeout(() => {
				this.name = 'Angular2!!!'
				},1500);
		}

		invoke(){
			this.name+="clicked";
		}
	}