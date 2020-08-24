const lexResponses = require("../services/lexResponse");
const axios = require('axios');
const env = require('../config/variables');

module.exports = class CreateTicket {
  async run(event) {
    const params = event.currentIntent.slots;

    const ticket = await axios.post(
      `${env.ZAMMAD_HOST}api/v1/tickets`,
      {
        title: "Chamado aberto vi Bot Lex",
        group: "Users",
        customer: "backoffice@inlira.com.br",
        cpf: params.cpf,
        project: params.project,
        request_call: params.ticket,
        article: {
          subject: "Chamado aberto vi Bot Lex",
          body: params.message,
        },
      },
      {
        headers: { 'Authorization': `Bearer ${env.ZAMMAD_TOKEN}` }
      }
    );

    return lexResponses.confirmIntent(
      event.sessionAttributes,
      event.currentIntent.name,
      params,
      {
        contentType: "PlainText",
        content: `Ticket created successfully! Your id is ${ticket.data.id} and number ${ticket.data.number}.`
      }
    );
  }
};
