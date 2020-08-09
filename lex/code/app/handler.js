const DialogflowController = require('./controllers/DialogflowController');

module.exports.main = async event => {
  try {
    console.log(event);
    console.log(`event.bot.name: ${event.bot.name}`);
    return await new DialogflowController().action(event);
  } catch (err) {
    console.log(err)
    return err;
  }
};

// open incident from website