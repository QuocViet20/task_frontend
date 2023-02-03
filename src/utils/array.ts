export const createArrayFromLength = (length: number, fromOne = false) => {
  const arr = Array.from({ length },(v,i)=>i)
  if(!fromOne){
    return arr
  }
  arr.shift();
  arr.push(length);
  return arr;
}