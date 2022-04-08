/* eslint-disable @next/next/link-passhref */
/* eslint-disable @next/next/no-img-element */
// import component semantic ui react
import { Menu, Container, Button } from 'semantic-ui-react';
// import component Link dari next
import Link from 'next/link';
// import useRouter dari next router
import { useRouter } from 'next/router';

export const Navbar = () => {
  const router = useRouter();
  return (
    <Menu
      inverted
      borderless
      attached
      color='grey'
      style={{ padding: '.3rem', marginBottom: '20px' }}
    >
      <Container>
        <Menu.Item name='home'>
          <Link href='/'>
            <img
              src='/vercel.svg'
              alt='logo'
              style={{ width: '100px', height: '50px' }}
            />
          </Link>
        </Menu.Item>
        <Menu.Menu position='right'>
          <Menu.Item>
            <Button
              size='mini'
              primary
              onClick={() => router.push('/users/newUser')}
            >
              New User
            </Button>
          </Menu.Item>
        </Menu.Menu>
      </Container>
    </Menu>
  );
};
