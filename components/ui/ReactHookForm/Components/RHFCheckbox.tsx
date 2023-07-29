import { Checkbox, CheckboxProps, FormControlLabel, FormControlLabelProps } from '@mui/material';
import { Controller, UseControllerProps, useFormContext } from 'react-hook-form';

export const RHFCheckbox = ({
  name,
  label,
  labelPlacement = 'end',
  rules,
  ...props
}: Omit<FormControlLabelProps, 'control'> & CheckboxProps & UseControllerProps) => {
  const { control } = useFormContext();
  return (
    <Controller
      name={name}
      rules={rules}
      control={control}
      render={({ field: { onChange, value, ...field } }) => {
        return (
          <FormControlLabel
            control={<Checkbox onChange={onChange} defaultChecked={value} {...field} {...props} />}
            label={label}
            labelPlacement={labelPlacement}
          />
        );
      }}
    />
  );
};
