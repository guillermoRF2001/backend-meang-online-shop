import { basicAlert } from '@shared/alerts/toasts';
import { GenresService } from './genres.service';
import { ITableColumns } from '@core/interfaces/table-columns.interface';
import { GENRE_LIST_QUERY } from '@graphql/operations/query/genre';
import { Component, OnInit } from '@angular/core';
import { IResultData } from '@core/interfaces/result-data.interface';
import { DocumentNode } from 'graphql';
import { formBasicDialog, optionsWithDetails } from '@shared/alerts/alerts';
import { TYPE_ALERT } from '@shared/alerts/values.config';
import { Router } from '@angular/router';

@Component({
  selector: 'app-genres',
  templateUrl: './genres.component.html',
  styleUrls: ['./genres.component.scss'],
})
export class GenresComponent implements OnInit {
  query: DocumentNode = GENRE_LIST_QUERY;
  context: object;
  itemsPage: number;
  resultData: IResultData;
  include: boolean;
  columns: Array<ITableColumns>;

  constructor(private service: GenresService, private router: Router) {}

  ngOnInit(): void {
    this.context = {};
    this.itemsPage = 15;
    this.resultData = {
      listKey: 'genres',
      definitionKey: 'genres',
    };
    this.include = false;
    this.columns = [
      {
        property: 'id',
        label: '#',
      },
      {
        property: 'name',
        label: 'Nombre del género',
      },
      {
        property: 'slug',
        label: 'slug',
      },
    ];
  }

  async takeAction($event) {
    // Coger la informacion para las acciones.
    const action = $event[0];
    const genre = $event[1];
    // Cogemos el valor por defecto.
    const defaultValue =
      genre.name !== undefined && genre.name !== '' ? genre.name : '';
    const html = `<input id="name" value="${defaultValue}" class="swal2-input" required>`;
    // Teniendo en cuenta el caso, ejecutar una acción.
    switch (action) {
      case 'add':
        // Añadir el item
        this.addForm(html);
        break;

      case 'edit':
        // Editar el item
        this.updateForm(html, genre);
        break;

      case 'info':
        // Informacion del item
        const result = await optionsWithDetails(
          'Detalles',
          `Name: ${genre.name}<br/>
          Slug: ${genre.slug}`,
          400,
          '<i class="bx bxs-edit" style="color: #ffffff"></i> Editar', // true
          '<i class="bx bxs-lock-alt" style="color:#ffffff" ></i> Bloquear' // false
        );
        if (result === true) {
          this.updateForm(html, genre);
        } else if (result === false) {
          this.blockForm(genre);
        }
        break;

      case 'block':
        // Bloquear el item
        this.blockForm(genre);
        break;

      default:
        break;
    }
  }

  private async addForm(html: string) {
    const result = await formBasicDialog('Añadir género', html, 'name');
    this.addGenre(result);
  }

  addGenre(result) {
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

  async updateForm(html: string, genre: any) {
    const result = await formBasicDialog('Modificar género', html, 'name');
    this.updateGenre(genre.id, result);
  }

  updateGenre(id: string, result) {
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

  async blockForm(genre: any) {
    const result = await optionsWithDetails(
      '¿Estas seguro que quieres bloquearlo?',
      `Si bloqueas el genero ${genre.name}, no se volvera a mostrar en la lista.`,
      400,
      '<i class="bx bx-x-circle" style="color:#ffffff"></i> Cancelar',
      '<i class="bx bxs-lock-alt" style="color:#ffffff"></i> Bloquear'
    );
    if (result === false) {
      // Si el resultado es falso, queremos bloquear.
      this.blockGenre(genre.id);
    } else {
      basicAlert(TYPE_ALERT.INFO, 'Operación cancelada');
    }
  }

  blockGenre(id: string) {
    // tslint:disable-next-line: deprecation
    this.service.block(id).subscribe((res: any) => {
      if (res.status) {
        basicAlert(TYPE_ALERT.SUCCESS, res.message);
        this.router.navigate(['admin/genres']);
        return;
      }
      basicAlert(TYPE_ALERT.WARNING, res.message);
    });
  }
}
