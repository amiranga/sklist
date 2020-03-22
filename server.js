var express = require("express");
var bodyParser = require("body-parser");
var dotenv = require('dotenv');
var mongoose = require('mongoose');

var app = express();
const router = express.Router();
dotenv.config();

async function main() {
  try {
    let mongodbURI = process.env.MONGODB_URI || "mongodb://localhost:27017/sklist";
    mongoose.Promise = global.Promise;
    mongoose.set('useCreateIndex', true);
    mongoose.set('useNewUrlParser', true);
    mongoose.set('useFindAndModify', false);
    mongoose.set('useUnifiedTopology', true);
    // Connect to MongoDB using Mongoose
    await mongoose.connect(mongodbURI);
    console.log('Connected to MongoDB');

    const port = process.env.PORT || 3000;
    app.listen(port, () => console.log(`Angular Full Stack listening on port ${port}`));

  } catch (err) {
    console.error(err);
  }
}

app.use(bodyParser.json());

const schoolSchema = new mongoose.Schema({
  name: String,
  address: {
    street: String,
    suburb: String,
    postcode: String,
    state: String
  },
  numberOfStudents: Number
});

const School = mongoose.model('School', schoolSchema);


main();

router.route('/schools').get(async (req, res) => {
  try {
    const docs = await School.find({});
    res.status(200).json(docs);
  } catch (err) {
    return res.status(400).json({ error: err.message });
  }
});

router.route('/schools/count').get(async (req, res) => {
  try {
    const count = await School.count();
    res.status(200).json(count);
  } catch (err) {
    return res.status(400).json({ error: err.message });
  }
});

router.route('/school').post(async (req, res) => {
  try {
    const obj = await new School(req.body).save();
    res.status(201).json(obj);
  } catch (err) {
    return res.status(400).json({ error: err.message });
  }
});

router.route('/school/:id').get(async (req, res) => {
  try {
    const obj = await School.findOne({ _id: req.params.id });
    res.status(200).json(obj);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
});

router.route('/school/:id').put(async (req, res) => {
  try {
    await School.findOneAndUpdate({ _id: req.params.id }, req.body);
    res.sendStatus(200);
  } catch (err) {
    return res.status(400).json({ error: err.message });
  }
});

router.route('/school/:id').delete(async (req, res) => {
  try {
    await School.findOneAndRemove({ _id: req.params.id });
    res.sendStatus(200);
  } catch (err) {
    return res.status(400).json({ error: err.message });
  }
});

app.use('/api', router);