import { FormHelperText, MenuItem, Select, SelectProps } from '@mui/material';
import { Fragment } from 'react';
import { Controller, UseControllerProps, useFormContext } from 'react-hook-form';
import FormControlWrapper, { RHFFormLabelProps } from './FormControl';
export interface RHFSelectProps extends UseControllerProps, RHFFormLabelProps {
  options: { label: string; value: string }[];
}
export const RSelect = ({ name, options, rules, ...props }: SelectProps & Omit<RHFSelectProps, 'formLabel'>) => {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      rules={rules}
      control={control}
      render={({ field: { onChange, value, ...field }, fieldState: { error } }) => {
        return (
          <Fragment>
            <Select error={!!error?.message} onChange={onChange} value={value} {...field} {...props}>
              {options.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </Select>
            <FormHelperText error>{error?.message}</FormHelperText>
          </Fragment>
        );
      }}
    />
  );
};

export const RHFSelect = ({ formLabel, ...props }: RHFSelectProps & SelectProps) => {
  return (
    <FormControlWrapper formLabel={formLabel}>
      <RSelect {...props} />
    </FormControlWrapper>
  );
};
