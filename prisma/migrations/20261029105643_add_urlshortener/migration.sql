-- CreateTable
CREATE TABLE "urlshortener" (
    "long_url" TEXT NOT NULL,
    "exp_time" TIMESTAMP(3),
    "custom_alias" TEXT NOT NULL,

    CONSTRAINT "urlshortener_pkey" PRIMARY KEY ("custom_alias")
);
