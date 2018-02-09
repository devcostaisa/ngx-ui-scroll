import { Direction, Item } from '../interfaces/index';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

export class Buffer {

  private _items: Array<Item>;
  public $items = new BehaviorSubject(null);

  set items(items: Array<Item>) {
    this._items = items;
    this.$items.next(items);
  }

  get items(): Array<Item> {
    return this._items;
  }

  bof: boolean;
  eof: boolean;
  startIndex: number;

  constructor() {
    this.items = [];
    this.bof = false;
    this.eof = false;
    this.startIndex = null;
  }

  getFirstVisibleItemIndex(): number {
    const length = this.items.length;
    for (let i = 0; i < length; i++) {
      if (!this.items[i].invisible) {
        return i;
      }
    }
    return -1;
  }

  getLastVisibleItemIndex(): number {
    for (let i = this.items.length - 1; i >= 0; i--) {
      if (!this.items[i].invisible) {
        return i;
      }
    }
    return -1;
  }

  getEdgeVisibleItemIndex(direction: Direction, opposite?: boolean): number {
    return direction === (!opposite ? Direction.forward : Direction.backward) ?
      this.getLastVisibleItemIndex() : this.getFirstVisibleItemIndex();
  }

  getFirstVisibleItem(): Item {
    const index = this.getFirstVisibleItemIndex();
    if (index >= 0) {
      return this.items[index];
    }
  }

  getLastVisibleItem(): Item {
    const index = this.getLastVisibleItemIndex();
    if (index >= 0) {
      return this.items[index];
    }
  }

  getEdgeVisibleItem(direction: Direction, opposite?: boolean): Item {
    return direction === (!opposite ? Direction.forward : Direction.backward) ?
      this.getLastVisibleItem() : this.getFirstVisibleItem();
  }

}
