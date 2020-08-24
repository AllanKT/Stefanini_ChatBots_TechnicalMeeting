import CreateTicket from '../intents/createTicket';
import FindTicket from '../intents/findTicket';

class DialogflowController {
  async action(req, res) {
    try {
      const data = req.body;
      const intent = data.queryResult.intent.displayName;
  
      const intents = {
        'CriandoChamado - yes': new CreateTicket(),
        'BuscandoChamado': new FindTicket(),
      };
  
      return res.json(await intents[intent].run(data));
    } catch (err) {
      console.log(err)
      return res.json({
        fulfillmentText: "Desculpe, parece que houve um erro ao tentar fazer esse procedimento. Por favor, tente mais tarde novamente."
      })
    }
    
  }
}

export default new DialogflowController();
