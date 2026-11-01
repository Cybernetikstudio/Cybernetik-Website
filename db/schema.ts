import { sqliteTable, text } from 'drizzle-orm/sqlite-core';
export const demoRequests = sqliteTable('demo_requests', {
 email: text('email').primaryKey(),
 requestedAt: text('requested_at').notNull(),
 source: text('source').notNull(),
});
