import actionCreator from './actionCreator';

function getItems(DB, TableName) {
    var itemsArray = [];
    let myPromise = new Promise(function(myResolve, myReject) {
        DB.transaction(function (tx) {
       tx.executeSql(`SELECT * FROM ${TableName}`, [], function (tx, results) {
          var len = results.rows.length, i;
          for (i = 0; i < len; i++){
           itemsArray.push(results.rows.item(i));
           myResolve(itemsArray);
          }
       }, null);
    })});
    return myPromise.then(() => {
        return itemsArray;
   });
}


export {
    actionCreator,
    getItems,
};