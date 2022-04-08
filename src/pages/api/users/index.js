/* eslint-disable import/no-anonymous-default-export */
import User from '../../../model/User';
import { dbConnect, runMiddleware } from '../../../utils/index';
import Morgan from 'morgan';
import Cors from 'cors';

dbConnect();

export default async (req, res) => {
  const { method, body } = req;
  const morgan = Morgan('dev');
  // Initializing the cors middleware
  const cors = Cors({
    methods: ['GET', 'HEAD', 'POST'],
  });

  switch (method) {
    // method untuk mengambil semua data user
    case 'GET':
      try {
        const user = await User.find();
        await runMiddleware(req, res, cors, morgan);
        return res.status(200).json(user);
      } catch (error) {
        return res.status(400).json({ msg: error.message });
      }

    // method untuk menambah data user
    case 'POST':
      try {
        const newUser = new User(body);
        const saveUser = await newUser.save();
        await runMiddleware(req, res, cors, morgan);
        return res.status(200).json(saveUser);
      } catch (error) {
        return res.status(400).json({ msg: error.message });
      }

    default:
      return res.status(400).json({ msg: 'Method not allowed' });
  }
};
