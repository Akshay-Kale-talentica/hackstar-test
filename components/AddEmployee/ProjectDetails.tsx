'use client';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useForm, useFieldArray } from 'react-hook-form';

type Project = {
  projectName: string;
  achievements: string;
  startDate: string;
  endDate: string;
};

type FormValues = {
  projects: Project[];
};

export const ProjectDetails = () => {
  const { register, control, handleSubmit } = useForm<FormValues>({
    defaultValues: {
      projects: [{ projectName: '', achievements: '', startDate: '', endDate: '' }],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'projects',
  });

  const onSubmit = (data: FormValues) => {
    console.log(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className='max-w-md mx-auto'>
      {fields.map((field, index) => (
        <div key={field.id} className='space-y-2 flex-col mb-4'>
          <div className='flex justify-between'>
            <h2 className='text-2xl font-bold'>Project {index + 1}</h2>
            <button
              type='button'
              onClick={() => remove(index)}
              className='bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded '
            >
              Remove
            </button>
          </div>
          <div>
            <label className='block text-gray-700 font-bold mb-2' htmlFor={`projects.${index}.projectName`}>
              Project Name
            </label>
            <Input type='text' {...register(`projects.${index}.projectName`)} placeholder='Project Name' />
          </div>
          <div>
            <label htmlFor={`projects.${index}.achievements`} className='block text-gray-700 font-bold mb-2'>
              Achievements
            </label>
            <Textarea {...register(`projects.${index}.achievements`)} placeholder='Achievements' />
          </div>
          <div className='flex justify-between'>
            <div>
              <label htmlFor={`projects.${index}.startDate`} className='block text-gray-700 font-bold mb-2'>
                Start Date
              </label>
              <Input
                type='text'
                {...register(`projects.${index}.startDate`, { pattern: RegExp(/^(\d{1,2})-(\d{1,2})-(\d{4})$/) })}
                placeholder='dd-mm-yyyy'
              />
            </div>
            <div>
              <label htmlFor={`projects.${index}.endDate`} className='block text-gray-700 font-bold mb-2'>
                End Date
              </label>
              <Input
                type='text'
                {...register(`projects.${index}.endDate`, { pattern: RegExp(/^(\d{1,2})-(\d{1,2})-(\d{4})$/) })}
                placeholder='dd-mm-yyyy'
              />
            </div>
          </div>
        </div>
      ))}
      <div className='flex justify-between'>
        <button
          type='button'
          onClick={() => append({ projectName: '', achievements: '', startDate: '', endDate: '' })}
          className='bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded'
        >
          Add Project
        </button>
        <button type='submit' className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'>
          Submit
        </button>
      </div>
    </form>
  );
};
