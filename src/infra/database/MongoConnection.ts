import { MongoClient, ObjectId, SortDirection } from "mongodb";
const mongoUri = process.env.MONGO_URI || "";
const dbName = process.env.MONGO_DB || "";
if (mongoUri === "") throw new Error("Mongo URI is not defined");
if (dbName === "") throw new Error("Database Name is not defined");
const connectDb = async () => {
  const client = await MongoClient.connect(mongoUri);
  // return handle to database
  return client;
};
/**
 * Very if collection exist
 * @param collectionName collection name
 * @returns true if collection exist
 */
const collectionExists = async (collectionName: string)=> {
  const conn = await connectDb();
  let db = conn.db(dbName);
  const result = await db.listCollections({name: collectionName}).toArray();
  return (result.length > 0) ? true: false;
}
/**
 * create mongoDB Collection.
 *
 * @param {string} collectionName - Collection name
 * @param {boolean} isCapped - A fixed-sized collection that automatically overwrites its oldest
 * entries when it reaches its maximum size
 * @param {int} size - apply if isCapped = true. Maximum size of the collection in bytes.
 * If the size field is less than or equal to 4096, then the collection will have a cap of 4096 bytes.
 * @param {int} max - apply if isCapped = true. Maximum number of documents for the collection using
 * the max field.
 *
 */
const createCollection = async (
  collectionName: string,
  isCapped: boolean,
  size = 0,
  max = 0
) => {
  const conn = await connectDb();
  let db = conn.db(dbName);
  let collation = {
    locale: "pt",
  };
  let options = {
    capped: isCapped,
    collation: collation,
  };
  if (await collectionExists(collectionName)){ 
    return;
  }
  const result = await db.createCollection(collectionName, options);
  // crio o índice para controle de expiração dos documentos. Mas a especificação do tempo fica dentro do documento.
  const indexResult = await result.createIndex({ "expireAt": 1 }, {"expireAfterSeconds": 0, name: "expireIndex" });
  conn.close();
  return result;
};
/**
 * clean mongoDB Collection.
 *
 * @param {string} collectionName - Collection name
 *
 */
const cleanCollection = async (collectionName: string) => {
  const conn = await connectDb();
  let db = conn.db(dbName);
  await db.collection(collectionName).drop();
}
/**
 * Locate a file into collection
 *
 * @param {string} collectionName - Collection name
 * @param {object} query - Query to search
 * @param {object} options - Query options define the behavior of the query
 */
const findOne = async (collectionName: string, query: object, options?: object) => {
  const conn = await connectDb();
  let db = conn.db(dbName);
  const data = await db.collection(collectionName).findOne(query, options || {});
  conn.close();
  return data;
};
/**
 * Locate a file by id into collection
 *
 * @param {string} collectionName - Collection name
 * @param {object} query - Query to search
 * @param {object} options - Query options define the behavior of the query
 */
const findById = async (collectionName: string, id: string, options?: object) => {
  const conn = await connectDb();
  let db = conn.db(dbName);
  const data = await db
    .collection(collectionName)
    .findOne({ _id: new ObjectId(id) }, options || {});
  conn.close();
  return data;
};
/**
 * Get all files into collection
 *
 * @param {string} collectionName - Collection name
 * @param {number} page - Query page
 * @param {number} limit - Query limit
 * @param {object} options - Query options define the behavior of the query
 *
 */
const findAll = async (collectionName: string, page: number, limit: number, query?: object, options?: object) => {
  const conn = await connectDb();
  let db = conn.db(dbName);
  const cursor = await db.collection(collectionName)
    .find(query || {}, options || {})
    .skip((page - 1) * limit)
    .limit(limit * 1)
    .toArray();
  let data: object[] = [];
  await cursor.forEach((item: object) => {
    data.push(item);
  });
  conn.close();
  return data;
};
/**
 * Count documents into collection
 * 
 * @param {string} collectionName - Collection name
 * 
 */
const count = async (collectionName: string, query?: Object) => {
  const conn = await connectDb();
  let db = conn.db(dbName);
  const count = await db.collection(collectionName).find(query || {}).count();
  conn.close();
  return count;
};
/**
 * Insert One document into collection
 * 
 * @param {string} collectionName - Collection name
 * @param {object} doc - Document to be inserted
 * 
 */
const insertOne = async (collectionName: string, doc: object) => {
  const conn = await connectDb();
  let db = conn.db(dbName);
  const data = await db.collection(collectionName).insertOne(doc);
  conn.close();
  return data;
};
/**
 * Insert One document into collection
 * 
 * @param {string} collectionName - Collection name
 * @param {Array<object>} docArray - Array of Documents to be inserted
 * 
 */
const insertMany = async (collectionName: string, docArray: object[]) => {
  if (!Array.isArray(docArray)) throw new Error("docArray is invalid data.");
  const conn = await connectDb();
  let db = conn.db(dbName);
  const data = await db.collection(collectionName).insertMany(docArray);
  conn.close();
  return data;
};
/**
 * Update One document into collection
 * 
 * @param {string} collectionName - Collection name
 * @param {object} doc - Document to be updated
 * @param {string} id - Mongo Id of document
 * 
 */
const updateOne = async (collectionName: string, doc: object, id: string) => {
  const conn = await connectDb();
  let db = conn.db(dbName);
  const data = await db
    .collection(collectionName)
    .updateOne({ _id: new ObjectId(id) }, { $set: doc });
  conn.close();
  return data;
};
/**
 * Delete One document into collection
 * 
 * @param {string} collectionName - Collection name
 * @param {object} filter - Document to be deleted
 * 
 */
const deleteOne = async (collectionName: string, filter: object) => {
  const conn = await connectDb();
  let db = conn.db(dbName);
  const data = await db.collection(collectionName).deleteOne(filter);
  conn.close();
  return data;
};
/**
 * Delete One document by Id into collection
 * 
 * @param {string} collectionName - Collection name
 * @param {string} id - Mongo Id to find document to be deleted
 * 
 */
const deleteById = async (collectionName: string, id: string) => {
  const conn = await connectDb();
  let db = conn.db(dbName);
  const data = await db
    .collection(collectionName)
    .deleteOne({ _id: new ObjectId(id) });
  conn.close();
  return data;
};
export {
  collectionExists,
  createCollection,
  cleanCollection,
  findOne,
  findById,
  findAll,
  count,
  insertOne,
  insertMany,
  updateOne,
  deleteOne,
  deleteById,
};