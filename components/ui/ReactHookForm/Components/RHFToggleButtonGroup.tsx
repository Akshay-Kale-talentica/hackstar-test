import { ToggleButton, ToggleButtonGroup, ToggleButtonGroupProps, ToggleButtonProps } from '@mui/material';
import { Controller, UseControllerProps, useFormContext } from 'react-hook-form';
interface ExtendedButtonGroupProps {
  options: (Omit<ToggleButtonProps, 'value'> & ToggleButtonOptionValues)[];
  afterOnChange?: (newValue: any) => void;
}
export interface ToggleButtonOptionValues {
  optionValue: string;
  component: string | JSX.Element;
}

export const RHFToggleButtonGroup = ({
  name,
  rules,
  options,
  afterOnChange,
  ...props
}: ExtendedButtonGroupProps & ToggleButtonGroupProps & UseControllerProps) => {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      rules={rules}
      control={control}
      render={({ field: { onChange, value } }) => {
        return (
          <ToggleButtonGroup
            exclusive
            value={value}
            onChange={(_e, newValue) => {
              onChange(newValue);
              afterOnChange?.(newValue);
            }}
            {...props}
          >
            {options.map(({ optionValue, component, ...toggleButtonProps }) => (
              <ToggleButton value={optionValue} key={optionValue} {...toggleButtonProps}>
                {component}
              </ToggleButton>
            ))}
          </ToggleButtonGroup>
        );
      }}
    />
  );
};
