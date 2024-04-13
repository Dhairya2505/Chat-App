import { useState } from "react"
import Chat from "./Chat.jsx";

export default function Name(){
    const [name,setName] = useState('');
    const [Form,setForm] = useState(false);
    

    const submitHandler = (e) => {
        e.preventDefault();
        setForm(true);
    }

    return (
        <div className="h-svh">
            {
                !Form &&
                <form className="h-svh w-screen flex flex-col justify-center items-center" onSubmit={submitHandler}>
                    <label htmlFor="Name" className="p-2 text-3xl font-bold font-serif">Name</label>
                    <input type="text" id="Name" value={name} onChange={ e => setName(e.target.value) } className="outline-none border border-gray-400 rounded-md p-2 w-80 "/>
                    <button type="submit" className="bg-blue-400 p-2 border border-blue-900 rounded-lg m-5 w-24 active:bg-blue-500">Enter</button>
                </form>
            }
            {
                Form &&
                <Chat name={name}/>                
            }
            
        </div>
    )
}