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
  const [clickCount , setClickCount] =useState(1); 
  const router = useRouter(); 
  const [cnt , setCnt] =useState(1); 
  const [init,setInit] = useState(false);


  useEffect(()=>{
    //구글 광고
    if(window) (window.adsbygoogle = window.adsbygoogle || []).push({});
    /*
    dispatch({
      type:DEALERINFO_REQUEST,
          data:{
          initlocal : 'Seoul',
          start:0,
          end:endValue
        },
    });
    */
  },[])

/*
  useEffect(()=>{

    
    //뒤로가기 이벤트를 캐치합니다.
    window.onpopstate = function(event) {  
      setCnt(preve=>preve+1);
    };

  },[])

*/
  




  //광역시, 도 list
  const mainLocal = localDataList.filter((v,i,array)=>{

      if(v.city===v.cityCode){
          return array;
      }

  }); 
  const [subLocalValue,setSubLocalValue] = useState(mainLocal[0].cityCode); 

  //광역시, 도 별 하위 지역 list
  const array = localDataList.filter((v,i,array)=>{
        if(v.regionName===clientRegion){
            return array;
        }
    }); 
  const [subLocal,setSubLocal] = useState(array); 

  //지역 분류 select 변경 시 action
  const onChangeMainLocal = (value) =>{

      try{
      setClickCount(1); 
      let changeSubLocalList = localDataList.filter((v,i,array)=>{
          if(v.regionName === value){
              return array;
          }
      }); 

      setSubLocalValue(changeSubLocalList[0].cityCode); 
      setSubLocal([...changeSubLocalList]); 
      
      dispatch({
        type:DEALERINFO_REQUEST, 
        data:{
              initlocal:value,
              start:startValue,
              end:endValue,
              changeLocalValue:true,
        },
    });

    }catch(e){
      alert(e); 
    }
  }

  //하위 지역 select 변경 시 action 


  const [boleanValue ,setBooleanValue]= useState(false); 

   const onClickDetailInfo =(i)=>() =>{
    
    //원단위 콤마 정규표현식
    const pattern = /\d{1,3}(?=(\d{3})+(?!\d))/g; 

    //빈칸제거 정규표현식 
    const ceoNameEdit = dealerInfoList[i].ceoName.replace(/ /g,"").split(''); 
          ceoNameEdit.splice(1,1,'*')

    //setDealerInfo({...dealerInfoList[i]});
    let queryString = "?dealerCode="+dealerInfoList[i].dealerCode
                    +"&infocode="+dealerInfoList[i].infocode
                    +"&infoName="+dealerInfoList[i].infoName
                    +"&address="+dealerInfoList[i].address
                    +"&item="+dealerInfoList[i].item
                    +"&status="+dealerInfoList[i].status
                    +"&infoPhone="+dealerInfoList[i].infoPhone
                    +"&handphone="+dealerInfoList[i].handphone
                    +"&storeCount="+dealerInfoList[i].storeCount
                    +"&orderCount="+dealerInfoList[i].orderCount.replace(pattern,'$&,')
                    +"&materialQtyCount="+dealerInfoList[i].materialQtyCount.replace(pattern,'$&,')
                    +"&moneyTohangul="+dealerInfoList[i].moneyTohangul
                    +"&money="+dealerInfoList[i].money
                    +"&region="+dealerInfoList[i].region
                    +"&stockinday="+dealerInfoList[i].stockinday
                    +"&ceoName="+ceoNameEdit.join('')


    router.push('/DealerDetailInfo'+queryString ,'/DealerDetailInfo');
    setBooleanValue((value)=>!value);; 

  }

  //자식 컴포넌트의 변수를 부모 컴포넌트로 가져오는 예시
  //https://velog.io/@breeeeze/react-%EC%9E%90%EC%8B%9D%EC%97%90%EC%84%9C-%EB%B6%80%EB%AA%A8%EB%A1%9C-%EB%8D%B0%EC%9D%B4%ED%84%B0-%EC%A0%84%EB%8B%AC%ED%95%98%EA%B8%B0


  //더 보기 버튼 클릭 
  const onClickMore = useCallback(()=>{

    setClickCount(prev=>prev+1);
 
    /*
        50~100        처음 더보기          50 ~ 50
      
        100~150       두 번째 더보기       100 ~ 50      
        
        150~200       세 번째 더보기       150 ~ 50
    */
    dispatch({
      type:DEALERINFO_REQUEST, 
      data:{clientIp:reginValue,
            init:'',
            start:endValue*clickCount,
            end:endValue
      },
  });
 
  },[clickCount,endValue,reginValue]); 

  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = () => {
    router.push('/?modal=true');
    setIsModalVisible(true);
  };

  const handleOk = () => {
    router.back();
  };

  const handleCancel = () => {
    router.back();
    setIsModalVisible(false);
  };


  const test=()=>{
    
    setCnt(prev=>prev+1);
  }


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
       
        <input type='button' value="버튼" onClick={test}/>

        {router.query.modal==='true'
        ?<p>안녕하세요!</p>
        :<DealerInfoListComponent count={cnt}/>
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