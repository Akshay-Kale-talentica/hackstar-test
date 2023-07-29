export enum EmployeeSearchType {
  ID = 'ID',
  TECHNOLOGY = 'TECHNOLOGY',
  NAME = 'NAME',
}

export interface EmployeeSearchRequest {
  searchType: EmployeeSearchType;
  searchValue: string;
}
