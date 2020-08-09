import { GraphQLClient } from 'graphql-request';
import { jsonToGraphQLQuery } from 'json-to-graphql-query';

import env from '../../config/variable';

class Zammad {

  async createPerson(name, cpf, phone, birth) {
    const query = {
        mutation: {
            createPerson: {
            __args: {
            cpf: cpf,
            phone: phone,
            name: name,
            birth: birth
            },
            id: true,
            cpf: true,
            phone: true,
            name: true,
            birth: true,
        },
        },
    };

    return await this.call(query);
  }

  async call(query) {
    const graphqlQuery = jsonToGraphQLQuery(query, { pretty: true });
    const client = new GraphQLClient(env.VALIDATION_HOST);
    return client.request(graphqlQuery);
  }
}

export default new Zammad();
