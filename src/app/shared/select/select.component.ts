import { ObjectUtils } from './../../utils/ObjectUtils';
import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';

import { CollectionViewer, DataSource } from '@angular/cdk/collections';
import { BehaviorSubject, Observable, Subscription } from 'rxjs';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
@Component({
  selector: 'app-select',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: SelectComponent,
      multi: true,
    },
  ],
})
export class SelectComponent implements ControlValueAccessor {
  @Input() set items(value: any[]) {
    this.original = JSON.parse(JSON.stringify(value));
    this._items = value;
  }
  @Output() onSelect: EventEmitter<any> = new EventEmitter();
  @Output() onDeSelect: EventEmitter<any> = new EventEmitter();
  @Output() onSearch: EventEmitter<any> = new EventEmitter();
  onChange = (quantity: any) => {};

  onTouched = () => {};
  isOpen = true;
  private _items: any[] = [];
  original = this.items;
  value: any[] = [];

  public get items(): any[] {
    return this._items;
  }

  constructor() {}
  search(event: any) {
    const { value } = event.target;
    if (value) {
      this._items = this.original.filter((x: any) =>
        x.label.toLocaleLowerCase().includes(value.toLocaleLowerCase())
      );
    } else {
      this._items = this.original;
    }
    this.onSearch.emit(event);
  }

  onItemClick(event: any): void {
    if (event.selected) {
      this.value.push(event.item);
      this.onChange(this.value);
      this.onSelect.emit(event);
    } else {
      this.value.splice(event.itemIndex, 1);
      this.onChange(this.value);
      this.onDeSelect.emit(event);
    }
  }
  isSelected(option: any) {
    return this.findSelectionIndex(option) != -1;
  }
  findSelectionIndex(val: any): number {
    let index = -1;

    if (this.value) {
      for (let i = 0; i < this.value.length; i++) {
        if (ObjectUtils.equals(this.value[i], val)) {
          index = i;
          break;
        }
      }
    }

    return index;
  }
  writeValue(selectedItems: any[]) {
    this.value = selectedItems;
  }

  registerOnChange(onChange: any) {
    this.onChange = onChange;
  }

  registerOnTouched(onTouched: any) {
    this.onTouched = onTouched;
  }
}
export class MyDataSource extends DataSource<string | undefined> {
  private _length = 50;
  private _pageSize = 100;
  private _cachedData = Array.from<string>({ length: this._length });
  private _fetchedPages = new Set<number>();
  private readonly _dataStream = new BehaviorSubject<(string | undefined)[]>(
    this._cachedData
  );
  private readonly _subscription = new Subscription();

  connect(
    collectionViewer: CollectionViewer
  ): Observable<(string | undefined)[]> {
    this._subscription.add(
      collectionViewer.viewChange.subscribe((range) => {
        const startPage = this._getPageForIndex(range.start);
        const endPage = this._getPageForIndex(range.end - 1);
        for (let i = startPage; i <= endPage; i++) {
          this._fetchPage(i);
        }
      })
    );
    return this._dataStream;
  }

  disconnect(): void {
    this._subscription.unsubscribe();
  }

  private _getPageForIndex(index: number): number {
    return Math.floor(index / this._pageSize);
  }

  private _fetchPage(page: number) {
    if (this._fetchedPages.has(page)) {
      return;
    }
    this._fetchedPages.add(page);

    // Use `setTimeout` to simulate fetching data from server.
    setTimeout(() => {
      this._cachedData.splice(
        page * this._pageSize,
        this._pageSize,
        ...Array.from({ length: this._pageSize }).map(
          (_, i) => `Item #${page * this._pageSize + i}`
        )
      );
      this._dataStream.next(this._cachedData);
    }, Math.random() * 1000 + 200);
  }
}
