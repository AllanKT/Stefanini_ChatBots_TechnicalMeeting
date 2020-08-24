const LexController = require('./controllers/LexController');

module.exports.main = async event => {
  try {
    console.log(event);
    console.log(`event.bot.name: ${event.bot.name}`);
    return await new LexController().action(event);
  } catch (err) {
    console.log(err)
    return err;
  }
};
