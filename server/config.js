module.exports ={
  database: process.env.MONGO_URI || 'mongodb://localhost:27017/work-board',
  secret: 'work-board-secret'
};
