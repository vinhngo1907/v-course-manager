import { Request } from "express";
import { IAccount } from "@modules/account/dto/account";

interface RequestWithAccount extends Request {
    account: IAccount;
}

export default RequestWithAccount