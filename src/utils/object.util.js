const removeDuplicates = (array) => {
    let newMap = new Map();
    array.forEach((item) => newMap.set(item._id, item));
    return [...newMap.values()];
  };
  
  const flatten = (obj, out) => {
    Object.keys(obj).forEach((key) => {
      if (typeof obj[key] == "object") {
        out = obj[key]; 
      } else {
        out[key] = obj[key]; 
      }
    });
    return out;
  };

module.exports ={removeDuplicates,flatten}