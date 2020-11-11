const { assert } = require('chai');

// Some notes:
// 1. SailsJS's transaction() function has some strange behaviours:
//    - https://github.com/balderdashy/sails/issues/6805
//    - https://github.com/balderdashy/sails/issues/7068
// 2. SAVEPOINT will throw an Error if run outside a transaction
// 3. distinction needs to be made between async and non-async functions
describe('sails.getDatastore().transaction()', () => {
  before(done => {
    require('sails').lift(require('sails/accessible/rc')('sails'), done);
  });

  after(done => {
    if(!sails) return done();
    sails.lower(done);
  });

  describe('SAVEPOINT', () => {
    describe('with non-async callback', () => {
      it('should work in closure with body and argument brackets', async () => {
        await sails.getDatastore().transaction((db) => {
          return sails.sendNativeQuery('SAVEPOINT asdf').usingConnection(db);
        });
      });

      it('should work in closure with body but no argument brackets', async () => {
        await sails.getDatastore().transaction(db => {
          return sails.sendNativeQuery('SAVEPOINT asdf').usingConnection(db);
        });
      });

      it('should work in inline closure with argument brackets', async () => {
        await sails.getDatastore().transaction((db) => sails.sendNativeQuery('SAVEPOINT asdf').usingConnection(db));
      });

      it('should work in inline closure without argument brackets', async () => {
        await sails.getDatastore().transaction(db => sails.sendNativeQuery('SAVEPOINT asdf').usingConnection(db));
      });

      it('should work in function', async () => {
        await sails.getDatastore().transaction(function(db) {
          return sails.sendNativeQuery('SAVEPOINT asdf').usingConnection(db);
        });
      });
    });

    describe('with async callback', () => {
      it('should work in closure with body and argument brackets', async () => {
        await sails.getDatastore().transaction(async (db) => {
          return sails.sendNativeQuery('SAVEPOINT asdf').usingConnection(db);
        });
      });

      it('should work in closure with body but no argument brackets', async () => {
        await sails.getDatastore().transaction(async db => {
          return sails.sendNativeQuery('SAVEPOINT asdf').usingConnection(db);
        });
      });

      it('should work in inline closure with argument brackets', async () => {
        await sails.getDatastore().transaction(async (db) => sails.sendNativeQuery('SAVEPOINT asdf').usingConnection(db));
      });

      it('should work in inline closure without argument brackets', async () => {
        await sails.getDatastore().transaction(async db => sails.sendNativeQuery('SAVEPOINT asdf').usingConnection(db));
      });

      it('should work in function', async () => {
        await sails.getDatastore().transaction(async function(db) {
          return sails.sendNativeQuery('SAVEPOINT asdf').usingConnection(db);
        });
      });
    });
  });

  // These tests are here to make sure that any attempt at re-implementation
  // still achieves the basic necessity of returning the result of executing the
  // `during` function.
  describe('return value checks', () => {
    describe('with db arg', () => {
      describe('with non-async callback', () => {
        it('should work in closure with body and argument brackets', async () => {
          const res = await sails.getDatastore().transaction((db) => {
            return db && 'hi';
          });
          assert.equal(res, 'hi');
        });

        it('should work in closure with body but no argument brackets', async () => {
          const res = await sails.getDatastore().transaction(db => {
            return db && 'hi';
          });
          assert.equal(res, 'hi');
        });

        it('should work in inline closure with argument brackets', async () => {
          const res = await sails.getDatastore().transaction((db) => db && 'hi');
          assert.equal(res, 'hi');
        });

        it('should work in inline closure without argument brackets', async () => {
          const res = await sails.getDatastore().transaction(db => db && 'hi');
          assert.equal(res, 'hi');
        });

        it('should work in function', async () => {
          const res = await sails.getDatastore().transaction(function(db) {
            return db && 'hi';
          });
          assert.equal(res, 'hi');
        });
      });

      describe('with async callback', () => {
        it('should work in closure with body and argument brackets', async () => {
          const res = await sails.getDatastore().transaction(async (db) => {
            return db && 'hi';
          });
          assert.equal(res, 'hi');
        });

        it('should work in closure with body but no argument brackets', async () => {
          const res = await sails.getDatastore().transaction(async db => {
            return db && 'hi';
          });
          assert.equal(res, 'hi');
        });

        it('should work in inline closure with argument brackets', async () => {
          const res = await sails.getDatastore().transaction(async (db) => db && 'hi');
          assert.equal(res, 'hi');
        });

        it('should work in inline closure without argument brackets', async () => {
          const res = await sails.getDatastore().transaction(async db => db && 'hi');
          assert.equal(res, 'hi');
        });

        it('should work in function', async () => {
          const res = await sails.getDatastore().transaction(async function(db) {
            return db && 'hi';
          });
          assert.equal(res, 'hi');
        });
      });
    });


    describe('without arguments', () => {
      describe('with non-async callback', () => {
        it('should work in closure with body', async () => {
          const res = await sails.getDatastore().transaction(() => {
            return 'hi';
          });
          assert.equal(res, 'hi');
        });

        it('should work in inline closure', async () => {
          const res = await sails.getDatastore().transaction(() => 'hi');
          assert.equal(res, 'hi');
        });

        it('should work in sync function', async () => {
          const res = await sails.getDatastore().transaction(function() {
            return 'hi';
          });
          assert.equal(res, 'hi');
        });
      });

      describe('with async callback', () => {
        it('should work in closure with body', async () => {
          const res = await sails.getDatastore().transaction(async () => {
            return 'hi';
          });
          assert.equal(res, 'hi');
        });

        it('should work in inline closure', async () => {
          const res = await sails.getDatastore().transaction(async () => 'hi');
          assert.equal(res, 'hi');
        });

        it('should work in sync function', async () => {
          const res = await sails.getDatastore().transaction(async function() {
            return 'hi';
          });
          assert.equal(res, 'hi');
        });
      });
    });
  });
});
