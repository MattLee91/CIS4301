import axios from 'axios';
import React from 'react';

const TupleCount = props =>{
    const [data, setData] = React.useState([]);
    React.useEffect(()=>{
       axios('http://localhost:5000/tuplecount')
       .then(response=>{
        if(response.status===200){
            setData(response.data.rows)
        }
       })
       .catch(err=>{

       })
    },[]);
    return (<div>
        TupleCount Component
        {
            //data.length>0 &&
            //data.map((item,index)=>
            //    <div key={index}>{item}</div>)
            console.log(data)
            }
    </div>)
}

export default TupleCount;