import { Autocomplete, AutocompleteProps, TextField } from '@mui/material';
import { Controller, UseControllerProps, useFormContext } from 'react-hook-form';
import FormControlWrapper, { RHFFormLabelProps } from './FormControl';

interface RHFAutoCompleteProps extends UseControllerProps, RHFFormLabelProps {
  onChange?: (value: any) => void;
}

export const RAutoComplete = ({
  name,
  rules,
  options,
  onChange,
  ...props
}: Omit<AutocompleteProps<any, any, any, any, any>, 'renderInput' | 'onChange'> &
  Omit<RHFAutoCompleteProps, 'formLabel'>) => {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      rules={rules}
      render={({ field: { onChange: handleChange, value, ...field }, fieldState: { error } }) => {
        return (
          <Autocomplete
            options={options}
            value={value}
            onChange={(_e, newValue) => {
              handleChange(newValue || null);
              onChange?.(newValue || null);
            }}
            renderInput={(params) => (
              <TextField error={!!error?.message} helperText={error?.message} {...params} variant='outlined' />
            )}
            {...field}
            {...props}
          />
        );
      }}
    />
  );
};

export const RHFAutoComplete = ({
  formLabel,
  ...props
}: Omit<AutocompleteProps<any, any, any, any, any>, 'renderInput' | 'onChange'> & RHFAutoCompleteProps) => {
  return (
    <FormControlWrapper formLabel={formLabel}>
      <RAutoComplete {...props} />
    </FormControlWrapper>
  );
};
