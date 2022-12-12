import { ConfigService } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';
import { User } from './entities/user.entity';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import mockedConfigService from '../mocks/config.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import * as request from 'supertest';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import { UsersModule } from './users.module';
describe('UsersController', () => {
  let app: INestApplication;
  let userData;
  const mockData = {};
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      imports: [UsersModule],
      providers: [
        UsersService,
        {
          provide: ConfigService,
          useValue: mockedConfigService,
        },
        {
          provide: getRepositoryToken(User),
          useValue: {
            new: jest.fn().mockResolvedValue(mockData),
            findOneBy: jest.fn().mockReturnValue(mockData),
            delete: jest.fn().mockReturnValue({}),
            update: jest.fn(),
            save: jest.fn().mockReturnValue({
              data: userData,
              message: 'user successfully created',
            }),
          },
        },
      ],
    }).compile();

    app = module.createNestApplication();
    app.useGlobalPipes(new ValidationPipe());
    await app.init();
  });

  describe('When creating users', () => {
    it('creating with no basic auth', async () => {
      const expectedData = {
        data: userData,
        status: 400,
        message: 'User successfully created',
        success: true,
      };
      return await request(app.getHttpServer())
        .post('/users')
        .auth('olajuwon', '12345')
        .send(userData)
        .expect(500)
        .catch((err) => console.log(err.message));
    });
  });
  describe('', () => {
    it('', async () => {
      return await request(app.getHttpServer())
        .get('/users')
        .auth('olajuwon', '12345')
        .expect(200);
    });
  });
});
