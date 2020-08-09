class CreateTicket {
  async run(data) {
    const params = data.queryResult.outputContexts.filter(item => {
      if (item.name.endsWith('criandochamado-followup')) {
        return item.parameters;
      }
    })[0];
    console.log(params);

    return {
      fulfillmentText: 'Chamado Criado com sucesso!',
    };
  }
}

export default CreateTicket;
