export type postServiceStateType = {
  serviceName: string;
  servicePasscode: string;
  stateName: string;
  stateData: object;
  sync?: boolean;
  token: string;
};

export type deleteServiceStateType = {
  serviceName: string;
  servicePasscode: string;
  stateName: string;
  token: string;
};

export interface LooseObject {
  [key: string]: any;
}

export type routingRuleTeplate = {
  dataDomain: string;
  entityType: Array<string>;
  filterExpression: string;
  expression: string;
  condition: string;
};

export interface myToken {
  sub: string;
  exp: number;
  role: string;
  // whatever else is in the JWT.
}

export interface productServiceType {
  productId: number;
  name: string;
  description: string;
  price: number;
}

export interface accountServiceType {
  accountId: number;
  email: string;
  role: string;
}
