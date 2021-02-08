import { useState } from 'react';
import { useMutation, gql } from '@apollo/client';

export interface User {
  id: string,
  name: string,
  age: number
}

const ADD_USER = gql`
  mutation ($name: String!, $age: Int!) {
    createUser(name: $name, age: $age) {
      name
    }
  }
`;

interface AddUserProps {
  defaultName?: string;
  defaultAge?: number;
}

export const AddUser: React.FunctionComponent<
  AddUserProps & React.HTMLProps<HTMLFormElement>
> = ({ defaultName, defaultAge, ...args }) => {
  const [name, setName] = useState(defaultName);
  const [age, setAge] = useState(defaultAge);
  const [message, setMessage] = useState('');

  const resetInputs = () => {
    setMessage(name!);
    setName(defaultName);
    setAge(defaultAge);
  };

  const [addUser, { loading, error }] = useMutation(ADD_USER, { onCompleted: resetInputs });

  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
  };

  const handleAgeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAge(parseInt(event.target.value, 10));
  }

  const handleSubmit = () => {
    addUser({ variables: { name, age } });
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Request failed :(</p>;

  return (
    <>
      {(message) ? <p className="message">User {message} has been added.</p> : null}

      <form {...args} onSubmit={handleSubmit}>
        <input type="text" placeholder="name" value={name} onChange={handleNameChange} />
        <input type="number" placeholder="age" value={age || ''} onChange={handleAgeChange} />
        <button type="submit">Submit</button>
      </form>
    </>
  );
};

AddUser.defaultProps = {
  defaultName: '',
  defaultAge: 0
};
