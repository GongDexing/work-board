/*jshint esversion:6*/
export function putLocal(key, json){
  localStorage.setItem(key, JSON.stringify(json));
}
export function getLocal(key){
  return JSON.parse(localStorage.getItem(key));
}

export function clearLocal(){
  localStorage.clear();
}
