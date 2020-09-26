import knex, { Config } from "knex";

const connectionConfig: Record<string, any> = {
    host: "127.0.0.1",
    port: 5432,
    database: "db_test",
    user: "postgres",
    password: "postgres",
};

const knexConfig: Config = {
    client: "pg",
    connection: connectionConfig,
    log: {
        warn: (msg) => {
            console.log("warn: " + msg);
        },
        error: (msg) => {
            console.log("error: " + msg);
        },
        deprecate: (msg) => {
            console.log("depr: " + msg);
        },
        debug: (msg) => {
            console.log("debug: " + msg);
        },
    },
};

const database = knex(knexConfig);

async function runWithNoData() {
    await database.schema
        .createTable("with_no_data", (t) => {
            t.increments("id").primary();
        })
        .then(async (d) => {
            console.log("created table: " + d);
            for (let jx = 0; jx < 10; jx++) {
                console.log("jx:" + jx);
                for (let ix = 0; ix < 10000; ix++) {
                    await database("with_no_data").insert({});
                }
            }
        })
        .catch((e) => {
            console.log("failed create table: " + e);
        });
}

async function runInternal() {
    let db: Record<number, number> = {};
    console.log("created 'db': ");
    let id = 0;
    for (let jx = 0; jx < 10; jx++) {
        console.log("jx:" + jx);
        for (let ix = 0; ix < 10000; ix++) {
            db[id++] = Math.floor(Math.random() * 8);
        }
    }
}

async function runWithInts() {
    await database.schema
        .createTable("with_ints", (t) => {
            t.increments("id").primary();
            t.integer("color");
        })
        .then(async (d) => {
            console.log("created table: " + d);
            for (let jx = 0; jx < 10; jx++) {
                console.log("jx:" + jx);
                for (let ix = 0; ix < 10000; ix++) {
                    await database("with_ints").insert({
                        color: Math.floor(Math.random() * 8),
                    });
                }
            }
        })
        .catch((e) => {
            console.log("failed create table: " + e);
        });
}

async function runWithRegularStrings() {
    await database.schema
        .createTable("with_reg_strings", (t) => {
            t.increments("id").primary();
            t.text("color");
        })
        .then(async (d) => {
            let colors = [
                "red_with_green_stripes",
                "yellow_on_black_spots",
                "pink_glowing_ember_oak",
                "blacker_than_black_metal",
                "as_light_as_northen_light",
                "ember_bluer_in_sunrise",
                "pine_yellow_needle_smell",
                "whatever_random_colors",
            ];
            console.log("created table: " + d);
            for (let jx = 0; jx < 10; jx++) {
                console.log("jx:" + jx);
                for (let ix = 0; ix < 10000; ix++) {
                    await database("with_reg_strings").insert({
                        color: colors[Math.floor(Math.random() * 8)],
                    });
                }
            }
        })
        .catch((e) => {
            console.log("failed create table: " + e);
        });
}

async function runWithIrregularStrings() {
    await database.schema
        .createTable("with_irreg_strings", (t) => {
            t.increments("id").primary();
            t.text("color");
        })
        .then(async (d) => {
            let colors = [
                "red_with_green_stripes",
                "yellow_on_black_spots",
                "pink_glowing_ember_oak",
                "blacker_than_black_metal",
                "as_light_as_northen_light",
                "ember_bluer_in_sunrise",
                "pine_yellow_needle_smell",
                "whatever_random_colors",
            ];
            console.log("created table: " + d);
            for (let jx = 0; jx < 1; jx++) {
                console.log("jx:" + jx);
                for (let ix = 0; ix < 1; ix++) {
                    await database("with_irreg_strings").insert({
                        color: "222",
                    });
                }
            }
        })
        .catch((e) => {
            console.log("failed create table: " + e);
        });
}

async function validateDBConnection() {
    try {
        let r = await database.raw("select 1+1 as result");
        //console.log("r: " + JSON.stringify(r, null, 2));
        //await runInternal();
        await runWithInts();
        console.log("done");
    } catch (error) {
        console.log(`Can't connect to the database.`);
    }
    process.exit(1);
}

validateDBConnection();

function myAdd(a: number, b: number): number;
function myAdd(a: string, b: string): string;

function myAdd(a: any, b: any) {
    return a + b;
}

console.log(myAdd(3, 2));
