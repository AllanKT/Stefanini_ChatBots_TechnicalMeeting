const lexResponses = require("../services/lexResponse");

module.exports = class FindTicket {
  async run(event) {
    const params = event.currentIntent.slots;

    return lexResponses.elicitSlot(
      event.sessionAttributes,
      event.currentIntent.name,
      params,
      event.recentIntentSummaryView[0].slotToElicit,
      {
        contentType: "PlainText",
        content: "Seus chamados são:"
      },
      null,
      null,
      null
    );
  }
};
