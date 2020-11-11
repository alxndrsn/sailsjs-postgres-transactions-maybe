module.exports = {
  fn: async function(inputs, exits) {

    const res = await sails
      .getDatastore()
      .transaction(async (db) => {
        const ret = await sails
          .getDatastore()
          .sendNativeQuery(require('../../query.sql'))
          .usingConnection(db);
        return ret;
      });

    return exits.success({ completed:true, res });
  },
};
