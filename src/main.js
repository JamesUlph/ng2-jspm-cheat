var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") return Reflect.decorate(decorators, target, key, desc);
    switch (arguments.length) {
        case 2: return decorators.reduceRight(function(o, d) { return (d && d(o)) || o; }, target);
        case 3: return decorators.reduceRight(function(o, d) { return (d && d(target, key)), void 0; }, void 0);
        case 4: return decorators.reduceRight(function(o, d) { return (d && d(target, key, o)) || o; }, desc);
    }
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
require('./style/style.less!');
require('zone.js');
require('reflect-metadata');
require('es6-shim');
var bootstrap_1 = require('angular2/bootstrap');
var zippy_1 = require('./zippy');
var TestApp = (function () {
    function TestApp() {
        var _this = this;
        this.name = 'Angular2';
        setTimeout(function () {
            _this.name = 'Angular2!!!';
        }, 1500);
    }
    TestApp.prototype.openClick = function () {
        console.log('open');
    };
    TestApp = __decorate([
        bootstrap_1.Component({
            selector: 'test-app'
        }),
        bootstrap_1.View({
            template: "<h4>Hello {{name}}</h4>\n<zippy title=\"Staff\" (open)=\"openClick()\">\n<div>Testing 123</div>\n</zippy>\n\n\n\n  ", directives: [zippy_1.Zippy]
        }), 
        __metadata('design:paramtypes', [])
    ], TestApp);
    return TestApp;
})();
bootstrap_1.bootstrap(TestApp);
