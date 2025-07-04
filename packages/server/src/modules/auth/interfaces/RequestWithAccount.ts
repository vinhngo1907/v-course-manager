import { Request } from "express";
import { IAccount } from "@modules/account/dto/account";
import { Account } from "@prisma/client";
interface RequestWithAccount extends Request {
    user: Account;
}

export default RequestWithAccount;