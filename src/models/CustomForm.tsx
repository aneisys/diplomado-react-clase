import { useForm, type SubmitHandler } from 'react-hook-form';
import { schema, type FormValues } from './form.model';
import { zodResolver } from '@hookform/resolvers/zod';
import InputForm from '../components/Form/CustomInput';

export const CustomForm = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    mode: 'onSubmit',
    defaultValues: {
      name: '',
      email: '',
      password: '',
      confirmPassWord: '',
    },
  });

  const onSubmit: SubmitHandler<FormValues> = (data) => {
    console.log('submit', data);
  };

  // return (
  //   <form onSubmit={handleSubmit(onSubmit)}>
  //     <div className='form-group'>
  //       <label htmlFor='name'>Nombre</label>
  //       <Controller
  //         name='name'
  //         control={control}
  //         render={({field}) => (
  //           <input
  //             id='name'
  //             type='string'
  //             {...field}
  //             className={`form-control ${errors.name ? 'is-invalid' : ''}`}
  //           />
  //         )}
  //       />
  //       {errors.name && <div className='error'>{errors.name.message}</div>}
  //     </div>
  //   </form>
  // );

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <InputForm
        control={control}
        label="Name"
        name="name"
        type="text"
        error={errors.name}
      />
       <InputForm
        control={control}
        label="Email"
        name="email"
        type="email"
        error={errors.email}
      />
       <InputForm
        control={control}
        label="Password"
        name="password"
        type="text"
        error={errors.password}
      />
       <InputForm
        control={control}
        label="Confirmar password"
        name="confirmPassWord"
        type="text"
        error={errors.confirmPassWord}
      />
      <button type='submit'>Submit</button>
    </form>
  );
};
