const app = require('./app');

const PORT = process.env.PORT || 9000;
app.listen(PORT, () => {
  console.log(`Movie & Review API listening on http://localhost:${PORT}`);
});
