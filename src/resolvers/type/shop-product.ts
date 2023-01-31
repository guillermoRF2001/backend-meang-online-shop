import { COLLECTIONS } from './../../config/constants';
import { findElements } from './../../lib/db-operations';
import { IResolvers } from 'graphql-tools';
import PlatformService from '../../services/platform.service';
import ProductsService from '../../services/product.service';

const resolversShopProductType: IResolvers = {
  ShopProduct: {
    productId: (parent) => parent.product_id,
    platformId: (parent) => parent.platform_id,
    product: async (parent, __, { db }) => {
      const result = await new ProductsService(
        {},
        { id: parent.product_id },
        { db }
      ).details();
      return result.product;
    },
    platform: async (parent, __, { db }) => {
        const result = await new PlatformService(
          {},
          { id: parent.platform_id },
          { db }
        ).details();
        return result.platform;
    },
    relationalProducts: async (parent, __, { db }) => {
      return findElements(
        db,
        COLLECTIONS.SHOP_PRODUCT,
        {
          $and: [
            { product_id: parent.product_id},
            { id: {$ne: parent.id}}
          ]
        }
      );
    }
  },
};

export default resolversShopProductType;
