//import deps
import './style/style.less!';

import 'zone.js';
import 'reflect-metadata';
//you may need es6-shim if you get an error relating to list.fill
import 'es6-shim';


//OR
//if using babel or typescript compiler:


import {
    bootstrap,
Component,
View
} from 'angular2/bootstrap';


import {Zippy} from './zippy';


//create a simple angular component
@Component({
    selector: 'test-app'
})
@View({
    template: `<h4>Hello {{name}}</h4>
<zippy title="Staff" (open)="openClick()">
<div>Testing 123</div>
</zippy>



  `, directives: [Zippy]
})
class TestApp {
    name: string;
    constructor() {
        this.name = 'Angular2';
        setTimeout(() => {
            this.name = 'Angular2!!!'
        }, 1500);
    }

    openClick() {
        console.log('open');
    }
}

//start our app
bootstrap(TestApp);
