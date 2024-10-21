export class User {
  userId: number;
  name: string;
  lastName: string;
  streetName?: string; 
  houseNumber?: number; 
  voivodeship?: string; 
  country?: string; 
  zipcode?: number; 
  emailAddress: string;
  password?: string; 
  phoneNumber: number;

  constructor(
      userId: number,
      name: string,
      lastName: string,
      emailAddress: string,
      password: string,
      phoneNumber: number,
      streetName?: string,
      houseNumber?: number,
      voivodeship?: string,
      country?: string,
      zipcode?: number
  ) {
      this.userId = userId;
      this.name = name;
      this.lastName = lastName;
      this.emailAddress = emailAddress;
      this.password = password;
      this.phoneNumber = phoneNumber;
      this.streetName = streetName;
      this.houseNumber = houseNumber;
      this.voivodeship = voivodeship;
      this.country = country;
      this.zipcode = zipcode;
  }
}
