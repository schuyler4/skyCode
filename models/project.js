const projectSchema = new mongoose.Schema({
  name: String,
  files: [String]
  directorys: [String]
});

const directoryScheam = new mongoose.Schema({
  name: String,
  files: [String]
  project: String,
});

const file = new mongoose.Schema({
  name: String,
  langage: String,
  code: String
});
  
