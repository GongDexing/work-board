/*jshint esversion:6*/
export function alertInfo(msg, isSuccess){
  return {
    type: 'CURRENT_ALERT',
    msg,
    isSuccess
  };
}
