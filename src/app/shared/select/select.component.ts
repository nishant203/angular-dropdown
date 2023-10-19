import { CommonModule } from '@angular/common';
import { ObjectUtils } from './../../utils/ObjectUtils';
import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  Output,
  ViewChild,
} from '@angular/core';

import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { MatChipsModule } from '@angular/material/chips';
import {MatIconModule} from '@angular/material/icon';

import { SelectItemComponent } from './select-item/select-item.component';
import {
  CdkVirtualScrollViewport,
  ScrollingModule,
} from '@angular/cdk/scrolling';
import { OverlayModule } from '@angular/cdk/overlay';

@Component({
  selector: 'app-select',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.scss'],
  imports: [
    MatChipsModule,
    MatIconModule,
    CommonModule,
    OverlayModule,
    ScrollingModule,
    SelectItemComponent,
  ],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: SelectComponent,
      multi: true,
    },
    CdkVirtualScrollViewport,
  ],
})
export class SelectComponent implements ControlValueAccessor {
  @Input() set items(value: any[]) {
    this.original = JSON.parse(JSON.stringify(value));
    this._items = value;
  }
  @Input() optionText: string = '';
  @Input() optionValue: string = '';
  @Output() onSelect: EventEmitter<any> = new EventEmitter();
  @Output() onDeselect: EventEmitter<any> = new EventEmitter();
  @Output() onSearch: EventEmitter<any> = new EventEmitter();
  @Output() onClear: EventEmitter<any> = new EventEmitter();
  @Output() onClose: EventEmitter<any> = new EventEmitter();

  @ViewChild('multiSelectInput') multiSelectDropdown!: ElementRef;

  public get items(): any[] {
    return this._items;
  }

  private _items: any[] = [];
  private original = this.items;

  public isOpen = false;

  public value: any[] = [];

  public overlayWidth: number = 0;

  public onChange = (item: any) => {};

  public onTouched = () => {};

  constructor() {}

  public search(event: any): void {
    const { value } = event.target;
    this.filterItems(value);
    this.onSearch.emit(event);
  }
  private filterItems(value: string): void {
    const searchField = this.optionText ? this.optionText : 'label';
    if (value) {
      this._items = this.original.filter((x: any) =>
        x[searchField].toLocaleLowerCase().includes(value.toLocaleLowerCase())
      );
    } else {
      this._items = this.original;
    }
  }

  public open(): void {
    this.overlayWidth = (
      this.multiSelectDropdown.nativeElement as HTMLInputElement
    ).getBoundingClientRect().width;
    this.isOpen = true;
  }

  public close(): void {
    this.isOpen = false;
    (this.multiSelectDropdown.nativeElement as HTMLInputElement).value = '';
    this.filterItems('');
    this.onClose.emit();
  }
  public clear(): void {
    (this.multiSelectDropdown.nativeElement as HTMLInputElement).value = '';
    this.value.length = 0;
    this.onChange(this.value);
    this.filterItems('');
    this.onClear.emit();
  }

  public onItemClick(event: any): void {
    if (event.selected) {
      this.value.push(event.item);
      this.onChange(this.value);
      this.onSelect.emit(event);
    } else {
      const index = this.findSelectionIndex(event.item)
      this.value.splice(index, 1);
      this.onChange(this.value);
      this.onDeselect.emit(event);
    }
  }
  public isSelected(option: any): boolean {
    return this.findSelectionIndex(option) != -1;
  }
  public findSelectionIndex(val: any): number {
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

  public writeValue(selectedItems: any[]): void {
    this.value = selectedItems;
  }

  public registerOnChange(onChange: any): void {
    this.onChange = onChange;
  }

  public registerOnTouched(onTouched: any): void {
    this.onTouched = onTouched;
  }
}
