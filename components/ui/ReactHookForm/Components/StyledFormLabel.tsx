import { FormLabel, styled } from '@mui/material';

export const StyledFormLabel = styled(FormLabel)({
  '&.MuiFormLabel-root': {
    letterSpacing: '0.2px',
    lineHeight: '1.4285rem',
    fontSize: '0.875rem',
  },
  '& .MuiFormLabel-asterisk': {
    color: 'red',
  },
});
