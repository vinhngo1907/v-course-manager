import { Request } from "express";
import { IAccount } from "@modules/account/dto/account";
import { Account } from "@prisma/client";
interface RequestWithAccount extends Request {
    account: Account;
}

export default RequestWithAccount;