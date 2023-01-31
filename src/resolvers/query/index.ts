import GMR from 'graphql-merge-resolvers';
import resolversDashboardQuery from './dashboard';
import resolversGenreQuery from './genre';
import resolversShopProductQuery from './shop-product';
import queryStripeResolvers from './stripe';
import resolversTagQuery from './tag';
import resolversUserQuery from './user';

const queryResolvers = GMR.merge([
    resolversUserQuery,
    resolversShopProductQuery,
    resolversGenreQuery,
    resolversTagQuery,
    queryStripeResolvers,
    resolversDashboardQuery
]);

export default queryResolvers;