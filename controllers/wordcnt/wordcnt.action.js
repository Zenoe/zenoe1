module.exports.getOne = (req, res) => {
    res.status(200).json({
        name: 'Alex', age: '24'
    });
};

module.exports.getAll = (req, res) => {
    res.status(200).json([
        { name: 'Alex', age: '24' },
        { name: 'Flow', age: '24' },
        { name: 'Auré', age: '25' }
    ]);
};
