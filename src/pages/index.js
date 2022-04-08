// import component semantic ui react
import { Container, Button, Grid, Header, Table } from 'semantic-ui-react';
// import useRouter dari next router
import { useRouter } from 'next/router';

export default function Home({ users = [] }) {
  // buat component jika data users belum ada
  const router = useRouter();
  if (users.length === 0) {
    return (
      <Grid
        centered
        verticalAlign='middle'
        columns='1'
        style={{ height: '80vh' }}
      >
        <Grid.Row>
          <Grid.Column textAlign='center'>
            <h1>Data Users Belum Tersedia</h1>
            <div>
              <Button primary onClick={() => router.push('/users/newUser')}>
                Create New User
              </Button>
            </div>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    );
  }

  // component jika data user tersedia
  return (
    <Container>
      <Header as='h2' textAlign='center'>
        Data Users
      </Header>
      <Table basic>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Id</Table.HeaderCell>
            <Table.HeaderCell>First Name</Table.HeaderCell>
            <Table.HeaderCell>Last Name</Table.HeaderCell>
            <Table.HeaderCell>Email</Table.HeaderCell>
            <Table.HeaderCell>No. Phone</Table.HeaderCell>
            <Table.HeaderCell>Address</Table.HeaderCell>
            <Table.HeaderCell>Action</Table.HeaderCell>
            <Table.HeaderCell />
          </Table.Row>
        </Table.Header>

        <Table.Body>
          {users &&
            users.map((user) => (
              <Table.Row key={user._id}>
                <Table.Cell>{user.id}</Table.Cell>
                <Table.Cell>{user.firstName}</Table.Cell>
                <Table.Cell>{user.lastName}</Table.Cell>
                <Table.Cell>{user.email}</Table.Cell>
                <Table.Cell>{user.phone}</Table.Cell>
                <Table.Cell>{user.address}</Table.Cell>
                <Table.Cell>
                  <Button
                    primary
                    onClick={() => router.push(`/users/${user._id}`)}
                  >
                    View
                  </Button>
                </Table.Cell>
                <Table.Cell>
                  <Button
                    color='grey'
                    onClick={() => router.push(`/users/${user._id}/editUser`)}
                  >
                    Edit
                  </Button>
                </Table.Cell>
              </Table.Row>
            ))}
        </Table.Body>
      </Table>
    </Container>
  );
}

// function untuk mengambil data users dari database mongodb
export async function getServerSideProps() {
  const response = await fetch('http://localhost:3000/api/users');
  const users = await response.json();

  return {
    props: {
      users,
    },
  };
}
