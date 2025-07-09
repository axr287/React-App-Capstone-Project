import * as SQLite from "expo-sqlite";

let dbInstance = null;

export async function getDatabase() {
  if (!dbInstance) {
    dbInstance = await SQLite.openDatabaseAsync("little_lemon.db");
  }
  return dbInstance;
}

export async function initializeDatabase() {
  try {
    const db = await getDatabase();
    await db.execAsync(`
      PRAGMA journal_mode = WAL;
      CREATE TABLE IF NOT EXISTS menuitems (
        id INTEGER PRIMARY KEY NOT NULL,
        uuid TEXT,
        title TEXT,
        price TEXT,
        category TEXT
      );
    `);
    console.log("Database and table initialized successfully.");
  } catch (error) {
    console.error("Error initializing database:", error);
    throw error;
  }
}

export async function getMenuItems() {
  try {
    const db = await getDatabase();

    const results = await db.getAllAsync("SELECT * FROM menuitems");

    // Ensure results are returned as an array of rows
    return results || [];
  } catch (error) {
    console.error("Error fetching menu items:", error);
    return [];
  }
}

export async function saveMenuItems(menuItems) {
  try {
    const db = await getDatabase();

    await db.execAsync(
      `insert into menuitems (uuid, title, price, category) values ${menuItems
        .map(
          (item) =>
            `('${item.id}', '${item.title}', '${item.price}', '${item.category}')`
        )
        .join(", ")}`
    );
    console.log("successfuly saved items");
  } catch (error) {
    console.log("error saving menu items", error);
  }
}

export async function filterByQueryAndCategories(query, activeCategories) {
  try {
    const db = await getDatabase();

    const categoryConditions = activeCategories
      .map((category) => `category='${category}'`)
      .join(" OR ");

    const whereClause = query
      ? `(title LIKE '%${query}%') AND (${categoryConditions})`
      : categoryConditions;

    const results = await db.getAllAsync(
      `SELECT * FROM menuitems WHERE ${whereClause}`
    );

    return results;
  } catch (error) {
    console.error("Error filtering menu items:", error);
    throw error;
  }
}
