// import mongosose
import { connect, connection } from 'mongoose';

const conn = {
  isConnected: false,
};

export async function dbConnect() {
  if (conn.isConnected) return;

  const db = await connect(process.env.MONGODB_URI);
  conn.isConnected = db.connections[0].readyState;

  console.log(db.connection.db.databaseName);
}

connection.on('connected', () => {
  console.log('Mongoose is connected');
});
connection.on('error', (err) => {
  console.log('Mongoose is Error', err.message);
});
