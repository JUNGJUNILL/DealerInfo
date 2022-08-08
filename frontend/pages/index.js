import React , {useEffect}from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Select} from 'antd';
import {useRouter} from 'next/router'; 

import DealerInfoListComponent from '../components/DealerInfoListComponent'
import DealerDetailInfoComponent from '../components/DealerDetailInfoComponent'

import 
    {DEALERINFO_REQUEST,} 
from '../reducers/dealerInfoListReducer'; 



const DealerInfo = () =>{

  const dispatch              = useDispatch(); 
  const router = useRouter(); 
  const {dealerInfoList,materialInfoClick} = useSelector((state)=>state.dealerInfoListReducer); 

  useEffect(()=>{
    
    if(!materialInfoClick){
      dispatch({
        type:DEALERINFO_REQUEST,
            data:{
            initValue : true,
            start:0,
            end:20
          },
      });
    }
 

  },[materialInfoClick])

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
  
          {router.query.page==='true'
          ?<DealerDetailInfoComponent dealerInfoList={dealerInfoList} dealerCode={router.query.code} info={router.query.info} />
          :<DealerInfoListComponent />}
     
        </div>
    )

}


export default DealerInfo;