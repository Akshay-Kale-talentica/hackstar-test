type Project = {
  projectName: string;
  achievements: string;
  startDate: string;
  endDate: string;
};

export function ProjectDetailsView() {
  const project: Project[] = [
    {
      projectName: 'Project 1',
      achievements: 'Achievements 1',
      startDate: '01/01/2021',
      endDate: '01/01/2021',
    },
  ];
  return (
    <div>
      {project.map((proj, index) => (
        <div key={index} className='bg-gray-100 p-4'>
          <h1 className='text-2xl font-bold mb-4'>{proj.projectName} Details</h1>
          <p className='mb-2'>
            <span className='font-bold'>Achievements:</span> {proj.achievements}
          </p>
          <p className='mb-2'>
            <span className='font-bold'>Start Date:</span> {proj.startDate}
          </p>
          <p className='mb-2'>
            <span className='font-bold'>End Date:</span> {proj.endDate}
          </p>
        </div>
      ))}
    </div>
  );
}
