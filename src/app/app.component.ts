import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'drop-down';
  public selectedItems = [
    { value: 0, itemName: `Item #${0}` },
    { value: 11, itemName: `Item #${11}` },
  ];
  private data = Array.from({ length: 100000 }).map((_, i) => {
    return { value: i, itemName: `Item #${i}` };
  });
  public items: any[] = [];
  public ngOnInit(): void {
    this.createItems();
  }
  private createItems() {
    const filter = this.data.filter(
      (obj) => !this.selectedItems.some((obj2) => obj.value === obj2.value)
    );
    this.items = this.selectedItems.concat(filter);
  }

  public selected(item: any) {
    this.selectedItems;
  }
  public deselected(item: any) {
    this.selectedItems;
  }
  public closed() {
    this.createItems();
  }
  public clear() {
    this.createItems();
  }
}
