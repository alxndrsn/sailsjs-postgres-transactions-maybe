# SailsJS PostgreSQL transactionmaybe

Example [SailsJS](https://sailsjs.com/) project demonstrating that calling [`datastore.transaction(fn)`](https://sailsjs.com/documentation/reference/waterline-orm/datastores/transaction) when using the [`sails-postgresql`](https://www.npmjs.com/package/sails-postgresql) adapter for [Waterline](https://waterlinejs.org) **doesn't** guarantee that `fn` will be run inside a database transaction.

# Experiencing

```sh
yarn
POSTGRES_URL=postgres://user:password@hostname:post/db-name yarn start
curl localhost:1337/1
curl localhost:1337/2
```

OR

```sh
yarn
POSTGRES_URL=postgres://user:password@hostname:post/db-name yarn test
```

# Exploring

* Modify `query.sql.js` to try different queries run under different "transactional" circumstances, and their differing results.
* Take a look in the `test/` directory.
