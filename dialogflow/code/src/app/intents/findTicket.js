class FindTicket {
  async run(data) {
    const params = data.queryResult.parameters;
    console.log(params);

    return {
      fulfillmentText: 'Seus chamados são:',
    };
  }
}

export default FindTicket;
