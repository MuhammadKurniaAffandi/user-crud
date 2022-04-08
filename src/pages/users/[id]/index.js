import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { Confirm, Button, Table, Container } from 'semantic-ui-react';
import Error from 'next/error';

const User = ({ user, error }) => {
  // state untuk menampung nilai awal confirm
  const [confirm, setConfirm] = useState(false);
  // state untuk menampung nilai awal deleting
  const [isDeleting, setIsDeleting] = useState(false);
  const { push, query } = useRouter();

  // fungsi untuk proses deleting
  const deleteUser = async () => {
    const { id } = query;
    // proses connect untuk deleting ke api
    try {
      await fetch(`http://localhost:3000/api/users/${id}`, {
        method: 'DELETE',
      });
    } catch (error) {
      console.log(error);
    }
  };

  // fungsi untuk membuka component modal
  const open = () => setConfirm(true);
  // fungsi untuk menutup component modal
  const close = () => setConfirm(false);

  // fungsi untuk deleting
  const handleDelete = async () => {
    setIsDeleting(true);
    await deleteUser();
    await push('/');
    close();
  };

  // kondisi jika terjadi error
  if (error && error.statusCode) {
    return <Error statusCode={error.statusCode} title={error.statusText} />;
  }
  return (
    <Container>
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
          <Table.Row key={user._id}>
            <Table.Cell>{user.id}</Table.Cell>
            <Table.Cell>{user.firstName}</Table.Cell>
            <Table.Cell>{user.lastName}</Table.Cell>
            <Table.Cell>{user.email}</Table.Cell>
            <Table.Cell>{user.phone}</Table.Cell>
            <Table.Cell>{user.address}</Table.Cell>
            <Table.Cell>
              <Button color='red' onClick={open} loading={isDeleting}>
                Delete
              </Button>
            </Table.Cell>
            <Table.Cell>
              <Button primary onClick={() => push('/')}>
                Back
              </Button>
            </Table.Cell>
          </Table.Row>
        </Table.Body>
      </Table>
      <Confirm
        content='Apakah anda yakin ingin menghapus User ini?'
        header='Mohon dikonfirmasi'
        open={confirm}
        onConfirm={handleDelete}
        onCancel={close}
      />
    </Container>
  );
};

// request ke API
export async function getServerSideProps({ query: { id } }) {
  const response = await fetch(`http://localhost:3000/api/users/${id}`);
  if (response.status === 200) {
    const user = await response.json();
    return {
      props: {
        user,
      },
    };
  }

  return {
    props: {
      error: {
        statusCode: response.status,
        statusText: 'Invalid ID',
      },
    },
  };
}

export default User;
