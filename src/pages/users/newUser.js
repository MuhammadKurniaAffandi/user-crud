/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
// import component semantic ui
import { Button, Form, Grid, Loader, Header } from 'semantic-ui-react';
// import useRouter dari next router
import { useRouter } from 'next/router';

const CreateUser = () => {
  // state untuk menampung user baru
  const [newUser, setNewUser] = useState({
    id: '',
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
  });

  // state untuk submiting
  const [isSubmit, setIsSubmit] = useState(false);
  // state untuk menampung pesan errors
  const [errors, setErrors] = useState({});
  // desctructuring useRouter
  const { push, query } = useRouter();

  // fungsi untuk mengambil single data user untuk di update / edit
  const getUser = async () => {
    const response = await fetch(`http://localhost:3000/api/users/${query.id}`);
    const data = await response.json();
    setNewUser({
      id: data.id,
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      phone: data.phone,
      address: data.address,
    });
  };

  useEffect(() => {
    if (query.id) getUser();
  }, [query.id]);

  // fungsi untuk validasi inputan form
  const validate = () => {
    // variabel untuk menampung pesan error
    let errors = {};

    // validasi untuk id
    if (!newUser.id) {
      errors.id = 'Id Harus diisi';
    } else {
      errors.id = '';
    }
    // validasi untuk first name
    if (!newUser.firstName) {
      errors.firstName = 'First Name Harus diisi';
    } else {
      errors.firstName = '';
    }
    // validasi untuk id
    if (!newUser.lastName) {
      errors.lastName = 'Last Name Harus diisi';
    } else {
      errors.lastName = '';
    }

    // validasi untuk email
    if (!newUser.email) {
      errors.email = 'Email Harus diisi';
    } else {
      errors.email = '';
    }

    // validasi untuk No Phone
    if (!newUser.phone) {
      errors.phone = 'No. Phone Harus diisi';
    } else {
      errors.phone = '';
    }

    // validasi untuk Address
    if (!newUser.address) {
      errors.address = 'Address Harus diisi';
    } else if (newUser.address.length >= 400) {
      errors.address =
        'Huruf Karakter Address tidak bisa lebih dari 400 karakter';
    } else {
      errors.address = '';
    }

    return errors;
  };

  // fungsi untuk handle submit menggunakan async karena akan berinteraksi dengan api
  const handleSubmit = async (e) => {
    e.preventDefault();
    let findErrors = validate();
    // cek kondisi jika ada error
    // TODO: penyakitnya di sini wkwk, jangan pakai Object Keys, tapi pakai values dan some
    // if (Object.keys(errors).length) return setErrors(errors);
    // cek kondisi jika ada error
    if (Object.values(findErrors).some((err) => err !== ''))
      return setErrors(findErrors);

    setIsSubmit(true);
    // kondisi untuk menentukan form untuk Create User atau Edit User
    if (query.id) {
      await updateUser();
    } else {
      await createUser();
    }
    // jika form berhasil, kembalikan ke halaman home
    await push('/');
    setIsSubmit(false);
  };

  // fungs untuk menyimpan update data user ke database
  const updateUser = async () => {
    try {
      await fetch(`http://localhost:3000/api/users/${query.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newUser),
      });
    } catch (error) {
      console.log(error);
    }
  };

  // fungs untuk menyimpan data user ke database
  const createUser = async () => {
    try {
      await fetch('http://localhost:3000/api/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newUser),
      });
    } catch (error) {
      console.log(error);
    }
  };

  // fungsi untuk handle change input
  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewUser({
      ...newUser,
      [name]: value,
    });
    setErrors({
      ...errors,
      [name]: '',
    });
  };
  return (
    <Grid
      centered
      verticalAlign='middle'
      columns={3}
      style={{ height: '80vh' }}
    >
      <Grid.Row>
        <Grid.Column>
          <div>
            <Header as='h2' textAlign='center' style={{ marginBottom: '40px' }}>
              {query.id ? 'Update User' : 'Create User'}
            </Header>
            <div>
              {isSubmit ? (
                <Loader active inline='centered' />
              ) : (
                <Form onSubmit={handleSubmit}>
                  <Form.Group widths='equal'>
                    <Form.Input
                      label='Id'
                      placeholder='Enter a Id'
                      name='id'
                      onChange={handleChange}
                      value={newUser.id}
                      autoFocus
                      error={
                        errors.id ? { content: 'Please enter a Id' } : null
                      }
                    />
                    <Form.Input
                      label='No. Phone'
                      placeholder='Enter a No. Phone'
                      name='phone'
                      onChange={handleChange}
                      value={newUser.phone}
                      error={
                        errors.phone
                          ? { content: 'Please enter a No. Phone' }
                          : null
                      }
                    />
                  </Form.Group>

                  <Form.Group widths='equal'>
                    <Form.Input
                      label='First Name'
                      placeholder='Enter a First Name'
                      name='firstName'
                      onChange={handleChange}
                      value={newUser.firstName}
                      error={
                        errors.firstName
                          ? { content: 'Please enter a First Name' }
                          : null
                      }
                    />
                    <Form.Input
                      label='Last Name'
                      placeholder='Enter a Last Name'
                      name='lastName'
                      onChange={handleChange}
                      value={newUser.lastName}
                      error={
                        errors.lastName
                          ? { content: 'Please enter a Last Name' }
                          : null
                      }
                    />
                  </Form.Group>

                  <Form.Input
                    type='email'
                    label='Email'
                    placeholder='Enter a Email'
                    name='email'
                    onChange={handleChange}
                    value={newUser.email}
                    error={
                      errors.email ? { content: 'Please enter a Email' } : null
                    }
                  />

                  <Form.TextArea
                    label='Address'
                    placeholder='Enter a Address'
                    name='address'
                    onChange={handleChange}
                    value={newUser.address}
                    error={
                      errors.address
                        ? { content: 'Please enter a Address' }
                        : null
                    }
                  />
                  <Button type='submit' primary>
                    {query.id ? 'Update' : 'Submit'}
                  </Button>
                  <Button color='grey' onClick={() => push('/')}>
                    Cancel
                  </Button>
                </Form>
              )}
            </div>
          </div>
        </Grid.Column>
      </Grid.Row>
    </Grid>
  );
};

export default CreateUser;
