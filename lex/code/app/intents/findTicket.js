const lexResponses = require("../services/lexResponse");
const axios = require('axios');
const env = require('../config/variables');

module.exports = class FindTicket {
  async run(event) {
    const tickets = []
    const params = event.currentIntent.slots;

    const resp = await axios.get(
      `${env.ZAMMAD_HOST}api/v1/tickets/search?query=state:new&expand=true&page=1&per_page=100`,
      { headers: { Authorization: `Bearer ${env.ZAMMAD_TOKEN}` } }
    )

    resp.data.map(item => {
      if (item.cpf === params.cpf) {
        tickets.push(`• ID: ${item.id}, Title: ${item.title}`)
      }
    });

    return lexResponses.confirmIntent(
      event.sessionAttributes,
      event.currentIntent.name,
      params,
      {
        contentType: "PlainText",
        content: `Seus chamados são: ${tickets.join(" | ")}`
      },
    );

  }
};
