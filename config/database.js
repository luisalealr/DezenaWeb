const oracledb = require("oracledb");
require("dotenv").config();

async function run() {
  const connection = await oracledb.getConnection({
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    connectString:
      "(description= (retry_count=20)(retry_delay=3)(address=(protocol=tcps)(port=1521)(host=adb.sa-santiago-1.oraclecloud.com))(connect_data=(service_name=gfb8cc9b2301348_dezena_high.adb.oraclecloud.com))(security=(ssl_server_dn_match=yes)))",
  });

  const result = await connection.execute(`SELECT * FROM dezena.PROFESORES`);
  console.log("Result is:", result.rows);

  await connection.close(); // Always close connections
}

run();
