import { TAG_LIST_QUERY } from '@graphql/operations/query/tag';
import { Component, OnInit } from '@angular/core';
import { ITableColumns } from '@core/interfaces/table-columns.interface';
import { DocumentNode } from 'graphql';
import { IResultData } from '@core/interfaces/result-data.interface';
import { TagsService } from './tags.service';
import { optionsWithDetails, formBasicDialog } from '@shared/alerts/alerts';
import { basicAlert } from '@shared/alerts/toasts';
import { TYPE_ALERT } from '@shared/alerts/values.config';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tags',
  templateUrl: './tags.component.html',
  styleUrls: ['./tags.component.scss']
})
export class TagsComponent implements OnInit {

  query: DocumentNode = TAG_LIST_QUERY;
  context: object;
  itemsPage: number;
  resultData: IResultData;
  include: boolean;
  columns: Array<ITableColumns>;

  constructor(private service: TagsService, private router: Router) {}

  ngOnInit(): void {
    this.context = {};
    this.itemsPage = 15;
    this.resultData = {
      listKey: 'tags',
      definitionKey: 'tags',
    };
    this.include = false;
    this.columns = [
      {
        property: 'id',
        label: '#',
      },
      {
        property: 'name',
        label: 'Tag',
      },
      {
        property: 'slug',
        label: 'Slug',
      },
    ];
  }
  async takeAction($event) {
    // Coger la información para las acciones
    const action = $event[0];
    const tag = $event[1];
    // Cogemos el valor por defecto
    const defaultValue =
      tag.name !== undefined && tag.name !== '' ? tag.name : '';
    const html = `<input id="name" value="${defaultValue}" class="swal2-input" required>`;
    // Teniendo en cuenta el caso, ejecutar una acción
    switch (action) {
      case 'add':
        // Añadir el item
        this.addForm(html);
        break;
      case 'edit':
        this.updateForm(html, tag);
        break;
      case 'info':
        const result = await optionsWithDetails(
          'Detalles',
          `Name: ${tag.name}<br/>
          Slug: ${tag.slug}`,
          400,
          '<i class="bx bxs-edit" style="color: #ffffff"></i> Editar', // true
          '<i class="bx bxs-lock-alt" style="color:#ffffff" ></i> Bloquear' // false
        );
        if (result === true) {
          this.updateForm(html, tag);
        } else if (result === false) {
          this.blockForm(tag);
        }
        break;
      case 'block':
        this.blockForm(tag);
        break;
      default:
        break;
    }
  }
  private async addForm(html: string) {
    const result = await formBasicDialog('Añadir tag', html, 'name');
    this.addtag(result);
  }

  private addtag(result) {
    if (result.value) {
      // tslint:disable-next-line: deprecation
      this.service.add(result.value).subscribe((res: any) => {
        if (res.status) {
          basicAlert(TYPE_ALERT.SUCCESS, res.message);
          return;
        }
        basicAlert(TYPE_ALERT.WARNING, res.message);
      });
    }
  }

  private async updateForm(html: string, tag: any) {
    const result = await formBasicDialog('Modificar tag', html, 'name');
    this.updateTag(tag.id, result);
  }

  private updateTag(id: string, result) {
    if (result.value) {
      // tslint:disable-next-line: deprecation
      this.service.update(id, result.value).subscribe((res: any) => {
        if (res.status) {
          basicAlert(TYPE_ALERT.SUCCESS, res.message);
          return;
        }
        basicAlert(TYPE_ALERT.WARNING, res.message);
      });
    }
  }

  private blockTag(id: string) {
    // tslint:disable-next-line: deprecation
    this.service.block(id).subscribe((res: any) => {
      if (res.status) {
        this.router.navigate(['admin/tags']);
        basicAlert(TYPE_ALERT.SUCCESS, res.message);
        return;
      }
      basicAlert(TYPE_ALERT.WARNING, res.message);
    });
  }

  private async blockForm(tag: any) {
    const result = await optionsWithDetails(
      '¿Bloquear?',
      `Si bloqueas el item seleccionado, no se mostrará en la lista`,
      430,
      'No, no bloquear',
      'Si, bloquear'
    );
    if (result === false) {
      // Si resultado falso, queremos bloquear
      this.blockTag(tag.id);
    }
  }

}
