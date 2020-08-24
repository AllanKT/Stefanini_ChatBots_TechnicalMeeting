import axios from 'axios';
import env from '../../config/variable';

class CreateTicket {
  async run(data) {
    try {
      const params = data;
      if (data.confirm === 'não') {
        return { response: "Ok! posso lhe ajudar em mais alguma coisa? Você quer abrir ou consultar um chamado?" }
      }

      const resp = await axios.post(
        `${env.ZAMMAD_HOST}api/v1/tickets`,
        {
          title: "Chamado aberto vi Bot DialogFlow",
          group: "Users",
          customer: "backoffice@inlira.com.br",
          cpf: params.cpf,
          project: params.project,
          request_call: params.tickets,
          article: {
            subject: "Chamado aberto vi Bot DialogFlow",
            body: params.message,
          }
        },
        {
          headers: {
            Authorization: `Bearer ${env.ZAMMAD_TOKEN}`
          }
        }
      )

      return {
        response: `Chamado Criado com sucesso! o ID do seu ticket é ${resp.data.id}.`,
      };
    } catch(err) {
      console.error(err)
      return {
        response: "Desculpe, parece que houve um erro ao tentar fazer esse procedimento. Por favor, tente mais tarde novamente."
      }
    }
  }
}

export default CreateTicket;
