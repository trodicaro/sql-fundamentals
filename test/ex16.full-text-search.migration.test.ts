import { assert } from 'chai';
import { suite, test } from 'mocha-typescript';

import { getDb } from '../src/db/utils';

import './helpers/global-hooks';
import { assertMigrationCount } from './helpers/migrations';

@suite('EX16: "Full Text Search" - Migration test')
class FullTextSearchMigrationTest {
  @test('New .sql file based migration exists in the ./migrations folder')
  public async migrationExists() {
    assertMigrationCount(9);
  }

  @test(
    'product_fts, customer_fts, employee_fts and supplier_fts indices are found'
  )
  public async productIndicesPresent() {
    let db = await getDb();
    assert.includeMembers(
      (await db.getIndicesForTable('Product')).map(s => s.toLowerCase()),
      ['product_fts']
    );
    assert.includeMembers(
      (await db.getIndicesForTable('Customer')).map(s => s.toLowerCase()),
      ['customer_fts']
    );
    assert.includeMembers(
      (await db.getIndicesForTable('Supplier')).map(s => s.toLowerCase()),
      ['supplier_fts']
    );
    assert.includeMembers(
      (await db.getIndicesForTable('Employee')).map(s => s.toLowerCase()),
      ['employee_fts']
    );
  }
}
