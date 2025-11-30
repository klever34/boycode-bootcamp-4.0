exports.generateId = (arr) => {
  return arr.length ? Math.max(...arr.map(item => item.id)) + 1 : 1;
};

exports.paginate = (items, limitQ, pageQ) => {
  const limit = Number(limitQ) || 10;
  const page = Number(pageQ) || 1;

  const start = (page - 1) * limit;
  const data = items.slice(start, start + limit);

  return { limit, page, data };
};
