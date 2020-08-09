const lexResponses = require("../services/lexResponse");
const Zammad = require('../services/zammad');

module.exports = class CreateTicket {
  async run(event) {
    const params = event.currentIntent.slots;
    const body = `
      <h3>Ticket aberto via Bot</h3>
      <ul>
        <li>Tipo: ${params.ticket}</li>
        <li>Projeto: ${params.project}</li>
        <li>Cpf: ${params.cpf}</li>
        <li>Message: ${params.message}</li>
      </ul>
    `

    const ticket = await new Zammad().create(params.cpf, body);

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
