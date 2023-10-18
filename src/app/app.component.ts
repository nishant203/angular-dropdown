import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'drop-down';
  public selectedItems = [{value: 0, label: `Item #${0}`}, {value: 1, label: `Item #${1}`}];
  public items = Array.from({ length: 100000 }).map((_, i) => {
    return { value: i, label: `Item #${i}` };
  });
}
