/* eslint-disable import/no-anonymous-default-export */
import User from '../../../model/User';
import { dbConnect, runMiddleware } from '../../../utils/index';
import Morgan from 'morgan';

dbConnect();

export default async (req, res) => {
  const {
    method,
    body,
    query: { id },
  } = req;
  const morgan = Morgan('dev');

  switch (method) {
    // method untuk mengambil single data user
    case 'GET':
      try {
        const user = await User.findById(id);
        if (!user) return res.status(404).json({ msg: 'User not found' });
        await runMiddleware(req, res, morgan);
        return res.status(200).json(user);
      } catch (error) {
        return res.status(400).json({ msg: error.message });
      }

    // method untuk menghapus data user
    case 'DELETE':
      try {
        const deleteUser = await User.findByIdAndDelete(id);
        if (!deleteUser) return res.status(404).json({ msg: 'User not found' });
        await runMiddleware(req, res, morgan);
        return res.status(204).json();
      } catch (error) {
        return res.status(400).json({ msg: error.message });
      }

    // method untuk update data user
    case 'PUT':
      try {
        const updateUser = await User.findByIdAndUpdate(id, body, {
          new: true,
          runValidators: true,
        });
        if (!updateUser) return res.status(404).json({ msg: 'User not found' });
        return res.status(200).json(updateUser);
      } catch (error) {
        return res.status(400).json({ msg: error.message });
      }

    default:
      return res.status(400).json({ msg: 'Method not allowed' });
  }
};
