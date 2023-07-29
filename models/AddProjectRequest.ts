export interface AddProjectRequest {
  name: string;
  description: string;
  status: string;
  startDate: string;
  endDate: string;
  technologyIds: string[];
}
