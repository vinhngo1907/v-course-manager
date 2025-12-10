import {
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { DatabaseService } from '../database/service';
import { AccountBadRequestException } from '@modules/account/exception';
import { AuthDTO } from './dto/auth';
import { RegisterPayload, TokenPayload } from './types';
import { hashPassword, isMatch } from './utils';
import { UsersService } from '@modules/user/service';
import { AccountsService } from '@modules/account/service';
import { Prisma } from '@prisma/client';
import { AppConfigService } from 'src/config/service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  private readonly logger: Logger = new Logger(AuthService.name);
  // private readonly appConfigService: AppConfigService = new AppConfigService(new ConfigService());
  constructor(
    private readonly databaseService: DatabaseService,
    private readonly accountsService: AccountsService,
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
    private readonly appConfigService: AppConfigService,
  ) {}

  async login(account: any) {
    try {
      const {
        username,
        user: { userId, email, fullName },
      } = account;
      const cookie = this.getCookieWithJwtToken(username, userId);
      // console.log({ cookie })
      return {
        cookie,
        user: {
          id: userId,
          email,
          username,
          fullName,
        },
      };
    } catch (error) {
      this.logger.error(error);
      throw new InternalServerErrorException(`Error when logining: ${error}`);
    }
  }

  async validateUser(username: string, pass: string): Promise<any> {
    try {
      const account = await this.accountsService.findOne(username);
      // this.logger.log(account);
      if (account && (await isMatch(pass, account.password))) {
        const { id, email, fullName } = account.user;
        return {
          username: account.username,
          user: {
            id,
            email,
            fullName,
          },
        };
      }
      return null;
    } catch (error) {
      this.logger.error(error.message);
      return null;
    }
  }

  async register({
    username,
    email,
    fullName,
    password: rawPass,
  }: RegisterPayload): Promise<any> {
    try {
      const hashedPassword = await hashPassword(rawPass);
      const userRole = await this.databaseService.role.findFirstOrThrow({
        where: {
          name: 'USER',
        },
      });

      await this.accountsService.checkUsernameExisted(username);
      await this.usersService.checkEmailExisted(email);
      return await this.databaseService.$transaction(async (manager) => {
        const createdUser = await this.usersService.createUserTransaction(
          manager as any,
          username,
          email,
          hashedPassword,
          fullName,
          [userRole],
        );

        return this.login({
          username,
          user: {
            userId: createdUser.id,
            email,
            fullName,
          },
        });
      });
    } catch (error) {
      this.logger.error(`${error}`);
      throw new InternalServerErrorException(error.message);
    }
  }

  getCookieWithJwtToken(username: string, userId: string) {
    try {
      const payload: TokenPayload = { username, userId };
      const {
        signOptions: { expiresIn },
      } = this.appConfigService.getJwtConfig();
      const token = this.jwtService.sign(payload);

      return `Authentication=${token}; HttpOnly; Path=/; Max-Age=${expiresIn};SameSite=Lax;`;
    } catch (error) {
      // this.logger.error(error);
      console.log(error);
      throw new Error(`Error: when getting cookie with jwt token ${error}`);
    }
  }

  getEmptyCookie() {
    // return `Authentication=; HttpOnly; Path=/; Max-Age=0;SameSite=None; Secure`;
    return `Authentication=; HttpOnly; Path=/; Max-Age=0; SameSite=Lax;`;
  }

  async validateJwtUser({ userId, username }): Promise<any> {
    try {
      // const user = await this.databaseService.user.findUnique({
      //     where: {
      //         id: userId
      //     }
      // });
      const account = await this.databaseService.account.findUnique({
        where: { username },
        include: {
          user: {
            select: { id: true, email: true, fullName: true, avatar: true },
          },
        },
      });
      if (!account) {
        return null;
      }
      const { id, email, fullName, avatar } = account.user;
      return {
        username,
        id,
        email,
        fullName,
        avatar,
      };
    } catch (error) {
      return null;
    }
  }
}
