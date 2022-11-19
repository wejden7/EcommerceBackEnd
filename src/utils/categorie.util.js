const { removeDuplicates, flatten } = require("./object.util");
const DeleteRepitition = async (array) => {
    //select all object sons repitetion
    newMap = removeDuplicates(array);
  
    let newResult = [];
    //si object have object in 2eme oredr
    for await (let item of newMap) {
      const { _id, label, icon, __v, ...other } = item;
      const itemObject = { _id, label, icon };
      Object.keys(other).length === 1
        ? newResult.push(await Object2emeOrder(array, itemObject))
        : newResult.push(item);
    }
  
    return newResult;
  };
  const Object2emeOrder = async (array, itemObject) => {
    let object = { ...itemObject };
    const newArray = await array.filter((item) => item._id === itemObject._id);
    const [key, souscategorieArray] = arrayOfObject2emeOrder(newArray);
    object[key] = await DeleteRepitition(souscategorieArray);
  
    return object;
  };
  
  const arrayOfObject2emeOrder = (array) => {
    let newArray = [];
    array.forEach((item) => {
      const { _id, label, icon, __v, ...other } = item;
      newArray.push(flatten(other, {}));
    });
  
    const { _id, label, icon, __v, ...other } = array[0];
    return [Object.keys(other)[0], newArray];
  };

module.exports = {DeleteRepitition  }