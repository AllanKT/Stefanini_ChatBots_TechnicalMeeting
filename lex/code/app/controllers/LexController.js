const CreateTicket = require('../intents/createTicket');
const FindTicket = require('../intents/findTicket');

module.exports = class DialogflowController {
  async action(event) {
    const intent = event.currentIntent.name;

    const intents = {
      'CreatingTicket': new CreateTicket(),
      'Search': new FindTicket(),
    };

    return await intents[intent].run(event);
  }
}
