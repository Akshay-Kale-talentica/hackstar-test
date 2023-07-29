export function BasicDetailsView() {
  const employee = {
    name: 'John Doe',
    email: 'johndoe@example.com',
    gender: 'Male',
    yearsOfExperience: 5,
    designation: 'Software Engineer',
  };

  return (
    <div className='bg-gray-100 p-4'>
      <h1 className='text-2xl font-bold mb-4'>Employee Details</h1>
      <p className='mb-2'>
        <span className='font-bold'>Name:</span> {employee.name}
      </p>
      <p className='mb-2'>
        <span className='font-bold'>Email:</span> {employee.email}
      </p>
      <p className='mb-2'>
        <span className='font-bold'>Gender:</span> {employee.gender}
      </p>
      <p className='mb-2'>
        <span className='font-bold'>Years of Experience:</span> {employee.yearsOfExperience}
      </p>
      <p className='mb-2'>
        <span className='font-bold'>Designation:</span> {employee.designation}
      </p>
    </div>
  );
}
