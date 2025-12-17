const generateId = () => {
    return Date.now().toString() + Math.floor(Math.random() * 1000);
};

module.exports = generateId;
