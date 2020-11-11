module.exports = `
  -- Option 1: a simple way to fail if you're not inside a transaction
  --SAVEPOINT asdf;

  -- Option 2: compare the timestamp for the current statement with the
  --           timestamp for the current transaction
  SELECT now() != statement_timestamp() AS in_transaction
`;
