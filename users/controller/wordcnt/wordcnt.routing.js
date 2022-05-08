const { getOne, getAll } = require('./wordcnt.action');

module.exports = {
    '/': {
        // post: {
        //     action: create,
        //     level: 'public'
        // },
        get: {
            action: getAll,
            level: 'public'
        }
    },
    '/:id': {
        get: {
            action: getOne,
            level: 'public'
        }
    }
};
