import * as mongoose from 'mongoose';

const schoolSchema = new mongoose.Schema({
  name: String,
  address: String,
  numberOfStudents: Number
});

const School = mongoose.model('School', schoolSchema);

export default School;
