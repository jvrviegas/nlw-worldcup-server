/*
  Warnings:

  - You are about to drop the column `date` on the `Game` table. All the data in the column will be lost.
  - You are about to drop the column `firstTeamCountryCode` on the `Game` table. All the data in the column will be lost.
  - You are about to drop the column `firstTeamName` on the `Game` table. All the data in the column will be lost.
  - You are about to drop the column `secondTeamCountryCode` on the `Game` table. All the data in the column will be lost.
  - You are about to drop the column `secondTeamName` on the `Game` table. All the data in the column will be lost.
  - Added the required column `matchId` to the `Game` table without a default value. This is not possible if the table is not empty.
  - Added the required column `pollId` to the `Game` table without a default value. This is not possible if the table is not empty.

*/
-- CreateTable
CREATE TABLE "Match" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "date" DATETIME NOT NULL,
    "firstTeamName" TEXT NOT NULL,
    "firstTeamCountryCode" TEXT NOT NULL,
    "secondTeamName" TEXT NOT NULL,
    "secondTeamCountryCode" TEXT NOT NULL
);

-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Game" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "matchId" TEXT NOT NULL,
    "pollId" TEXT NOT NULL,
    CONSTRAINT "Game_matchId_fkey" FOREIGN KEY ("matchId") REFERENCES "Match" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Game_pollId_fkey" FOREIGN KEY ("pollId") REFERENCES "Poll" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Game" ("id") SELECT "id" FROM "Game";
DROP TABLE "Game";
ALTER TABLE "new_Game" RENAME TO "Game";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
