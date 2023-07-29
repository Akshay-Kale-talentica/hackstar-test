import { TextField } from '@mui/material';
import { DatePicker, DatePickerProps, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { parse } from 'date-fns';
import { Controller, UseControllerProps, useFormContext } from 'react-hook-form';
import FormControlWrapper, { RHFFormLabelProps } from './FormControl';

export interface RHFDatePickerProps extends UseControllerProps, RHFFormLabelProps {}
export const RDatePicker = ({
  name,
  rules,
  ...props
}: Omit<DatePickerProps<Date, Date>, 'renderInput' | 'onChange' | 'value'> & Omit<RHFDatePickerProps, 'formLabel'>) => {
  const { control } = useFormContext();
  return (
    <Controller
      name={name}
      rules={rules}
      control={control}
      render={({ field: { onChange, value, ...field }, fieldState: { error } }) => {
        return (
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DatePicker
              onChange={onChange}
              value={formatDate(value, props.inputFormat)}
              renderInput={(params) => <TextField error={!!error?.message} helperText={error?.message} {...params} />}
              {...field}
              {...props}
            />
          </LocalizationProvider>
        );
      }}
    />
  );
};

export const RHFDatePicker = ({
  formLabel,
  ...props
}: Omit<DatePickerProps<Date, Date>, 'renderInput' | 'onChange' | 'value'> & RHFDatePickerProps) => {
  return (
    <FormControlWrapper formLabel={formLabel}>
      <RDatePicker {...props} />
    </FormControlWrapper>
  );
};

export const formatDate = (value: string | Date | number, format: string = 'dd/MM/yyyy') => {
  if (value instanceof Date) {
    return value;
  } else if (typeof value === 'number') {
    return new Date(value);
  } else if (typeof value === 'string') {
    return parse(value, format, new Date());
  } else return null;
};
