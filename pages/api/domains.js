import dbConnect from '../../lib/mongodb';
import Domain from '../../models/Domain';

export default async function handler(req, res) {
    const { method } = req;
    await dbConnect();

    switch (method) {
        case 'GET':
            try {
                const domains = await Domain.find({}).populate('provider_id');
                res.status(200).json({ success: true, data: domains });
            } catch (error) {
                res.status(400).json({ success: false });
            }
            break;

        case 'POST':
            try {
                const domain = await Domain.create(req.body);
                res.status(201).json({ success: true, data: domain });
            } catch (error) {
                res.status(400).json({ success: false });
            }
            break;

        default:
            res.status(400).json({ success: false });
            break;
    }
}
