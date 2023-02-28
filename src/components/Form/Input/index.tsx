import { forwardRef, InputHTMLAttributes } from 'react';
import { UseFormRegisterReturn } from 'react-hook-form';
import { iUserCreate } from '../../../Interfaces/userInterface';
import { StyledTextField } from '../../../styles/form';
import { StyledParagraph } from '../../../styles/typography';

interface IInputProps {
  label: string;
  type: 'text' | 'email' | 'password';
  error?: string | undefined;
  register: UseFormRegisterReturn<string>;
}
const Input = ({ error, register, label, type }: IInputProps) => (
  <fieldset>
    <StyledTextField label={label} type={type} {...register} />
    {error ? <StyledParagraph fontColor='red'>{error}</StyledParagraph> : null}
  </fieldset>
);

export default Input;
