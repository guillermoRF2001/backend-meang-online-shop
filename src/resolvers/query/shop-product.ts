import { IResolvers } from 'graphql-tools';
import ShopProductsService from '../../services/shop-product.service';

const resolversShopProductQuery: IResolvers = {
    Query: {
        async shopProducts(_, {page, itemsPage, active}, context) {
            return new ShopProductsService(_, {pagination: { page, itemsPage }}, context).items(active);
        },
        async shopProductsPlatforms(_, {page, itemsPage, active, platform, random}, context) {
            return new ShopProductsService(_, {pagination: { page, itemsPage }}, context).items(active, platform, random);
        },
        async shopProductsOffersLast(_, {page, itemsPage, active, random, topPrice, lastUnits}, context) {
            let otherFilters = {};
            if (lastUnits > 0 && topPrice > 10){
                otherFilters = {
                    $and: [
                        {price: {$lte: topPrice}},
                        {stock: {$lte: topPrice}}
                    ]
                };
            } else if(lastUnits <= 0 && topPrice > 10){
                otherFilters = {price: {$lte: topPrice}};
            } else if(lastUnits > 0 && topPrice <= 10){
                otherFilters = {stock: {$lte: lastUnits}};
            }
            return new ShopProductsService(_, {pagination: { page, itemsPage }}, context).items(active, ['-1'], random, otherFilters);
        },
        shopProductDetails(_, {id}, context) {
            return new ShopProductsService(_, { id }, context).details();
        }
    },
};

export default resolversShopProductQuery;