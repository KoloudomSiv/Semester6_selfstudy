import users from '../data/user.data.js';

const get = (userId)=> users.find((user)=>user.id === userId);


const getAll =()=>users;


const update = (userId, newDetails)=>{
    let existingUser = null;
    let userIndex;

    users.map((user, index) =>{
        if (user.id === userId){
            existingUser = user;
            userIndex = index;
        }
    });

    if (!existingUser){
        return null;
    }
    //
    const updatedUser = {
        ...existingUser,
        ...newDetails
    };
    users.splice(userIndex,1,updatedUser);
    return updatedUser;
}

const insert = (details)=>{
    const newUser = {id:users.length + 1,...details};
    users.push(newUser);
    return newUser;
}



const remove = (userId) => {
    const index = users.findIndex(user => user.id === userId);
    if (index !== -1) {
        users.splice(index, 1);
        return true; // Successfully removed
    }
    return false; // User not found
}


export default{
    get,
    getAll,
    update,
    remove,
    insert,
}