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
