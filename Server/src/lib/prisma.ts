import { PrismaClient } from '@prisma/client';

export const prisma = new PrismaClient()
export type UserType = {

    id : string,
    firstName : string,
    lastName : string,
    email : string,
    image : string,
}
