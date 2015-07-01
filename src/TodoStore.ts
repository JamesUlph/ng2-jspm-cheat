/// <reference path="../typings/angular2/angular2.d.ts" />

import {Injectable} from 'angular2/angular2';
import {ListWrapper} from 'angular2/src/facade/collection';

export class KeyModel {
	constructor(public key:number) {}
}

export class Todo extends KeyModel {
	constructor(key:number, public title:string,public completed:boolean){super(key);}
}

@Injectable()
export class TodoFactory {
	_uid:number=0;

	nextUid():number {return ++this._uid;}

	create(title:string, isCompleted:boolean):Todo {
		return new Todo(this.nextUid(),title,isCompleted);
	}
}

// Store manages any generic item that inherits from KeyModel
@Injectable()
export class Store {
  list: List<KeyModel> = [];

  add(record: KeyModel): void { this.list.push(record); }

  remove(record: KeyModel): void { this._spliceOut(record); }

  removeBy(callback: Function): void {
    var records = ListWrapper.filter(this.list, callback);
    ListWrapper.removeAll(this.list, records);
  }

  clear():void {
  	this.list=[];
  }

  private _spliceOut(record: KeyModel) {
    var i = this._indexFor(record);
    if (i > -1) {
      return ListWrapper.splice(this.list, i, 1)[0];
    }
    return null;
  }

  private _indexFor(record: KeyModel) { return this.list.indexOf(record); }
}