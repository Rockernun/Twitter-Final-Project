/*
  Warnings:

  - You are about to drop the column `tweet` on the `Tweet` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Tweet" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "context" TEXT NOT NULL,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME NOT NULL,
    "userId" INTEGER NOT NULL,
    "views" INTEGER NOT NULL DEFAULT 0,
    CONSTRAINT "Tweet_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Tweet" ("context", "created_at", "id", "updated_at", "userId", "views") SELECT "context", "created_at", "id", "updated_at", "userId", "views" FROM "Tweet";
DROP TABLE "Tweet";
ALTER TABLE "new_Tweet" RENAME TO "Tweet";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
