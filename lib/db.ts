// lib/db.ts
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// Helper function to convert template literal to query string and params
function parseQuery(strings: TemplateStringsArray, ...values: any[]): [string, any[]] {
  let query = strings[0];
  const params: any[] = [];

  for (let i = 0; i < values.length; i++) {
    params.push(values[i]);
    query += `$${i + 1}${strings[i + 1]}`;
  }

  return [query, params];
}

export async function query<T = any>(
  strings: TemplateStringsArray | string,
  ...values: any[]
): Promise<T[]> {
  try {
    if (typeof strings === 'string') {
      // Handle plain string queries
      const result = await prisma.$queryRawUnsafe<T[]>(strings, ...values);
      return result;
    } else {
      // Handle template literal queries
      const [queryString, params] = parseQuery(strings, ...values);
      const result = await prisma.$queryRawUnsafe<T[]>(queryString, ...params);
      return result;
    }
  } catch (error: any) {
    console.error("Database Query Error:", {
      query: typeof strings === 'string' ? strings : strings.join('?'),
      params: values,
      error
    });
    throw new Error(`Database Query Failed: ${error.message}`);
  }
}

export { prisma };
