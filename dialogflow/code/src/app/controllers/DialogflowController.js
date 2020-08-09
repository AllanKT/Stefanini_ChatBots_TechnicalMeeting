import CreateTicket from '../intents/createTicket';
import FindTicket from '../intents/findTicket';

class DialogflowController {
  async action(req, res) {
    const data = req.body;
    const intent = data.queryResult.intent.displayName;

    const intents = {
      'CriandoChamado - yes': new CreateTicket(),
      'BuscandoChamado': new FindTicket(),
    };

    return res.json(await intents[intent].run(data));
  }
}

export default new DialogflowController();
