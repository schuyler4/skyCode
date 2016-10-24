const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const projectSchema = new mongoose.Schema({
  email: String,
  name: String,
  files: [{type: Schema.Types.ObjectId, ref: 'File'}],
  directorys: [{type: Schema.Types.ObjectId, ref: 'Directory'}]
});

const directoryScheam = new mongoose.Schema({
  name: String,
  files: [{type: Schema.Types.ObjectId, ref: 'File'}],
  project: String
});

const fileSchema = new mongoose.Schema({
  name: String,
  langage: String,
  code: String,
  directory: String,
  project: String
});

const Project = mongoose.model('Project', projectSchema);
const File = mongoose.model('File', fileSchema);
const Directory = mongoose.model('Directory', directoryScheam);

exports.createProject = function(email, name) {
  const newProject = new Project({
    email: email,
    name: name,
    files: [],
    directorys: []
  });
  const promise = newProject.save()
  return promise;
}

exports.findProject = function(name) {
  const promise = Project.findOne({name: name});
  return promise;
}

exports.getProjectNameFromId = function(ids) {
  const promise = Project.findById(id);
  return promise;
}

exports.deleteAll = function() {
  Project.remove({}, function(err, remove) {
    if(err)
      console.error(error);
    console.log("deleted everyting");
  })
}
