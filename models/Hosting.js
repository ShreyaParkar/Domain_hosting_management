import mongoose from 'mongoose';

const HostingSchema = new mongoose.Schema({
    main_website_name: { type: String, required: true },
    provider_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Provider', required: true },
    expiry_date: { type: Date, required: true },
    comments: String,
    websites: [String]
});

export default mongoose.models.Hosting || mongoose.model('Hosting', HostingSchema);
