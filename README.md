# [typeorm #4697](https://github.com/typeorm/typeorm/issues/4697)

## Spin up a mongo instance

```
docker run -dit --name mongo -p 27017:27017 mongo:4.0
```

## Populate database

```
npm run seed
```

## Run migrations

```
npm run migrate
```

## Revert last migration

```
npm run revert
```

## Observed behavior

```
[09:50:34] RecuencoJones@localhost:typeorm-migration-issue
$> npm run seed

> @ seed /Users/RecuencoJones/Workspace/Scratch/typeorm-migration-issue
> npm run build && typeorm migration:run -f ormconfig.seed.yml


> @ build /Users/RecuencoJones/Workspace/Scratch/typeorm-migration-issue
> tsc

0 migrations are already loaded in the database.
1 migrations were found in the source code.
1 migrations are new migrations that needs to be executed.
Migration Seed1560000000000 has been executed successfully.
(node:71025) DeprecationWarning: collection.insert is deprecated. Use insertOne, insertMany or bulkWrite instead.
[09:51:39] RecuencoJones@localhost:typeorm-migration-issue
$> npm run migrate

> @ migrate /Users/RecuencoJones/Workspace/Scratch/typeorm-migration-issue
> npm run build && typeorm migration:run


> @ build /Users/RecuencoJones/Workspace/Scratch/typeorm-migration-issue
> tsc

0 migrations are already loaded in the database.
2 migrations were found in the source code.
2 migrations are new migrations that needs to be executed.
Migration UpdateContacts1566560354098 has been executed successfully.
(node:71166) DeprecationWarning: collection.insert is deprecated. Use insertOne, insertMany or bulkWrite instead.
Migration MergeConfigs1567689639607 has been executed successfully.
[09:51:51] RecuencoJones@localhost:typeorm-migration-issue
$> npm run revert

> @ revert /Users/RecuencoJones/Workspace/Scratch/typeorm-migration-issue
> npm run build && typeorm migration:revert


> @ build /Users/RecuencoJones/Workspace/Scratch/typeorm-migration-issue
> tsc

2 migrations are already loaded in the database.
UpdateContacts1566560354098 is the last executed migration. It was executed on Fri Aug 23 2019 13:39:14 GMT+0200 (Central European Summer Time).
Now reverting it...
Migration UpdateContacts1566560354098 has been reverted successfully.
```

After execution, `migrations` collection looks like this:

```
> db.migrations.find()
{ "_id" : ObjectId("5d7210179596d115ff102352"), "timestamp" : 1567689639607, "name" : "MergeConfigs1567689639607" }
```
