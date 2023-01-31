import { IResolvers } from 'graphql-tools';
import UsersService from '../../services/users.service';

const resolversUserQuery: IResolvers = {
    Query: {
        //comprueba si ha cargado correctamente la lista de usuarios.
        async users(_, { page, itemsPage, active }, context) {
            return new UsersService(_, {pagination: { page, itemsPage }}, context).items(active);

        },
        //comprueba si el correo y la contraseña son correctas.
        async login(_, {email, password}, context) {
            return new UsersService(_, {user: { email, password }}, context).login();
        },
        me(_, __, { token }) {
           return new UsersService(_, __, {token}).auth();
        },
    },
};

export default resolversUserQuery;