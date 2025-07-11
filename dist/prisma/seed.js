"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
function seed() {
    return __awaiter(this, void 0, void 0, function* () {
        yield prisma.role.createMany({
            data: [
                { id: 1, name: "Admin" },
                { id: 2, name: "User" },
            ],
            skipDuplicates: true,
        });
        yield prisma.user.createMany({
            data: [
                {
                    username: "adminUser",
                    email: "admin@example.com",
                    password: "securepassword",
                    roleId: 1,
                },
                {
                    username: "normalUser",
                    email: "user@example.com",
                    password: "securepassword",
                    roleId: 2,
                },
                {
                    username: "johnDoe",
                    email: "john@example.com",
                    password: "password123",
                    roleId: 2,
                },
                {
                    username: "janeSmith",
                    email: "jane@example.com",
                    password: "password456",
                    roleId: 2,
                },
            ],
            skipDuplicates: true,
        });
    });
}
seed()
    .then(() => console.log("Seed completed"))
    .catch((e) => {
    console.error(e);
    process.exit(1);
})
    .finally(() => __awaiter(void 0, void 0, void 0, function* () { return yield prisma.$disconnect(); }));
