import { RegisterUserDto } from '../../auth/dto/registerUser.dto';

// hashed password is `Heslo123*`
export const USERS: RegisterUserDto[] = [
  {
    id: '9a0f4584-50d7-4686-a24e-006fa744666e',
    email: 'email@email.com',
    password: '$2b$10$L3BrkiGWeUJ2e1xZTpO5J.yOdoWDEbzPGWLd5vtgYJipnHaqRX8wu',
    username: 'mrcrow',
  },
  {
    id: 'f66e4999-4045-4137-86dd-acf134f9f7b2',
    email: 'johny@email.com',
    password: '$2b$10$L3BrkiGWeUJ2e1xZTpO5J.yOdoWDEbzPGWLd5vtgYJipnHaqRX8wu',
    username: 'redactor1',
  },
  {
    id: 'd8d3a993-b687-432b-aca1-e8dce7c47956',
    email: 'stephen@email.com',
    password: '$2b$10$L3BrkiGWeUJ2e1xZTpO5J.yOdoWDEbzPGWLd5vtgYJipnHaqRX8wu',
    username: 'coredactor1',
  },
  {
    id: 'c4590b58-f8ac-4762-8314-e72833fa02c9',
    email: 'hyperxion@email.com',
    password: '$2b$10$L3BrkiGWeUJ2e1xZTpO5J.yOdoWDEbzPGWLd5vtgYJipnHaqRX8wu',
    username: 'reader1',
  },
];
