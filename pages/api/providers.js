import dbConnect from '../../lib/mongodb';
import Provider from '../../models/Provider';

export default async function handler(req, res) {
    const { method } = req;
    await dbConnect();

    switch (method) {
        case 'GET':
            try {
                const providers = await Provider.find({});
                res.status(200).json({ success: true, data: providers });
            } catch (error) {
                res.status(400).json({ success: false });
            }
            break;

        case 'POST':
            try {
                const provider = await Provider.create(req.body);
                res.status(201).json({ success: true, data: provider });
            } catch (error) {
                res.status(400).json({ success: false });
            }
            break;

        default:
            res.status(400).json({ success: false });
            break;
    }
}
