import { countElements } from './db-operations';
import { Db } from 'mongodb';

export async function pagination(
  db: Db,
  collection: string,
  page: number = 1,
  itemsPage: number = 20,
  filter: object = {},
) {
    // Comprobar el numero de items por pagina.
    if (itemsPage < 1 || itemsPage > 20) {
        itemsPage = 20;
    }
    if ( page < 1 ){
        page = 1;
    }
    const total = await countElements(db, collection, filter);
    const pages = await Math.ceil(total / itemsPage);
    return {
        page,
        skip: (page - 1) * itemsPage,
        itemsPage,
        total,
        pages
    };
}
