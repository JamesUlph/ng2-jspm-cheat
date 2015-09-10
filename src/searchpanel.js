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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var angular2_1 = require('angular2/angular2');
var SearchPanel = (function () {
    function SearchPanel(place) {
    }
    SearchPanel.prototype.doneKeyup = function ($event) {
        console.log('key up ', $event);
    };
    SearchPanel = __decorate([
        angular2_1.Component({
            selector: 'search-panel',
            properties: ['place']
        }),
        angular2_1.View({
            template: "<div>Panel\n\t<input type=\"text\" [placeholder]=\"place\" (keyup)=\"doneKeyup($event)\">\n\t</div>"
        }),
        __param(0, angular2_1.Attribute('place')), 
        __metadata('design:paramtypes', [String])
    ], SearchPanel);
    return SearchPanel;
})();
exports.SearchPanel = SearchPanel;
