import { Request, Response } from 'express';

export const getAllUsers = async (req: Request, res: Response) => {
	const { id } = req.query;
	if (id) {
		return res.json({ id, name: 'Gjoko Bozhinov', message: 'Not implemented! Just an example.' });
	}
	return res.json({ message: 'Get All Users Not implemented! Just an example.' });
};
