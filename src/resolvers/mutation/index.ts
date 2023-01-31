import GMR from 'graphql-merge-resolvers';
import resolversMailMutation from './email';
import resolversGenreMutation from './genre';
import mutationStripeResolvers from './stripe';
import resolversTagMutation from './tag';
import resolversUserMutation from './user';
import resolversShopProductMutation from './shop-product';

const mutationResolvers = GMR.merge([
    resolversUserMutation,
    resolversGenreMutation,
    resolversTagMutation,
    resolversMailMutation,
    mutationStripeResolvers,
    resolversShopProductMutation
]);

export default mutationResolvers;