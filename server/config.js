import { JSONFile, Low } from 'lowdb';
import path from 'path';

const file = path.join('./db.json');
const adapter = new JSONFile(file);
const db = new Low(adapter);

db.data ||= { messages: [] }
export default db;