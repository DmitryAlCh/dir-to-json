const fs = require('fs');

readFolder = async (pathToRootFolder) => {
  return new Promise((resolve,reject) => {
    fs.readdir(pathToRootFolder, 'utf8', (err, dirtyFolderArray) => {
      if (err){
        reject(err);
      }
      resolve(dirtyFolderArray);
    });
  })
};

// This should be the right implementation of Folder checking.
checkIfFolder = (pathToFolder) => {
 return new Promise ((resolve, rej) => {
   fs.stat(pathToFolder, (err, stats) => {
     if (err){
       // console.log(err);
     } else {
       // console.log(stats);
       if (stats.isDirectory()){
          resolve (pathToFolder);
       }

     }
   })
 })

};
formPathToFolders = async (rootFolder, dirtyFolderArray) => {
  return new Promise ((resolve, reject)=>{
    let pathToFolderArray = dirtyFolderArray.map((folder)=>{
      return rootFolder+'/'+folder;
    })
    resolve(pathToFolderArray);
  });
}

removeAllNoneFolders = async (dirtyFolderArray) => {
  return new Promise((resolve,reject) => {
    cleanFolderArray = [];
    dirtyFolderArray.map((element)=>{
      let dot = element.indexOf('.')
      let ext = element.length -1 - dot;
      if ((dot>=1) && (ext<=3)) {
        console.log('Not a folder:', element);
      } else {
        cleanFolderArray.push(element);
      }
    });
    resolve(cleanFolderArray);
  })
}

readFile = async (pathToFile) => {
  return new Promise ((resolve, reject) => {
    fs.readFile(pathToFile, 'utf8',(err, data) => {
      if (err) {
        console.log(err);
      } else {
        // console.log(data);
        resolve(data)
      }
    })
  })
}

skipAllNoneTxt = (fileName) => {
  let ext = fileName.split('.');
  if ((Array.isArray(ext)) && (ext[ext.length-1])=='txt') {
    if (fileName.indexOf('_') == 0){
      // skip _Index.txt
      return true;
    }
    return false;
  } else {
    return true;
  }
}
formatMetaObj = (array) => {
  array = array.map((element) => {
    return element.split(': ')
  })
  let meta = {};
  array.forEach((element) => {
    let key = element[0]
    let value = element[1]
    meta[key] = value;
  })
  return meta;
}

sortArray = (unsortedArray) => {
  let sortedArray = unsortedArray.sort((a,b) => {
    let titleA = a.meta.title.toUpperCase();
    let titleB = b.meta.title.toUpperCase();
    if (titleA < titleB){
      return -1;
    } else if (titleA > titleB){
        return 1;
      }
      return 0;
  });
  return sortedArray;
}


module.exports = {
  readFolder,
  removeAllNoneFolders,
  formPathToFolders,
  readFile,
  skipAllNoneTxt,
  formatMetaObj,
  sortArray
}
