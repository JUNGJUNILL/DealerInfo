import React , {useState,useEffect,useCallback}from 'react'

const TestComp = () =>{

    useEffect(()=>{
        alert('hello');
    },[])
    

    return (
        <div>
            <p>안녕하세요 반갑습니다.</p>
        </div>
    )


}

export default TestComp;