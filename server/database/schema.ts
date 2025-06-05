import { index, integer, primaryKey, sqliteTable, text } from 'drizzle-orm/sqlite-core';

// Таблица пользователей
export const users = sqliteTable('users', {
  id: integer('id').primaryKey(),
  name: text('name').notNull(),
}, (t) => [
  index('idx_users_id').on(t.id), // пример индекса (опционально)
]);

// Таблица друзей (user-to-user связи)
export const friends = sqliteTable('friends', {
  userId: integer('user_id').notNull().references(() => users.id),
  friendId: integer('friend_id').notNull().references(() => users.id),
}, (t) => [
  primaryKey({columns: [t.userId, t.friendId]}),
  index('idx_friends_user_id').on(t.userId),
  index('idx_friends_friend_id').on(t.friendId),
]);
