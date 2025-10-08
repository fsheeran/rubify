import { JSONFilePreset } from 'lowdb/node'


enum DataProvider {
    LowDb
}

interface GenerateRubifyRequestEntry {
    uuid: string;
    timestamp: number;
    baseText: string;
}

interface DatabaseController {
    write(requestEntry: GenerateRubifyRequestEntry): Promise<void>;
    read(uuid: string): Promise<GenerateRubifyRequestEntry>;
    delete(uuid: string): Promise<void>;
    evict(): Promise<void>;
}

interface DatastoreConfiguration {
    ttl: number;
}

interface RubifyRequestsData {
    [key: string]: GenerateRubifyRequestEntry;
}

interface GenerateRubifyRequestDatastoreSchema {
    requests: RubifyRequestsData,
    configuration: DatastoreConfiguration
}

async function buildDatabaseController(provider = DataProvider.LowDb): Promise<DatabaseController> {
    switch (provider) {
        case DataProvider.LowDb:
            const defaultData = {
                requests: {},
                // todo: yank this out into some deploytime config substitution or whateva
                configuration: {
                    ttl: 300000
                }
            }
            const db = await JSONFilePreset<GenerateRubifyRequestDatastoreSchema>(
                'db.json',
                defaultData
            )

            return {
                write: async (requestEntry) => {
                    db.update(({ requests }) => requests[requestEntry.uuid] = requestEntry)
                },
                // gonna need to handle some errors better here
                read: async (uuid) => db.data.requests[uuid],
                delete: async (uuid) => db.update(({ requests }) => delete requests[uuid]),
                evict: async () => {
                    const cutoff = Date.now() - db.data.configuration.ttl;
                    const toDelete = [];
                    for (const [uuid, request] of Object.entries(db.data.requests)) {
                        if (request.timestamp < cutoff) {
                            toDelete.push(uuid);
                        }
                    }
                    toDelete.forEach((key) => delete db.data.requests[key]);
                }
            };

        default:
            throw new TypeError(`${provider} is not a valid DataProvider`);
    }

}

export default await buildDatabaseController();
