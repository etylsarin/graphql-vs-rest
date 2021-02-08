import { useQuery, gql } from '@apollo/client';

export interface User {
  id: string,
  name: string,
  age: number
}

const USERS = gql`
  query {
    users {
      id
      name
      age
    }
  }
`;

export const Users: React.FunctionComponent<
  Omit<React.HTMLProps<HTMLUListElement>, "ref">
> = (props) => {
  const { loading, error, data } = useQuery(USERS);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Request failed :(</p>;

  return (
    <ul {...props}>
      {data.users.map(({ id, name, age }: User) => <li key={id}>{name} ({age})</li>)}
    </ul>
  );
};
