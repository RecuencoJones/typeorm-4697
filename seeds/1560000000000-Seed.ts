import { MigrationInterface, QueryRunner } from 'typeorm';
import { Item } from '../entities/item.entity';
import { Config } from '../entities/config.entity';

function createItem({ contact }) {
  const item = new Item();

  item.contact = contact;

  return item;
}

function createConfig({ itemId, data = {} }) {
  const config = new Config();

  config.itemId = itemId;
  config.data = data;

  return config;
}

export class Seed1560000000000 implements MigrationInterface {

  public async up({ connection }: QueryRunner): Promise<any> {
    const itemRepository = connection.getMongoRepository(Item);
    const configRepository = connection.getMongoRepository(Config);

    const items = [
      createItem({ contact: 'someone@test.com' }),
      createItem({ contact: 'someone-else@test.com' })
    ]

    await itemRepository.save(items);

    const configs = [
      createConfig({
        itemId: items[0]._id,
        data: { prop: 'foo' }
      }),
      createConfig({
        itemId: items[1]._id,
        data: { prop: 'bar' }
      })
    ];

    await configRepository.save(configs);
  }

  public async down(_queryRunner: QueryRunner): Promise<any> {}

}
