import mongoose from 'mongoose';

const ProviderSchema = new mongoose.Schema({
    name: { type: String, required: true }
});

export default mongoose.models.Provider || mongoose.model('Provider', ProviderSchema);
