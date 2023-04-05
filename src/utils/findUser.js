

let findUser =(users , userID)=>{
    const userIndex = users.findIndex((user)=>{
      return ( user._id === userID )
    })
    if(userIndex===-1) return {}
    return users[userIndex];

}
export default findUser;