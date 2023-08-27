import { UnitStatus } from "../units/interfaces/unit.interface";
import { Repository } from "typeorm";

export type MockType<T> = {
  [P in keyof T]?: jest.Mock<{}>;
};

export const propertyRepositoryMockFactory: () => MockType<Repository<any>> = jest.fn(() => ({
    save: jest.fn(entity => entity),
    create: jest.fn(entity => entity),
    findOne: jest.fn(() => {
      return { id: 1, propertyName: "Aamar property 1", location: "33.23.232" };
    })
}));

export const unitRepositoryMockFactory: () => MockType<Repository<any>> = jest.fn(() => ({
  save: jest.fn(entity => entity),
  create: jest.fn(entity => entity),
  findOne: jest.fn(() => {
    return { tenantId: null, propertyId: 1, numOfRooms: 3, pricePerSquareMeter: 3.5, status: UnitStatus.vacant };
  })
}));

export const tenantRepositoryMockFactory: () => MockType<Repository<any>> = jest.fn(() => ({
  save: jest.fn(entity => entity),
  create: jest.fn(entity => entity),
  findOne: jest.fn(() => {
    return { id: 1, fullName: "Mostafa", email: "mostafa@email.com", phone: "0112312" };
  })
}));