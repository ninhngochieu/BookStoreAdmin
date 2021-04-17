export class Role {
  id: number;
  roleName: string;
}

class CityAddress {
  'id': number;
  'cityName': string;
  'cityCode': string;
}

class DistrictAddress {
  id: number;
  districtName: string;
  prefix: string;
  cityAddressId: number;
}

class Address {
  id: 1;
  'street_Address': string;
  'phone': string;
  'name': string;
  'cityAddressId': number;
   cityAddress: CityAddress;
  'districtAddressId': 1;
  'districtAddress': DistrictAddress;
}

export class User{
  id: number;
  username: string;
  name: string;
  email: string;
  avatar: string;
  phone: string;
  roleId: number;
  roleViewModel: Role;
  addresses: Address[];
}
