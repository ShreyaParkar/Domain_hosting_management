import dbConnect from '../../lib/mongodb';
import Hosting from '../../models/Hosting';

export default async function handler(req, res) {
    const { method } = req;
    await dbConnect();

    switch (method) {
        case 'GET':
            try {
                const hostings = await Hosting.find({}).populate('provider_id');
                res.status(200).json({ success: true, data: hostings });
            } catch (error) {
                res.status(400).json({ success: false });
            }
            break;

        case 'POST':
            try {
                const hosting = await Hosting.create(req.body);
                res.status(201).json({ success: true, data: hosting });
            } catch (error) {
                res.status(400).json({ success: false });
            }
            break;

        default:
            res.status(400).json({ success: false });
            break;
    }
}
