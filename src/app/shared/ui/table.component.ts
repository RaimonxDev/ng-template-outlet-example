import { CommonModule } from '@angular/common';
import {
  Component,
  ContentChild,
  Input,
  NgModule,
  TemplateRef,
} from '@angular/core';

@Component({
  selector: 'app-table',
  template: `
    <table>
      <thead>
        <tr>
          <ng-container
            *ngTemplateOutlet="
              headers || defaultHeaderTemplate;
              context: { $implicit: data2 }
            "
          ></ng-container>
        </tr>
      </thead>
      <tbody>
        <tr *ngFor="let row2 of data2">
          <ng-container
            *ngTemplateOutlet="
              rows || defaultRowTemplate;
              context: { $implicit: row2 }
            "
          ></ng-container>
        </tr>
      </tbody>
    </table>

    <!-- If no template is provided use keys as headers and display all values -->
    <ng-template #defaultHeaderTemplate let-data>
      <button (click)="view(data, 'default header')">DATA</button>
      <th *ngFor="let header of data[0] | keyvalue">{{ header.key }}</th>
    </ng-template>

    <ng-template #defaultRowTemplate let-rows>
      <button (click)="view(rows, 'default, row')">DATA</button>
        <!-- Como no sabemos el que tipo es row o propiedades tiene, usamos ngFor para usar el pipe keyvalue
      este devuelve un map y podemos acceder a una key o una value, en este caso usamos el value de x valor que estemos pasando en poca palabras funciona cuando no sabemos como viene la data
      -->
      <td *ngFor="let row of rows | keyvalue">{{ row.value }}</td>
    </ng-template>
  `,
  styles: [
    `
      ::ng-deep table {
        width: 100%;
        margin: 2rem 0;
        border-collapse: collapse;
        font-family: sans-serif;
        box-shadow: 0 0 20px rgba(0, 0, 0, 0.15);

        thead {
          tr {
            background-color: #dd0031;
            color: #ffffff;
            text-align: left;
          }
        }

        tbody tr:hover {
          background-color: #f6f6f6;
        }

        th,
        td {
          padding: 1rem;
        }
      }
    `,
  ],
})
export class TableComponent {
  @Input() data2!: any[];
  @ContentChild('headers') headers: TemplateRef<any> | undefined;
  @ContentChild('rows') rows: TemplateRef<any> | undefined;

  view(data: any, value: string) {
    console.log(data, value);
  }
}

@NgModule({
  imports: [CommonModule],
  declarations: [TableComponent],
  exports: [TableComponent],
})
export class TableComponentModule { }
