const {readFolder, removeAllNoneFolders, formPathToFolders} = require('./functions');
const {readFile, skipAllNoneTxt, formatMetaObj, sortArray} = require('./functions');

let rootFolder = './meta';

logContent = async (folderPath) => {
  let array = [];
  for (const path of folderPath){
    let dir ={};
    const content = await readFolder(path)
    // console.log(content)
    for (const file of content){
      if (skipAllNoneTxt(file)) {
        // console.log('Skipping file: ', file);
      } else {
        const info = await readFile(path+'/'+file);
        dir.dir = path;
        if (file != 'meta.txt'){
          dir[file] = info;
        } else {
          metaArray = info.split('\n');
          let meta = formatMetaObj(metaArray)
          dir.meta = meta;
        }
      }
    }
  array.push(dir);
  }
  return array;
}

getFolders = async () => {
    let dirtyFolderArray = await readFolder(rootFolder);
    // console.log(dirtyFolderArray);
    let cleanFolderPaths = await removeAllNoneFolders(dirtyFolderArray);
    // console.log(cleanFolderArray);
    let pathToFolders = await formPathToFolders(rootFolder, cleanFolderArray);
    // return pathToFolders
    let unsortedArray = await logContent(pathToFolders);
    // console.log(unsortedArray);
    let sortetByMetaArray = await sortArray(unsortedArray);
    console.log(sortetByMetaArray);
}

// console.log('App is running');

getFolders();
