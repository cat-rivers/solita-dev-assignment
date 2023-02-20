const { Client } = require("pg");

// await client.connect();

export const getClient = async () => {
  const client = new Client({
    connectionString: "postgresql://cati:example@192.168.1.117:5432/cati",
  });
  await client.connect();
  return client;
};
