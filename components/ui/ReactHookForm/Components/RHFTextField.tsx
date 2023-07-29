import { FormHelperText, TextField, TextFieldProps } from '@mui/material';
import { Fragment } from 'react';
import { Controller, UseControllerProps, useFormContext } from 'react-hook-form';
import FormControlWrapper, { RHFFormLabelProps } from './FormControl';

export interface RHFTextFieldProps extends UseControllerProps, RHFFormLabelProps {}

export const RTextField = ({ name, label, rules, ...props }: TextFieldProps & UseControllerProps) => {
  const { control } = useFormContext();
  return (
    <Controller
      name={name}
      control={control}
      rules={rules}
      render={({ field: { onChange, value, ...field }, fieldState: { error } }) => {
        return (
          <Fragment>
            <TextField
              helperText={error?.message}
              error={!!error}
              onChange={onChange}
              value={value}
              label={label}
              {...field}
              {...props}
            />
            {props?.inputProps?.maxLength && (
              <FormHelperText>{`${value?.length ?? 0} / ${props?.inputProps?.maxLength}`}</FormHelperText>
            )}
          </Fragment>
        );
      }}
    />
  );
};

export const RHFTextField = ({ formLabel, ...props }: RHFTextFieldProps & TextFieldProps) => {
  return (
    <FormControlWrapper formLabel={formLabel}>
      <RTextField {...props} />
    </FormControlWrapper>
  );
};
