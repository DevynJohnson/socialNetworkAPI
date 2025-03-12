import { Schema, model, type Document } from 'mongoose';
import Email from 'mongoose-type-email';

interface IUser extends Document {
    username: string;
    email: string;
    thoughts: string[];
    friends: string[];
}

const UserSchema = new Schema<IUser>({
    username: {
        type: String,
        unique: true,
        required: true,
        trim: true
    },
    email: {
        type: Email,
        required: true,
        unique: true,
    },
    thoughts: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Thought'
        }
    ],
    friends: [
        {
            type: Schema.Types.ObjectId,
            ref: 'User'
        }
    ]
});

UserSchema.set('toJSON', {
    virtuals: true,
});

UserSchema.virtual('friendCount').get(function() {
    return this.friends.length;
});

const User = model<IUser>('User', UserSchema);
        