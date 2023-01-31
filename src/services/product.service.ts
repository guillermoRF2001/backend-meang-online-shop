import { COLLECTIONS } from '../config/constants';
import ResolversOperationsService from './resolvers-operations.service';

class ProductsService extends ResolversOperationsService {
    private collectionGenre = COLLECTIONS.PRODUCTS;
    constructor(root: object, variables: object, context: object) {
      super(root, variables, context);
    }

    async details() {
        const result = await this.get(this.collectionGenre);
        return {
          status: result.status,
          message: result.message,
          product: result.item,
        };
      }
}

export default ProductsService;