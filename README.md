# SailsJS PostgreSQL transactionmaybe

Example [SailsJS](https://sailsjs.com/) project demonstrating that calling [`datastore.transaction(fn)`](https://sailsjs.com/documentation/reference/waterline-orm/datastores/transaction) when using the [`sails-postgresql`](https://www.npmjs.com/package/sails-postgresql) adapter for [Waterline](https://waterlinejs.org) **doesn't** guarantee that `fn` will be run inside a database transaction.

# Running

# Experiencing

```sh
yarn
yarn start
curl localhost:1337/1
curl localhost:1337/2
```

# Exploring

Modify `query.sql.js` to try different queries run under different "transactional" circumstances, and their differing results.
