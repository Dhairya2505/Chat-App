import { useEffect, useMemo, useState } from "react";
import { io } from 'socket.io-client';

export default function Chat({name}){
    const [Id,setId] = useState(null);    
    const [message,setMessage] = useState('');

    const socket = useMemo(() => {
            return io("localhost:8001");
    },[]);

    useEffect(() => {
        
        socket.on("getId",({ id }) => {
            setId(id)
        });
        
        socket.emit("connected",{ name });

        socket.on("connected",({ name }) => {
            console.log(`${name} connected`);
        })

    },[]);
    
    return (
        <div className="h-full">
            <div className="flex text-3xl justify-center p-7 font-serif">
                {name}
            </div>

            <div className="p-10 h-3/4 bg-gray-200 m-4 rounded-xl">
                
            </div>

            <div className="flex items-center justify-center">
                <input type="text" className="outline-none border w-full p-2 h-12 rounded-lg my-2 ml-2 mr-1 border-gray-600" />
                <button className="bg-blue-400 h-12 w-20 rounded-md my-2 mr-2 ml-1" >Send</button>
            </div>
        </div>
    )
}