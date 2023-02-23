export type Address = {
  street: string;
  number: number;
  zipcode: number;
};
export type User = {
  name: string;
  age: number;
  country: string;
  address: Address;
  admin: boolean;
};
