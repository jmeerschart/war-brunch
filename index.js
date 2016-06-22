"use strict";

var Archiver = require('archiver');
var fs = require("fs");


function WarBrunchPlugin(config){
    var self=this;
    self.config = config;
    self.fileName =  (config.plugins.war || {}).outputFile || "ROOT.WAR";

}

WarBrunchPlugin.prototype.brunchPlugin = true;



WarBrunchPlugin.prototype.onCompile = function processZip() {

  var self = this;
  var outputFile = './'+self.config.paths.public+'/' + self.fileName;

  var output = fs.createWriteStream(outputFile);

  ///define folder to zip
    var pathToZip = './'+self.config.paths.public+'/';

    if (!self.config.optimize){
      return;
    }

    var archive = Archiver.create('zip', {});

    //add event on error
    archive.on('error', function(err) {
      console.log("ERROR archive", err);
    });
    //add event on close stream
    output.on('close', function() {
      cleanup(pathToZip,self.fileName);
    });
    //bind outputstream
    archive.pipe(output);

    archive.bulk([
      { expand: true, cwd: pathToZip, src: ['*'] }
    ]);


    archive.finalize();

};

//delete generated files
function cleanup(pathToZip,fileName){
    var files = fs.readdirSync(pathToZip);
    for (var i in files){

        var name = pathToZip + '/' + files[i];
        //dont delete archive
        if (name.indexOf(fileName) == -1){
          if (fs.lstatSync(name).isDirectory()){
            deleteFolderRecursive(name);
          }else{
            fs.unlinkSync(name);
          }
        }
    }
}

function deleteFolderRecursive (path) {
  if( fs.existsSync(path) ) {
    fs.readdirSync(path).forEach(function(file,index){
      var curPath = path + "/" + file;
      if(fs.lstatSync(curPath).isDirectory()) { // recurse
        deleteFolderRecursive(curPath);
      } else { // delete file
        fs.unlinkSync(curPath);
      }
    });
    fs.rmdirSync(path);
  }
}

module.exports = WarBrunchPlugin;
