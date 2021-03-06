import React, { useEffect, useState } from 'react';
import './PersonalPage.scss';
import { LocalStorage, apiFetchPut, getApplications } from 'api';
import { BLOCK_TITLES, INPUT_TYPES, BUTTON_TYPES } from 'enums';
import {
  ConsultingApplication,
  TestingApplication,
  TrainingApplication,
  User,
  UserEdit,
} from 'types';
import { Block, Success, Error, Input, Button } from 'components';
import { ApplicationList } from './ApplicationList/ApplicationList';
import {
  TestingApplicationList,
} from './TestingApplicationList/TestingApplicationList';

export const PersonalPage = () => {
  const { fullName, email }: User = LocalStorage.getObject(
    [
      'fullName',
      'email',
      'birthDate',
    ]) as User;

  const [name, surname] = fullName.split(' ');

  const [nameState, setName] = useState(name);
  const [surnameState, setSurname] = useState(surname);
  const [emailState, setEmail] = useState(email);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isGetting, setIsGetting] = useState(false);
  const [isSuccess, setSuccess] = useState(false);
  const [isError, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const [testingApplications, setTestingApplications] =
    useState<TestingApplication[]>([]);
  const [trainingApplications, setTrainingApplications] =
    useState<TrainingApplication[]>([]);
  const [consultingApplications, setConsultingApplications] =
    useState<ConsultingApplication[]>([]);

  useEffect(() => {
    if (isError) setTimeout(() => setError(false), 3000);
  }, [isError]);

  const changedUser: UserEdit = {
    userName: nameState,
    userSurname: surnameState,
    email: emailState,
    birthDate: '01.01.0001',
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    apiFetchPut('/api/User', changedUser)
      .then((response) => {
        if (response.status === 200) {
          setSuccess(true);
          LocalStorage
            .getLocalStorage()
            .setItem('fullName', `${nameState} ${surnameState}`);
        } else {
          setError(true);
          setErrorMessage(response.statusText);
        }
      })
      .catch((error) => alert('/api/User' + error))
      .finally(() => setIsSubmitting(false));
  };

  const getHistory = () => {
    getApplications(
      '/api/TestingApplication/userId',
      setIsGetting,
      setTestingApplications,
    );
    getApplications(
      '/api/TrainingApplication/userId',
      setIsGetting,
      setTrainingApplications,
    );
    getApplications(
      '/api/ConsultingApplication/userId',
      setIsGetting,
      setConsultingApplications,
    );
  };

  return (
    <section className="personal-page-container">
      <Block title={BLOCK_TITLES.EDIT_PROFILE} percentWidth={30}>
        {isSuccess ?
          <Success message={'Saved successfully!'} /> :
          isError ?
            <Error error={errorMessage} /> :
            <form onSubmit={(e) => handleSubmit(e)}>
              <Input label={'Name'}
                onChange={(e) => setName(e.target.value)}
                value={nameState}
                isRequired={true}
              />
              <Input label={'Surname'}
                onChange={(e) => setSurname(e.target.value)}
                value={surnameState}
                isRequired={true}
              />
              <Input label={'E-mail'}
                onChange={(e) => setEmail(e.target.value)}
                value={emailState}
                type={INPUT_TYPES.EMAIL}
                isRequired={true}
              />
              <Button
                title={isSubmitting ? 'saving...' : 'save'}
                type={BUTTON_TYPES.DEFAULT}
                submitting={isSubmitting}
              />
            </form>
        }
      </Block>
      <Block title={BLOCK_TITLES.HISTORY} percentWidth={60}>
        {testingApplications.length ||
          trainingApplications.length ||
          consultingApplications.length ?
          <ul className="application-list">
            <TestingApplicationList
              applications={testingApplications} />
            <ApplicationList
              applications={trainingApplications} />
            <ApplicationList
              applications={consultingApplications} />
          </ul> :
          <Button
            title={isGetting ? 'getting...' : 'get history'}
            type={BUTTON_TYPES.DEFAULT}
            onClick={() => getHistory()}
            submitting={isGetting}
          />
        }
      </Block>
    </section>
  );
};
