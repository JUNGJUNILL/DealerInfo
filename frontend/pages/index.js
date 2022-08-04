import React , {useState,useEffect,useCallback}from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Select ,Button,Modal} from 'antd';
const { Option } = Select;

import wrapper from '../store/configureStore';
import {localDataList}from '../API/localData'; 
import TestComp from '../components/TestComp';
import DealerInfoListComponent from '../components/DealerInfoListComponent'
import DealerDetailInfoComponent from '../components/DealerDetailInfoComponent'


import axios from 'axios';
import {useRouter} from 'next/router'; 
import Image from 'next/image'

import 
    {DEALERINFO_REQUEST,} 
from '../reducers/dealerInfoListReducer'; 

import {END} from 'redux-saga'; 


const DealerInfo = () =>{

  const dispatch              = useDispatch(); 
  const router = useRouter(); 
  const {dealerInfoList} = useSelector((state)=>state.dealerInfoListReducer); 
  const [init,setInit] = useState(true);

  useEffect(()=>{
    
    //구글 광고
    if(window) (window.adsbygoogle = window.adsbygoogle || []).push({});

  },[])

  useEffect(()=>{
    
      dispatch({
        type:DEALERINFO_REQUEST,
            data:{
            initValue : true,
            start:0,
            end:20
          },
      });
      
    
 
  },[])

/*
  useEffect(()=>{

    
    //뒤로가기 이벤트를 캐치합니다.
    window.onpopstate = function(event) {  
      setCnt(preve=>preve+1);
    };

  },[])

*/
  
const parentFunc = () =>{
 
  alert(`parent func =${init}`);
}



  //자식 컴포넌트의 변수를 부모 컴포넌트로 가져오는 예시
  //https://velog.io/@breeeeze/react-%EC%9E%90%EC%8B%9D%EC%97%90%EC%84%9C-%EB%B6%80%EB%AA%A8%EB%A1%9C-%EB%8D%B0%EC%9D%B4%ED%84%B0-%EC%A0%84%EB%8B%AC%ED%95%98%EA%B8%B0

    return (
        <div>
  
        <input type="text" value={init} />
        {router.query.modal==='true'
        ?<DealerDetailInfoComponent dealerInfoList={dealerInfoList} dealerCode={router.query.dealerCode} parentFunc={parentFunc} />
        :<DealerInfoListComponent />
       }
     
        </div>
    )

}


export default DealerInfo;