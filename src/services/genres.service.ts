import { findOneElement, asignDocumentId } from './../lib/db-operations';
import { ACTIVE_VALUES_FILTER, COLLECTIONS } from './../config/constants';
import { IContextData } from './../interfaces/context-data.interface';
import ResolversOperationsService from './resolvers-operations.service';
import slugify from 'slugify';

class GenresService extends ResolversOperationsService {
  collectionGenre = COLLECTIONS.GENRES;
  constructor(root: object, variables: object, context: IContextData) {
    super(root, variables, context);
  }

  async items(active: string = ACTIVE_VALUES_FILTER.ACTIVE) {
    let filter: object = { active: {$ne: false}};
    if (active === ACTIVE_VALUES_FILTER.ALL) {
      filter = {};
    } else if (active === ACTIVE_VALUES_FILTER.INACTIVE) {
      filter = { active: false };
    }
    const page = this.getVariables().pagination?.page;
    const itemsPage = this.getVariables().pagination?.itemsPage;
    const result = await this.list(this.collectionGenre, 'géneros', page, itemsPage, filter);
    return {
      info: result.info,
      status: result.status,
      message: result.message,
      genres: result.items,
    };
  }

  async details() {
    const result = await this.get(this.collectionGenre);
    return {
      status: result.status,
      message: result.message,
      genre: result.item,
    };
  }

  async insert() {
    const genre = this.getVariables().genre;
    // Comprobar que no esta en blanco ni es indefinido
    if (!this.checkData(genre || '')) {
      return {
        status: false,
        message: 'El genero no se ha especificado correctamente',
        genre: null,
      };
    }
    // Comprobar que no existe.
    if (await this.checkInDatabase(genre || '')) {
      return {
          status: false,
          message: 'El género existe en la base de datos, intenta con otro género',
          genre: null
      };
    }
    // Si valida las opciones anteriores, venir aquí y crear el documento.
    const genreObject = {
      id: await asignDocumentId(this.getDb(), this.collectionGenre, { id: -1 }),
      name: genre,
      slug: slugify(genre || '', { lower: true }),
    };
    const result = await this.add(this.collectionGenre, genreObject, 'género');
    return {
      status: result.status,
      message: result.message,
      genre: result.item,
    };
  }

  async modify() {
    const id = this.getVariables().id;
    const genre = this.getVariables().genre;
    // Comprobar que el id es correcto.
    if (!this.checkData(String(id) || '')) {
      return {
        status: false,
        message: 'El ID del genero no se ha especificado correctamente',
        genre: null,
      };
    }
    // Comprobar que no existe.
    if (!this.checkData(genre || '')) {
      return {
        status: false,
        message: 'El genero existe en la base de datos,por favor introduzca otro genero.',
        genre: null,
      };
    }
    const objectUpdate = {
      name: genre,
      slug: slugify(genre || '', { lower: true })
    };
    // Comprobar que el genero es correcto.
    const result = await this.update(
      this.collectionGenre,
      { id },
      objectUpdate,
      'género'
    );
    return {
      status: result.status,
      message: result.message,
      genre: result.item,
    };
  }

  async delete() {
    const id = this.getVariables().id;
    // Comprobar que el id es correcto.
    if (!this.checkData(String(id) || '')) {
      return {
        status: false,
        message: 'El ID del genero no se ha especificado correctamente',
        genre: null,
      };
    }
    const result = await this.del(
        this.collectionGenre,
        { id },
        'género'
      );
    return {
        status: result.status,
        message: result.message
      };
  }

  async unblock(unblock: boolean = false) {
    const id = this.getVariables().id;
    // Comprobar que el id es correcto.
    if (!this.checkData(String(id) || '')) {
      return {
        status: false,
        message: 'El ID del genero no se ha especificado correctamente',
        genre: null,
      };
    }
    const result = await this.update(
        this.collectionGenre,
        { id },
        {active: unblock},
        'género'
      );
    const action = (unblock) ? 'Desbloqueado' : 'Bloqueado';
    return {
      status: result.status,
      message: (result.status) ? `${action} correctamente.`: `No se ha ${action.toLowerCase()} comprobarlo por favor.`,
    };
  }

  private checkData(value: string) {
    return (value === '' || value === undefined) ? false: true;
  }

  private async checkInDatabase(value: string) {
    return await findOneElement(this.getDb(), this.collectionGenre, {
      name: value,
    });
  }
}

export default GenresService;
