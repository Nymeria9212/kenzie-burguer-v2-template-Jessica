import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useContext } from 'react';
import Input from '../Input';
import { StyledButton } from '../../../styles/button';
import { StyledForm } from '../../../styles/form';
import { iUserCreate } from '../../../Interfaces/userInterface';
import { UserContext } from '../../../Contexts/UserContext';

const schema = yup
  .object({
    name: yup.string(),
    email: yup.string().email(),
    password: yup
      .string()
      .matches(/[a-z]/, 'Deve conter ao menos 1 letra minuscula')
      .matches(/(\d)/, 'Deve conter ao menos 1 número')
      .matches(/[A-Z]/, 'Deve conter ao menos 1 letra maiúscula')
      .matches(/(\W|_)/, 'Deve conter no mínimo 1 caracter especial')
      .matches(/.{6,}/, 'Deve conter no mínimo 6 caracteres')
      .required('Senha obrigatória'),
    checkpassword: yup
      .string()
      .oneOf([yup.ref('password')], 'Senhas precisam ser iguais')
      .required('Conrfirmação de senha obrigatória'),
  })
  .required();

const RegisterForm = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<iUserCreate>({ resolver: yupResolver(schema) });
  const { createUser } = useContext(UserContext);

  const onSubmitForm = (data: iUserCreate) => {
    createUser(data);
    reset();
  };
  return (
    <StyledForm onSubmit={handleSubmit(onSubmitForm)}>
      <Input
        error={errors.name?.message}
        label='Nome'
        register={register('name')}
        type='text'
      />
      <Input
        label='Email'
        type='email'
        register={register('email')}
        error={errors.email?.message}
      />
      <Input
        label='Senha'
        register={register('password')}
        error={errors.password?.message}
        type='password'
      />
      <Input
        label='Confirmar senha'
        register={register('checkpassword')}
        error={errors.password?.message}
        type='password'
      />
      <StyledButton $buttonSize='default' $buttonStyle='gray'>
        Cadastrar
      </StyledButton>
    </StyledForm>
  );
};

export default RegisterForm;
