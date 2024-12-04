import mongoose from 'mongoose';

const DomainSchema = new mongoose.Schema({
    domain_name: { type: String, required: true },
    provider_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Provider', required: true },
    expiry_date: { type: Date, required: true },
    comments: String
});

export default mongoose.models.Domain || mongoose.model('Domain', DomainSchema);
