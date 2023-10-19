import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
} from '@angular/core';

@Component({
  selector: 'app-select-item',
  templateUrl: './select-item.component.html',
  styleUrls: ['./select-item.component.scss'],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SelectItemComponent implements OnInit {
  @Input() item: any;
  @Input() itemSelected: boolean = false;
  @Input() itemIndex: number = 0;
  @Input() optionText: string  = '';
  @Input() optionValue: string  = '';

  @Output() onClick: EventEmitter<any> = new EventEmitter();

  @Output() onKeydown: EventEmitter<any> = new EventEmitter();

  ngOnInit(): void {}
  onOptionClick(event: any): void {
    this.itemSelected = event.target.checked;
    this.onClick.emit({
      originalEvent: event,
      item: this.item,
      selected: this.itemSelected,
      itemIndex: this.itemIndex,
    });
  }
}
