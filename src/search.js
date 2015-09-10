/// <reference path="../typings/angular2/angular2.d.ts" />
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
var TodoStore_1 = require('./TodoStore');
var SearchPanel = (function () {
    function SearchPanel(place, todoStore, factory) {
        this.todoStore = todoStore;
        this.factory = factory;
        this.searchFilter = '';
        console.log(place);
    }
    SearchPanel.prototype.doneKeyup = function ($event) {
        console.log('key up ', $event);
    };
    SearchPanel.prototype.doSearch = function (d) {
        if (d.value == '')
            return;
        this.todoStore.add(this.factory.create(d.value, false));
        d.value = '';
    };
    SearchPanel = __decorate([
        angular2_1.Component({
            selector: 'search-panel',
            properties: ['place', 'visible']
        }),
        angular2_1.View({
            template: "<div>Search panel:</div>\n\t<input type=\"text\" #searchfilter placeholder=\"{{place ? place : '' }}\" />\n\t<button (click)=\"doSearch(searchfilter)\">Add</button>\n\t",
            viewBindables: [TodoStore_1.Store, TodoStore_1.TodoFactory]
        }),
        __param(0, angular2_1.Attribute('place')), 
        __metadata('design:paramtypes', [String, TodoStore_1.Store, TodoStore_1.TodoFactory])
    ], SearchPanel);
    return SearchPanel;
})();
exports.SearchPanel = SearchPanel;
