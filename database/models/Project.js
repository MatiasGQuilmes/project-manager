const mongoose = require('mongoose');


const projectSchem = new mongoose.Schema({

    name: {
        type: 'String',
        required: true,
        trim: true,
    },
    description: {
        type: 'String',
        required: true,
        trim: true,
        unique: true
    },
    dateExpire: {
        type: Date,
        default: Date.now()
    },
    client: {
        type: 'String',
        required: true,
        trim: true,
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'    
    },
    collaborators: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'    
        }
    ],
    tasks: [
        {
            type: mongoose.Schema.Types.ObjectId,
            tef: 'Task'
        }
    ]
}
, {
    timestamps: true,
});





module.exports = mongoose.model('Project', projectSchem)