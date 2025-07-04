import * as bcrypt from "bcrypt";
import { generate } from "generate-password";

export async function hashPassword(rawPass: string): Promise<string> {
    try {
        const salt = await bcrypt.genSalt();
        return await bcrypt.hash(rawPass, salt);
    } catch (error) {
        console.log(error);
    }
}

export async function isMatch(password: string, hash: string): Promise<Boolean> {
    return await bcrypt.compare(password, hash);
}

export function generatePassword(): string {
    return generate({
        length: 10,
        numbers: true,
        symbols: true
    })
}