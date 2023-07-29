import { FormLabelProps } from '@mui/material';
import FormControl from '@mui/material/FormControl';
import { StyledFormLabel } from './StyledFormLabel';

interface FormControlWrapperProps extends RHFFormLabelProps {
  children: JSX.Element;
}
export interface RHFFormLabelProps {
  formLabel?: Omit<FormLabelProps, 'children'> & { label?: React.ReactNode };
}

const FormControlWrapper = ({ children, formLabel }: FormControlWrapperProps) => {
  return (
    <FormControl fullWidth>
      <StyledFormLabel {...formLabel} />
      {children}
    </FormControl>
  );
};

export default FormControlWrapper;
