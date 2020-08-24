import axios from 'axios';
import env from '../../config/variable';

class FindTicket {
  async run(data) {
    try {
      const tickets = []
      const params = data;
      console.log(data)

      const resp = await axios.get(
        `${env.ZAMMAD_HOST}api/v1/tickets/search?query=state:new&expand=true&page=1&per_page=100`,
        { headers: { Authorization: `Bearer ${env.ZAMMAD_TOKEN}` } }
      )
  
      resp.data.map(item => {
        if (item.cpf === params.cpf.toString()) {
          tickets.push(`• ID: ${item.id}, Title: ${item.title}`)
        }
      });

      return tickets.length ? {
        context: { cpf: null },
        response: `Seus chamados são: ${tickets.join(" | ")}`
      } : {
        context: { cpf: null },
        response: "Não consegui encontrar nenhum ticket associado a você. Posso lhe ajudar em mais alguma coisa? Você quer abrir ou consultar um chamado?"
      };
    } catch(err) {
      console.error(err)
      return {
        context: { cpf: null },
        response: "Desculpe, parece que houve um erro ao tentar fazer esse procedimento. Por favor, tente mais tarde novamente."
      }
    }
  }
}

export default FindTicket;
