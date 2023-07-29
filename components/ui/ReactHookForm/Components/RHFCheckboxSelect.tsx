import { Checkbox, FormHelperText, MenuItem, Select, SelectProps } from '@mui/material';
import { Fragment } from 'react';
import { Controller, UseControllerProps, useFormContext } from 'react-hook-form';
import { RHFSelectProps } from './RHFSelect';
import FormControlWrapper from './FormControl';

export const RCheckboxSelect = ({
  name,
  options,
  rules,
  ...props
}: Omit<RHFSelectProps, 'formLabel'> & UseControllerProps) => {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      rules={rules}
      control={control}
      render={({ field: { onChange, value, ...field }, fieldState: { error } }) => {
        return (
          <Fragment>
            <Select
              error={!!error?.message}
              onChange={onChange}
              value={value ?? []}
              renderValue={(selected) => selected.join(', ')}
              {...field}
              {...props}
            >
              {options.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  <Checkbox checked={value?.indexOf(option.value) > -1} />
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

export const RHFCheckboxSelect = ({ formLabel, ...props }: RHFSelectProps & SelectProps) => {
  return (
    <FormControlWrapper formLabel={formLabel}>
      <RCheckboxSelect {...props} />
    </FormControlWrapper>
  );
};
