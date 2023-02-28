import { useContext } from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { iLogin } from '../../../Interfaces/userInterface';
import { StyledButton } from '../../../styles/button';
import { StyledForm } from '../../../styles/form';
import Input from '../Input';
import { UserContext } from '../../../Contexts/UserContext';

const schema = yup.object({
  email: yup.string().email(),
  password: yup.string(),
});
const LoginForm = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<iLogin>({ resolver: yupResolver(schema) });
  const { login } = useContext(UserContext);
  const loginForm = (data: iLogin) => {
    login(data);
    reset();
  };
  return (
    <StyledForm onSubmit={handleSubmit(loginForm)}>
      <Input
        register={register('email')}
        label='Email'
        type='email'
        error={errors.email?.message}
      />
      <Input
        register={register('password')}
        label='Senha'
        type='password'
        error={errors.password?.message}
      />
      <StyledButton $buttonSize='default' $buttonStyle='green'>
        Entrar
      </StyledButton>
    </StyledForm>
  );
};

export default LoginForm;
