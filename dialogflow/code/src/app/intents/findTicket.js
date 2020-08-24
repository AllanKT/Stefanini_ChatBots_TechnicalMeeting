import axios from 'axios';
import env from '../../config/variable';

class FindTicket {
  async run(data) {
    try {
      const tickets = []
      const params = data.queryResult.parameters;

      const resp = await axios.get(
        `${env.ZAMMAD_HOST}api/v1/tickets/search?query=state:new&expand=true&page=1&per_page=100`,
        {
          headers: {
            Authorization: `Bearer ${env.ZAMMAD_TOKEN}`
          }
        }
      )

      resp.data.map(item => {
        if (item.cpf === params.Cpf) {
          tickets.push({ text: { text: [ `• ID: ${item.id} | Title: ${item.title}` ] } })
        }
      });

      return tickets.length ? {
        fulfillmentMessages: [ {text: { text: [ "Seus chamados são:" ] }}, ...tickets ]
      } : {
        fulfillmentMessages: [
          {text: {text: ["Não consegui encontrar nenhum ticket associado a você. Posso lhe ajudar em mais alguma coisa?"]}},
          {text: {text: ["Você quer abrir ou consultar um chamado?"]}}
        ]
      };
    } catch(err) {
      console.error(err)
      return {
        fulfillmentText: "Desculpe, parece que houve um erro ao tentar fazer esse procedimento. Por favor, tente mais tarde novamente."
      }
    }
  }
}

export default FindTicket;
