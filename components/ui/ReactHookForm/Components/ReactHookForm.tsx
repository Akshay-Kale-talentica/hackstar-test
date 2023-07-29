import { ReactNode } from 'react';
import { FormProvider } from 'react-hook-form';

interface ReactHookFormProps {
  methods: any;
  children: ReactNode;
}
export function ReactHookForm({ children, methods }: ReactHookFormProps) {
  return (
    <FormProvider {...methods}>
      <form>{children}</form>
    </FormProvider>
  );
}
