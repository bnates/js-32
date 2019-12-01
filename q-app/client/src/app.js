import React, {useState, useEffect} from 'react';

import useForm from './hooks/form.js';
import useQ from './hooks/q.js';
import useSocket from './hooks/socket.js';

const App = (props) => {

  const doTheThing = (vals) => {
    publish('deeds', 'work', vals);
    socketPublish('words', vals);
  };

  const [message, setMessage] = useState({});
  const [socketMessage, setSocketMessage] = useState({});
  const {handleChange, handleSubmit, values} = useForm(doTheThing);
  const [publish, subscribe] = useQ('deeds');
  const [socketPublish, socketSubscribe] = useSocket();

  useEffect( () => {
    subscribe('work', message => {
      setMessage(message);
    });

    socketSubscribe('incoming', message => {
      setSocketMessage(message);
    });

  }, [socketSubscribe, subscribe]);


  return (
    <>
      <pre>Form Values: {JSON.stringify(values)}</pre>
      <pre>Q Message: {JSON.stringify(message)}</pre>
      <pre>Socket Message: {JSON.stringify(socketMessage)}</pre>
      <form onSubmit={handleSubmit}>
        <input name='firstName' placeholder="First Name" onChange={handleChange} />
        <input name='lastName' placeholder="Last Name" onChange={handleChange} />
        <button>Save</button>
      </form>
    </>
  );
};

export default App;

