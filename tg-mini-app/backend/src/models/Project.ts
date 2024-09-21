import mongoose, { Schema, Document } from 'mongoose';

export interface IProject extends Document {
    eth_id: string;
    name: string;
    description: string;
    link: string;
    finalist: boolean;
    winner: boolean;
    image: string;
    end_time: number;
}

const ProjectSchema: Schema = new Schema({
    eth_id: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    description: { type: String, required: true },
    link: { type: String, required: true },
    image: { type: String, required: true },
    finalist: { type: Boolean, required: true },
    winner: { type: Boolean, required: true },
    end_time: { type: Number, required: true }
});

export const Project = mongoose.model<IProject>('Project', ProjectSchema);