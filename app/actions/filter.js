export function setFilter(status, isCharge, filter){
  switch (status) {
    case 0:
      return doingFilter(isCharge, filter);
    case 1:
      return delayFilter(isCharge, filter);
    case 2:
      return doneFilter(isCharge, filter);
    case 3:
      return discardFilter(isCharge, filter);
  }
}

export function resetFilter(){
  return {
    type: 'ALL_FILTER'
  };
}

function doingFilter(isCharge, filter){
  return {
    type: 'DOING_FILTER',
    isCharge,
    filter
  };
}
function delayFilter(isCharge, filter){
  return {
    type: 'DELAY_FILTER',
    isCharge,
    filter
  };
}
function doneFilter(isCharge, filter){
  return {
    type: 'DONE_FILTER',
    isCharge,
    filter
  };
}
function discardFilter(isCharge, filter){
  return {
    type: 'DISCARD_FILTER',
    isCharge,
    filter
  };
}
