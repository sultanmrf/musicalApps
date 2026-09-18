import fs from "fs";
import path from "path";

const DATA_DIR = path.resolve("server/data");

function ensureDataDir() {
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
  }
}

function getFilePath(collection: string): string {
  return path.join(DATA_DIR, `${collection}.json`);
}

function readCollection<T>(collection: string): T[] {
  ensureDataDir();
  const filePath = getFilePath(collection);
  if (!fs.existsSync(filePath)) {
    fs.writeFileSync(filePath, "[]", "utf-8");
    return [];
  }
  const raw = fs.readFileSync(filePath, "utf-8");
  return JSON.parse(raw) as T[];
}

function writeCollection<T>(collection: string, data: T[]): void {
  ensureDataDir();
  const filePath = getFilePath(collection);
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2), "utf-8");
}

function generateId(): string {
  return (
    Date.now().toString(36) +
    Math.random().toString(36).substring(2, 10)
  );
}

export interface JsonDoc {
  _id: string;
  createdAt: string;
  updatedAt: string;
}

// ─── Find All ───
export function findAll<T extends JsonDoc>(collection: string): T[] {
  return readCollection<T>(collection);
}

// ─── Find One by _id ───
export function findById<T extends JsonDoc>(
  collection: string,
  id: string
): T | undefined {
  const items = readCollection<T>(collection);
  return items.find((item) => item._id === id);
}

// ─── Find One by condition ───
export function findOne<T extends JsonDoc>(
  collection: string,
  filter: Partial<T>
): T | undefined {
  const items = readCollection<T>(collection);
  return items.find((item) => {
    return Object.entries(filter).every(
      ([key, value]) => (item as any)[key] === value
    );
  });
}

// ─── Find Many by condition ───
export function findMany<T extends JsonDoc>(
  collection: string,
  filter: Partial<T> = {}
): T[] {
  const items = readCollection<T>(collection);
  if (Object.keys(filter).length === 0) return items;
  return items.filter((item) => {
    return Object.entries(filter).every(
      ([key, value]) => (item as any)[key] === value
    );
  });
}

// ─── Find One with password (for auth) ───
export function findOneWithPassword<T extends JsonDoc>(
  collection: string,
  filter: Partial<T>
): T | undefined {
  return findOne<T>(collection, filter);
}

// ─── Create ───
export function create<T extends JsonDoc>(
  collection: string,
  data: Omit<T, "_id" | "createdAt" | "updatedAt">
): T {
  const items = readCollection<T>(collection);
  const now = new Date().toISOString();
  const newItem = {
    ...data,
    _id: generateId(),
    createdAt: now,
    updatedAt: now,
  } as T;
  items.push(newItem);
  writeCollection(collection, items);
  return newItem;
}

// ─── Update by _id ───
export function findByIdAndUpdate<T extends JsonDoc>(
  collection: string,
  id: string,
  update: Partial<T>,
  options?: { new?: boolean }
): T | undefined {
  const items = readCollection<T>(collection);
  const index = items.findIndex((item) => item._id === id);
  if (index === -1) return undefined;

  items[index] = {
    ...items[index],
    ...update,
    _id: items[index]._id,
    updatedAt: new Date().toISOString(),
  };
  writeCollection(collection, items);

  return options?.new === false ? undefined : items[index];
}

// ─── Delete by _id ───
export function findByIdAndDelete<T extends JsonDoc>(
  collection: string,
  id: string
): T | undefined {
  const items = readCollection<T>(collection);
  const index = items.findIndex((item) => item._id === id);
  if (index === -1) return undefined;

  const [deleted] = items.splice(index, 1);
  writeCollection(collection, items);
  return deleted;
}

// ─── Push to array field ───
export function pushToArray<T extends JsonDoc>(
  collection: string,
  id: string,
  field: string,
  value: any
): T | undefined {
  const items = readCollection<T>(collection);
  const index = items.findIndex((item) => item._id === id);
  if (index === -1) return undefined;

  if (!Array.isArray((items[index] as any)[field])) {
    (items[index] as any)[field] = [];
  }
  (items[index] as any)[field].push(value);

  items[index] = {
    ...items[index],
    updatedAt: new Date().toISOString(),
  } as T;
  writeCollection(collection, items);
  return items[index];
}

// ─── Pull from array field ───
export function pullFromArray<T extends JsonDoc>(
  collection: string,
  id: string,
  field: string,
  value: any
): T | undefined {
  const items = readCollection<T>(collection);
  const index = items.findIndex((item) => item._id === id);
  if (index === -1) return undefined;

  if (Array.isArray((items[index] as any)[field])) {
    (items[index] as any)[field] = (items[index] as any)[field].filter(
      (v: any) => v !== value
    );
  }

  items[index] = {
    ...items[index],
    updatedAt: new Date().toISOString(),
  } as T;
  writeCollection(collection, items);
  return items[index];
}

// ─── Aggregate / Group By ───
export function groupBy<T extends JsonDoc>(
  collection: string,
  groupField: string,
  sortField?: string,
  sortDir: 1 | -1 = 1
): any[] {
  const items = readCollection<T>(collection);
  const groups: Record<string, any> = {};

  for (const item of items) {
    const key = (item as any)[groupField];
    if (!key || key === null) continue;

    if (!groups[key]) {
      groups[key] = {
        _id: key,
        name: key,
        poster: (item as any).poster,
        count: 0,
      };
    }
    groups[key].count++;
  }

  let result = Object.values(groups);

  if (sortField) {
    result.sort((a, b) =>
      sortDir === 1
        ? a[sortField] > b[sortField]
          ? 1
          : -1
        : a[sortField] < b[sortField]
        ? 1
        : -1
    );
  }

  return result;
}

// ─── Count ───
export function countCollection<T extends JsonDoc>(collection: string): number {
  return readCollection<T>(collection).length;
}
