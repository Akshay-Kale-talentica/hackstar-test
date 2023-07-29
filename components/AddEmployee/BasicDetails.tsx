'use client';

import { Input } from '@/components/ui/input';
import { useForm } from 'react-hook-form';
import { SelectItem, Select, SelectContent, SelectValue, SelectTrigger } from '@/components/ui/select';

type EmployeeFormInputs = {
  name: string;
  designation: string;
  gender: string;
  yearsOfExperience: number;
};

export function BasicDetails() {
  const { register, handleSubmit } = useForm<EmployeeFormInputs>();

  const onSubmit = (data: EmployeeFormInputs) => {
    console.log(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className='max-w-md mx-auto'>
      <div className='mb-4'>
        <label htmlFor='name' className='block text-gray-700 font-bold mb-2'>
          Name
        </label>
        <Input type='text' id='name' {...register('name')} />
      </div>

      <div className='mb-4'>
        <label htmlFor='designation' className='block text-gray-700 font-bold mb-2'>
          Designation
        </label>
        <Input type='text' id='designation' {...register('designation')} />
      </div>

      <div className='mb-4'>
        <label htmlFor='Gender' className='block text-gray-700 font-bold mb-2'>
          Gender
        </label>
        <Select {...register('gender')}>
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value='MALE'>Male</SelectItem>
            <SelectItem value='FEMALE'>Female</SelectItem>
            <SelectItem value='OTHER'>Other</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className='mb-4'>
        <label htmlFor='yearsOfExperience' className='block text-gray-700 font-bold mb-2'>
          Years of Experience
        </label>
        <Input type='number' id='yearsOfExperience' {...register('yearsOfExperience')} />
      </div>

      <div className='flex items-center justify-center'>
        <button
          type='submit'
          className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline'
        >
          Submit
        </button>
      </div>
    </form>
  );
}
