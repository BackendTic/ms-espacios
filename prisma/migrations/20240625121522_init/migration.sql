-- CreateEnum
CREATE TYPE "TipoEspacio" AS ENUM ('FUTBOL', 'BASKET', 'VOLEY');

-- CreateTable
CREATE TABLE "Espacio" (
    "id" TEXT NOT NULL,
    "nombre" TEXT NOT NULL,
    "disciplina" "TipoEspacio" NOT NULL,
    "disponible" BOOLEAN NOT NULL DEFAULT true,
    "estado" BOOLEAN NOT NULL DEFAULT true,
    "imagen" TEXT NOT NULL DEFAULT '',

    CONSTRAINT "Espacio_pkey" PRIMARY KEY ("id")
);
