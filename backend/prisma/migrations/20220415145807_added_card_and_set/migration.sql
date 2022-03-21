/*
  Warnings:

  - Added the required column `hp` to the `pokemon_cards` table without a default value. This is not possible if the table is not empty.
  - Added the required column `images` to the `pokemon_cards` table without a default value. This is not possible if the table is not empty.
  - Added the required column `number` to the `pokemon_cards` table without a default value. This is not possible if the table is not empty.
  - Added the required column `rarity` to the `pokemon_cards` table without a default value. This is not possible if the table is not empty.
  - Added the required column `setId` to the `pokemon_cards` table without a default value. This is not possible if the table is not empty.
  - Added the required column `super_type` to the `pokemon_cards` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "super_type_enum" AS ENUM ('energy', 'trainer', 'pokemon');

-- AlterTable
ALTER TABLE "pokemon_cards" ADD COLUMN     "evolves_to" TEXT[],
ADD COLUMN     "hp" TEXT NOT NULL,
ADD COLUMN     "images" JSONB NOT NULL,
ADD COLUMN     "number" TEXT NOT NULL,
ADD COLUMN     "rarity" TEXT NOT NULL,
ADD COLUMN     "rules" TEXT[],
ADD COLUMN     "setId" TEXT NOT NULL,
ADD COLUMN     "sub_types" TEXT[],
ADD COLUMN     "super_type" "super_type_enum" NOT NULL,
ADD COLUMN     "types" TEXT[];

-- CreateTable
CREATE TABLE "set" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "series" TEXT NOT NULL,
    "printedTotal" INTEGER NOT NULL,
    "total" INTEGER NOT NULL,
    "images" JSONB NOT NULL,

    CONSTRAINT "set_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "pokemon_cards" ADD CONSTRAINT "pokemon_cards_setId_fkey" FOREIGN KEY ("setId") REFERENCES "set"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
