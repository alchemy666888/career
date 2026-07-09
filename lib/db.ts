import { sql as vercelSql } from "@vercel/postgres";
import { Pool } from "pg";

type QueryParam = string | number | boolean | Date | null;

let pool: Pool | undefined;

function getPool() {
  if (!process.env.DATABASE_URL) {
    throw new Error("DATABASE_URL is required. Configure Vercel Postgres or another PostgreSQL database.");
  }

  pool ??= new Pool({ connectionString: process.env.DATABASE_URL });
  return pool;
}

export async function query<T>(text: string, params: QueryParam[] = []): Promise<T[]> {
  if (process.env.VERCEL || process.env.POSTGRES_URL) {
    const result = await vercelSql.query<T>(text, params);
    return result.rows;
  }

  const result = await getPool().query<T>(text, params);
  return result.rows;
}

export type Job = {
  id: string;
  title: string;
  company: string;
  location: string | null;
  status: string;
  fit_score: number | null;
  source_url: string | null;
  notes: string | null;
  created_at: string;
  updated_at: string;
};

export async function listJobs() {
  return query<Job>(
    `select id, title, company, location, status, fit_score, source_url, notes, created_at, updated_at
     from jobs
     order by created_at desc
     limit 50`
  );
}

export async function getJob(id: string) {
  const rows = await query<Job>(
    `select id, title, company, location, status, fit_score, source_url, notes, created_at, updated_at
     from jobs
     where id = $1
     limit 1`,
    [id]
  );
  return rows[0] ?? null;
}

export async function createJob(input: {
  title: string;
  company: string;
  location?: string;
  sourceUrl?: string;
  notes?: string;
}) {
  const rows = await query<Job>(
    `insert into jobs (title, company, location, source_url, notes)
     values ($1, $2, nullif($3, ''), nullif($4, ''), nullif($5, ''))
     returning id, title, company, location, status, fit_score, source_url, notes, created_at, updated_at`,
    [input.title, input.company, input.location ?? "", input.sourceUrl ?? "", input.notes ?? ""]
  );
  return rows[0];
}
