import axios from 'axios';
import env from '../../config/variable';

class CreateTicket {
  async run(data) {
    try {
      const params = data.queryResult.outputContexts.filter(item => {
        if (item.name.endsWith('criandochamado-followup')) {
          return item.parameters;
        }
      })[0];

      const resp = await axios.post(
        `${env.ZAMMAD_HOST}api/v1/tickets`,
        {
          title: "Chamado aberto vi Bot DialogFlow",
          group: "Users",
          customer: "backoffice@inlira.com.br",
          cpf: params.parameters.Cpf,
          project: params.parameters.Projetos,
          request_call: params.parameters.Chamado,
          article: {
            subject: "Chamado aberto vi Bot DialogFlow",
            body: params.parameters.Message,
          }
        },
        {
          headers: {
            Authorization: `Bearer ${env.ZAMMAD_TOKEN}`
          }
        }
      )

      return {
        fulfillmentText: `Chamado Criado com sucesso! o ID do seu ticket é ${resp.data.id}.`,
      };
    } catch(err) {
      console.error(err)
      return {
        fulfillmentText: "Desculpe, parece que houve um erro ao tentar fazer esse procedimento. Por favor, tente mais tarde novamente."
      }
    }
  }
}

export default CreateTicket;
