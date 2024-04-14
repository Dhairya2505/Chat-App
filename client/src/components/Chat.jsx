import { useEffect, useMemo, useState } from "react";
import { io } from 'socket.io-client';

export default function Chat({name}){
    const [Id,setId] = useState(null);    
    const [message,setMessage] = useState('');
    const [messages,setMessages] = useState([]);
    const [joinedName,setJoinedName] = useState('');

    const socket = useMemo(() => {
            return io("localhost:8001");
    },[]);

    useEffect(() => {
        
        socket.on("getId",({ id }) => {
            setId(id)
        });
        
        socket.emit("connected",{ name });

        socket.on("connecting",({ name }) => {
            setJoinedName(name);
        })

        socket.on("receive-message",(data) => {
            setMessages(prevMessages => [...prevMessages, data]);
        })
        
        return () => {
            socket.disconnect();
        };

    },[]);

    const sendChat = (e) => {
        e.preventDefault();
        socket.emit("message",{ name, message, Id });
        setMessage('');
    }

    useEffect(() => {

        const intervalId = setInterval(() => {
            setJoinedName('');
        }, 1300);

        return () => clearInterval(intervalId); 
    },[joinedName])
    
    return (
        <div className="h-svh">
            <div className={`fixed ${joinedName != '' ? `right-10 top-10 bg-blue-500 p-2 rounded-xl border border-black transition-all duration-200` : `-right-28 top-10 bg-blue-500 p-2 rounded-xl border border-black transition-all duration-200`}`}>
                {joinedName} Connected
            </div>
            <div className="flex text-3xl h-12 justify-center p-3 font-serif">
                Group Chat  
            </div>

            <div className="flex flex-col p-5 min-h-96 bg-gray-200 m-4 rounded-xl">
                {
                    messages.map((e,i) => {
                        if(e.Id === Id){
                            return <div className="m-1 self-end bg-gray-400 p-2 rounded-md max-w-sm md:max-w-md lg:max-w-lg" key={i}>
                                {`${e.message}`}
                            </div>
                        }
                        else{
                            return <div className="m-1 self-start bg-gray-300 p-2 rounded-md max-w-sm md:max-w-md lg:max-w-lg" key={i}>
                                <div className="text- font-bold font-serif">
                                    {e.name}
                                </div>
                                <div className="font-serif pl-1">
                                    {e.message}
                                </div>
                            </div>
                        }
                    })
                }
            </div>
            <form onSubmit={sendChat} className="flex h-16 items-center justify-center">
                <input type="text" value={message} onChange={ e => setMessage(e.target.value) } className="outline-none border w-full p-2 h-12 rounded-lg my-2 ml-2 mr-1 border-gray-600" />
                <button type="submit" className="bg-blue-400 h-12 w-20 rounded-md my-2 mr-2 ml-1" >Send</button>
            </form>
        </div>
    )
}