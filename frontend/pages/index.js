import React , {useState,useEffect,useCallback}from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Select ,Button,Modal} from 'antd';
const { Option } = Select;

import wrapper from '../store/configureStore';
import {localDataList}from '../API/localData'; 
import TestComp from '../components/TestComp';
import DealerInfoListComponent from '../components/DealerInfoListComponent'

import axios from 'axios';
import {useRouter} from 'next/router'; 
import Image from 'next/image'

import 
    {DEALERINFO_REQUEST,} 
from '../reducers/dealerInfoListReducer'; 

import {END} from 'redux-saga'; 


const DealerInfo = ({clientRegion}) =>{

  const dispatch              = useDispatch(); 
  
  const {dealerInfoList, 
         btnLoading, 
         reginValue, 
         PerDataLength}      = useSelector((state)=>state.dealerInfoListReducer); 
  const [startValue,setStartValue] = useState(0); 
  const [endValue,  setEndValue] = useState(20);
  const router = useRouter(); 



  useEffect(()=>{
    //구글 광고
    if(window) (window.adsbygoogle = window.adsbygoogle || []).push({});
    dispatch({
      type:DEALERINFO_REQUEST,
          data:{
          initValue : true,
          start:0,
          end:endValue
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
  



  //자식 컴포넌트의 변수를 부모 컴포넌트로 가져오는 예시
  //https://velog.io/@breeeeze/react-%EC%9E%90%EC%8B%9D%EC%97%90%EC%84%9C-%EB%B6%80%EB%AA%A8%EB%A1%9C-%EB%8D%B0%EC%9D%B4%ED%84%B0-%EC%A0%84%EB%8B%AC%ED%95%98%EA%B8%B0

    return (
        <div>
      {/* 
        {router.query.modal==='true' 
            ?
               <Modal title="Basic Modal" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel} >
               <p>Some contents...</p>
               <p>Some contents...</p>
               <p>Some contents...</p>
             </Modal>
            :
            ""
        }
     */}
       

        {router.query.modal==='true'
        ?<p>안녕하세요!</p>
        :<DealerInfoListComponent region={clientRegion}/>
       }
 

          <div className='divTableAds' >
            <div className='divTableAdsRow' >
              <div className='divTableAdsCell'>
                  <ins className="adsbygoogle"
                  style={{display:'block', textAlign:'center'}}
                  data-ad-layout={"in-article"}
                  data-ad-format={"fluid"}
                  data-ad-client={"ca-pub-9160341796142118"}
                  data-ad-slot={"5405263289"}></ins>
              </div>
            </div>
          </div>

  

              
          
      
        </div>
    )

}


export default DealerInfo;