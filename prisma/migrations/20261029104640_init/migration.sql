-- CreateTable
CREATE TABLE "short_links" (
    "slug" TEXT NOT NULL,
    "destination_url" TEXT NOT NULL,
    "click" INTEGER NOT NULL DEFAULT 0,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "short_links_pkey" PRIMARY KEY ("slug")
);
