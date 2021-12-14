import { Block } from '../../components/Block/Block';
import React, { PropsWithChildren, useState } from 'react';
import './TrainingAndConsultingPages.scss';
import { BLOCK_TITLES } from '../../common/enums/block-titles';
import { TRAINING_AND_CONSULTING_TEXT } from '../../common/enums/texts';
import { Button } from '../../components/Button/Button';
import { BUTTON_TYPES } from '../../common/enums/button-types';
import { Input } from '../../components/Input/Input';

const ParentComponent = ({ title, text, children }:
  PropsWithChildren<{ title: string, text: string }>) => {
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);
  const [isSubmiting, setIsSubmiting] = useState(false);

  const handleSubmit = (event: React.FormEvent<HTMLElement>) => {
    setIsSubmiting(true);
    event.preventDefault();
    const random = Math.round(Math.random());
    setTimeout(() => {
      random ? setSuccess(true) : setError(true);
      setIsSubmiting(false);
    }, 2000);
  };

  return (
    <section className={title + '-page-container'}>
      <Block title={title} percentWidth={100}>
        <div className={title + '-page-inner'}>
          <p>{text}</p>
          {success ?
            <Success /> :
            error ?
              <>
                <Error />
                <Button title={'retry'}
                  type={BUTTON_TYPES.DEFAULT}
                  onClick={() => setError(false)}
                />
              </> :
              <form onSubmit={(e) => handleSubmit(e)}>
                {children}
                <Button
                  title={'submit'}
                  type={BUTTON_TYPES.DEFAULT}
                  submiting={isSubmiting}
                />
              </form>
          }
        </div>
      </Block>
    </section>
  );
};

const SUCCESS = <svg xmlns="http://www.w3.org/2000/svg" width="200" height="200" viewBox="0 0 400 400" fill="#71bded"><path d="M200 0a200 200 0 1 0 0 400 200 200 0 0 0 0-400zm0 374a174 174 0 1 1 0-348 174 174 0 0 1 0 348z" /><path d="M272 135 169 238l-41-42a13 13 0 0 0-19 19l51 50c3 3 6 4 9 4s7-1 10-4l112-112a13 13 0 1 0-19-18z" /></svg>;
const ERROR = <svg width="200px" height="200px" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg" fill="red"><path d="M8.6 1c1.6.1 3.1.9 4.2 2 1.3 1.4 2 3.1 2 5.1 0 1.6-.6 3.1-1.6 4.4-1 1.2-2.4 2.1-4 2.4-1.6.3-3.2.1-4.6-.7-1.4-.8-2.5-2-3.1-3.5C.9 9.2.8 7.5 1.3 6c.5-1.6 1.4-2.9 2.8-3.8C5.4 1.3 7 .9 8.6 1zm.5 12.9c1.3-.3 2.5-1 3.4-2.1.8-1.1 1.3-2.4 1.2-3.8 0-1.6-.6-3.2-1.7-4.3-1-1-2.2-1.6-3.6-1.7-1.3-.1-2.7.2-3.8 1-1.1.8-1.9 1.9-2.3 3.3-.4 1.3-.4 2.7.2 4 .6 1.3 1.5 2.3 2.7 3 1.2.7 2.6.9 3.9.6zM7.9 7.5L10.3 5l.7.7-2.4 2.5 2.4 2.5-.7.7-2.4-2.5-2.4 2.5-.7-.7 2.4-2.5-2.4-2.5.7-.7 2.4 2.5z" /></svg>;

const Success = () => {
  return (
    <>
      {SUCCESS}
      <h2>Done!</h2>
      <p className="attention">We will contact you as soon as possible</p>
    </>
  );
};

const Error = () => {
  return (
    <>
      {ERROR}
      <h3>Something went wrong...</h3>
    </>
  );
};

export const TrainingPage = () => {
  return (
    <ParentComponent
      title={BLOCK_TITLES.TRAINING}
      text={TRAINING_AND_CONSULTING_TEXT.TRAINING_TEXT}
    >
      <Input label={'Name'} isRequired={true} />
      <Input label={'E-mail'} />
    </ParentComponent>
  );
};

export const ConsultingPage = () => {
  return (
    <ParentComponent
      title={BLOCK_TITLES.CONSULTING}
      text={TRAINING_AND_CONSULTING_TEXT.CONSULTING_TEXT}
    >
      <Input label={'Name'} />
      <Input label={'E-mail'} />
      <Input label={'Convenient day'} />
    </ParentComponent>
  );
};

