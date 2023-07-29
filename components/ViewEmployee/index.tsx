import { BasicDetailsView } from '@/components/ViewEmployee/BasicDetails';
import { ProjectDetailsView } from '@/components/ViewEmployee/ProjectDetails';

export function ViewEmployee() {
  return (
    <div>
      <BasicDetailsView />
      <ProjectDetailsView />;
    </div>
  );
}
