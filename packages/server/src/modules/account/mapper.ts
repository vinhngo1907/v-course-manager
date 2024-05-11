import { AccountDTO, IAccount } from "./dto/account";

export function mapAccountToAccountDTO(account: IAccount): AccountDTO {
    const { createdAt, username, user: { email, roles } } = account

    const userRoles = roles && roles.map((role) => role.name);

    return {
        username, 
        email,
        roles: userRoles,
        createdAt: createdAt.toLocaleString(),
    }
}