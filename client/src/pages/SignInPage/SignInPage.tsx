import './SignInPage.scss';
import React, { useEffect, useState } from 'react';

import { Input } from '../../components/Input/Input';
import { apiFetchPost } from '../../api/fetch/fetch';
import { Block } from '../../components/Block/Block';
import { Success } from '../../components/Success/Success';
import { Error } from '../../components/Error/Error';
import { Button } from '../../components/Button/Button';
import { BUTTON_TYPES } from '../../common/enums/button-types';
import { UserLogin } from '../../common/types/user-login';
import { Auth } from '../../api/auth';

export const SignInPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isRemember, setIsRemember] = useState(true);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    setIsRemember(isRemember);
  }, []);

  const handleSubmit = (event: React.FormEvent<HTMLElement>) => {
    event.preventDefault();
    setIsSubmitting(true);
    const userLogin: UserLogin = {
      email: email,
      password: password,
      rememberMe: isRemember,
    };
    apiFetchPost(
      '/api/User/login',
      userLogin,
    ).then((response) => {
      if (response.ok) {
        setSuccess(true);
        Auth.login();
      } else {
        setError(true);
        setErrorMessage(response.status === 400 ?
          'Invalid e-mail/password' :
          '');
      }
    })
      .catch((error) => {
        console.log('Fetch Post', error);
        setError(true);
      })
      .finally(() => setIsSubmitting(false));
  };

  return (
    <section className="sign-in-container">
      <Block title={'sign in'} percentWidth={50}>
        {
          success ?
            <Success /> :
            error ?
              <>
                <Error error={errorMessage} />
                <Button title={'retry'}
                  type={BUTTON_TYPES.DEFAULT}
                  onClick={() => setError(false)} />
              </> :
              <form onSubmit={(event) => handleSubmit(event)}>
                <Input
                  label={'E-mail'}
                  onChange={(event) => setEmail(event.target.value)}
                />
                <Input
                  label={'Password'}
                  onChange={(event) => setPassword(event.target.value)}
                />
                <Button
                  title={'sign in'}
                  type={BUTTON_TYPES.DEFAULT}
                  submitting={isSubmitting}
                />
              </form>
        }
      </Block>
    </section>
  );
};
