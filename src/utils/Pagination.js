import _ from "lodash"

const pagination = (users,pageNumber,pageSize)=>{
      console.log(pageNumber);
      console.log(pageSize);
     let startIndex =pageNumber * pageSize;
     console.log(startIndex);
    console.log( _(users).slice(startIndex).take(pageSize).value())
    return _(users).slice(startIndex).take(pageSize).value();

}
 export default pagination;