import CreateTicket from '../intents/createTicket';
import FindTicket from '../intents/findTicket';

class WatsonController {
  async action(req, res) {
    try {
      const data = req.body;
      const intent = data.action;

      const intents = {
        'CreateTicket': new CreateTicket(),
        'SearchTicket': new FindTicket(),
      };

      return res.json(await intents[intent].run(data));
    } catch (err) {
      console.log(err)
      return res.json({
        response: "Desculpe, parece que houve um erro ao tentar fazer esse procedimento. Por favor, tente mais tarde novamente."
      })
    }
    
  }
}

export default new WatsonController();
