import { COLLECTIONS } from '../config/constants';
import ResolversOperationsService from './resolvers-operations.service';

class PlatformService extends ResolversOperationsService {
    private collectionGenre = COLLECTIONS.PLATFORMS;
    constructor(root: object, variables: object, context: object) {
      super(root, variables, context);
    }

    async details() {
        const result = await this.get(this.collectionGenre);
        return {
          status: result.status,
          message: result.message,
          platform: result.item,
        };
      }
}

export default PlatformService;