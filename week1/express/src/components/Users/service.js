function update() {
    return {
        message: 'User updated successful.',
    };
}

function find(userId) {
    return {
        message: `Found user with id ${userId}`,
    };
}

function destroy(userId) {
    return {
        message: `Deleted user with id ${userId}`,
    };
}

function create() {
    return {
        message: 'User created successful',
    };
}

module.exports = {
    create,
    find,
    destroy,
    update,
};
