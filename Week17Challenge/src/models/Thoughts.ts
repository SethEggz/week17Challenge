
import { Schema, model, type Document } from 'mongoose';

interface IThought extends Document {
    thoughtText: string;
    createdAt: Date;
    username: string
    reactions: Schema.Types.ObjectId[];
}

const thoughtSchema = new Schema<IThought>({
    thoughtText: {
        type: String,
        required: true,
        minlength: 1,
        maxlength: 280,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    username: {
        type: String,
        required: true,
    },
    reactions: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Reaction',
        },
    ],
});

thoughtSchema.virtual('reactionCount').get(function () {
    return this.reactions?.length;
  });
  

const reactionSchema = new Schema({
    reactionId: {
        type: Schema.Types.ObjectId,
    },
    
    reactionBody: {
        type: String,
        required: true,
        maxlength: 280,
    },
    username: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

const Thought = model<IThought>('Thought', thoughtSchema);
const Reaction = model('Reaction', reactionSchema);
export { Thought, Reaction };
export default Thought;