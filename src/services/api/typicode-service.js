import axios from "axios";

export async function fetchAllTodoItems(){
   let response = await axios.get("https://jsonplaceholder.typicode.com/todos")
   
   if(response.status === 200){

    return response.data
   }
}

export async function fetchTodoItem(id){
    let response = await axios.get(`https://jsonplaceholder.typicode.com/todos/${id}`)
    
    if(response.status === 200){

        return response.data
    }
}