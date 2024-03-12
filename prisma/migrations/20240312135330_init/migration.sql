-- CreateEnum
CREATE TYPE "Setting" AS ENUM ('DEFAULT', 'USERCUSTOM');

-- CreateEnum
CREATE TYPE "Role" AS ENUM ('DEMO', 'USER', 'ADMIN');

-- CreateTable
CREATE TABLE "Users" (
    "id" UUID NOT NULL,
    "first_name" VARCHAR(50) NOT NULL,
    "last_name" VARCHAR(50) NOT NULL,
    "email" VARCHAR(50) NOT NULL,
    "address" VARCHAR(100) NOT NULL,
    "username" VARCHAR(30) NOT NULL,
    "password" VARCHAR(100) NOT NULL,
    "role_active" "Role" NOT NULL DEFAULT 'DEMO',
    "first_login" BOOLEAN NOT NULL DEFAULT false,
    "setting_id" TEXT,
    "created_at" TIMESTAMPTZ(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserSetting" (
    "id" UUID NOT NULL,
    "setting_code" TEXT NOT NULL,
    "is_default" "Setting" NOT NULL DEFAULT 'DEFAULT',
    "created_at" TIMESTAMPTZ(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "UserSetting_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ThemeConfig" (
    "id" UUID NOT NULL,
    "theme_code" TEXT NOT NULL,
    "bg_color" VARCHAR(255),
    "logo" VARCHAR(255),
    "userSettingId" UUID,
    "created_at" TIMESTAMPTZ(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ThemeConfig_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Users_setting_id_key" ON "Users"("setting_id");

-- CreateIndex
CREATE UNIQUE INDEX "UserSetting_setting_code_key" ON "UserSetting"("setting_code");

-- CreateIndex
CREATE UNIQUE INDEX "ThemeConfig_theme_code_key" ON "ThemeConfig"("theme_code");

-- AddForeignKey
ALTER TABLE "Users" ADD CONSTRAINT "Users_setting_id_fkey" FOREIGN KEY ("setting_id") REFERENCES "UserSetting"("setting_code") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ThemeConfig" ADD CONSTRAINT "ThemeConfig_userSettingId_fkey" FOREIGN KEY ("userSettingId") REFERENCES "UserSetting"("id") ON DELETE SET NULL ON UPDATE CASCADE;
