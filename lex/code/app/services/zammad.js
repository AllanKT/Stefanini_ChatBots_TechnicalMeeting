const axios = require('axios');
const env = require('../config/variables');

module.exports = class Zammad {

  async create(cpf, body) {
    const data = {
      title: "Technical Meeting Lex",
      group: env.ZAMMAD_GROUP,
      customer: env.ZAMMAD_CUSTOMER,
      cpf: cpf,
      article: {
        subject: "Ticket Open by Bot Lex",
        body: body,
        type: "note",
        content_type: "text/html",
        internal: false
      },
    };
    return await this.call(data, 'api/v1/tickets');
  }

  async call(data, route) {
    return await axios.post(
      `${env.ZAMMAD_HOST}${route}`,
      data,
      {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${env.ZAMMAD_TOKEN}`
        }
      }
    );
  }
}
