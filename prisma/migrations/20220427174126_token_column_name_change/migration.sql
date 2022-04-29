/*
  Warnings:

  - You are about to drop the column `hashedToken` on the `RefreshToken` table. All the data in the column will be lost.
  - Added the required column `token` to the `RefreshToken` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_RefreshToken" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "token" TEXT NOT NULL,
    "userId" INTEGER,
    "revoked" BOOLEAN NOT NULL DEFAULT false,
    CONSTRAINT "RefreshToken_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_RefreshToken" ("id", "revoked", "userId") SELECT "id", "revoked", "userId" FROM "RefreshToken";
DROP TABLE "RefreshToken";
ALTER TABLE "new_RefreshToken" RENAME TO "RefreshToken";
CREATE UNIQUE INDEX "RefreshToken_id_key" ON "RefreshToken"("id");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
