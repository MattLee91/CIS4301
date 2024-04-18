import axios from 'axios';
import React from 'react';

const TupleCount = props =>{
    const [data, setData] = React.useState([]);
    React.useEffect(()=>{
       axios.get('http://localhost:5000/tuplecount')
       .then(response=>{
        if(response.status===200){
            setData(response.data[0][0]);
        }
       })
       .catch(err=>{
            console.error('Error fetching data:', err);
       })
    },[]);

    return (
        <div>
            {data !== null && (
                <p>Total count of crashes: {data}</p>
            )}
        </div>
    );
};

export default TupleCount;
