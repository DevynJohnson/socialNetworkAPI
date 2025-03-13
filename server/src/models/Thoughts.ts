import { Schema, model, type Document } from 'mongoose';

interface IThought extends Document {
    thoughtText: string;
    createdAt: Date;
    username: string;
    reactions: string[];
}

const ThoughtSchema = new Schema<IThought>(
    {
        thoughtText: {
            type: String,
            required: true,
            minlength: 1,
            maxlength: 280
        },
        createdAt: {
            type: Date,
            default: Date.now,
            get: (timestamp: Date | null | undefined): string => 
                timestamp ? new Date(timestamp).toLocaleString('en-US', { timeZone: 'UTC' }) : ''
        } as any,
        username: {
            type: String,
            required: true
        },
        reactions: [
            {
                type: Schema.Types.ObjectId,
                ref: 'Reaction'
            }
        ]
    },
    { 
        timestamps: true, 
        toJSON: { getters: true, virtuals: true }, 
        toObject: { getters: true, virtuals: true } 
    }
);

// Virtual property to get the count of reactions
ThoughtSchema.virtual('reactionCount').get(function (this: IThought) {
    return this.reactions.length;
});

const Thought = model<IThought>('Thought', ThoughtSchema);

export default Thought;
