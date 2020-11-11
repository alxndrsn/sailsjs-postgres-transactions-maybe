module.exports = {
  fn: async function(inputs, exits) {

    const res = await sails
      .getDatastore()
      .transaction(db =>
        sails
          .getDatastore()
          .sendNativeQuery(require('../../query.sql'))
          .usingConnection(db)
      );

    return exits.success({ completed:true, res });
  },
};
