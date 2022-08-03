import React , {useState,useEffect,useCallback}from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Select ,Button,Modal} from 'antd';
const { Option } = Select;

import {localDataList}from '../API/localData'; 

import axios from 'axios';
import {useRouter} from 'next/router'; 
import Image from 'next/image'

import 
    {DEALERINFO_REQUEST,} 
from '../reducers/dealerInfoListReducer'; 

import {END} from 'redux-saga'; 




const DealerInfoListComponent = ({clickCheck})=>{

    const dispatch              = useDispatch(); 
    const {dealerInfoList, 
        btnLoading, 
        reginValue, 
        PerDataLength}      = useSelector((state)=>state.dealerInfoListReducer); 
    const [startValue,setStartValue] = useState(0); 
    const [endValue,  setEndValue] = useState(20);
    const [clickCount , setClickCount] =useState(1); 
    const router = useRouter(); 
    const [check , setCheck] = useState(clickCheck); 

      /*
    useEffect(()=>{

      alert(check);
 
      if(check){
        dispatch({
            type:DEALERINFO_REQUEST,
                data:{
                initlocal : 'Seoul',
                start:0,
                end:endValue
              },
          });

    }


    },[check]);
    */

  //광역시, 도 list
  const mainLocal = localDataList.filter((v,i,array)=>{

        if(v.city===v.cityCode){
            return array;
        }

    }); 


  //지역 분류 select 변경 시 action
  const onChangeMainLocal = (value) =>{

    try{
    setClickCount(1); 
    
    dispatch({
      type:DEALERINFO_REQUEST, 
      data:{
            initlocal:value,
            start:0,
            end:endValue,
            changeLocalValue:true,
      },
  });

  }catch(e){
    alert(e); 
  }
}

//유통사 상세정보
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
    //setBooleanValue((value)=>!value);; 

  }




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
          data:{
                initlocal:reginValue,
                start:endValue*clickCount,
                end:endValue
          },
      });
     
      },[clickCount,endValue,reginValue]); 

  const [isModalVisible, setIsModalVisible] = useState(false);
  const showModal = () => {
    router.push('/?modal=true');
    setCheck(false);
    setIsModalVisible(true);
  };

  const handleOk = () => {
    router.back();
  };

  const handleCancel = () => {
    router.back();
    setIsModalVisible(false);
  };





    return (



        <div>
 
          <input type="text" value={check} />

            <div style={{width:'100%',textAlign:"center"}}>
                        <font style={{fontFamily:'Hanna',fontSize:'5vh'}}>우리동네 식자재 유통사사</font> <br/>
                        <font style={{fontFamily:'jua',fontSize:'2vh',opacity:'0.6'}}>(매출액이 높은 순으로 정렬)</font>
            </div>

            <div style={{display:"flex",justifyContent:"center",alignItems:"center"}}>
                <font style={{fontFamily:'jua',fontSize:'2.2vh'}}>지역선택 :</font> &nbsp; 
                {/*광역 시 도 */}
                {reginValue &&
                <Select defaultValue={reginValue} onChange={onChangeMainLocal} style={{width:'40%'}}>
                {mainLocal.map((v)=>(              
                    <Option value={v.regionName} >{v.regionNameHangul}</Option>
                ))}
                </Select>} 
            </div>
            
            {/*구글 광고*/}
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

         {/*데이터 리스트*/}
         <div className='divTable'>
            {dealerInfoList && dealerInfoList.map((v,i)=>(
             //'https://image.hubpass.co.kr:441/delivery.gif ' 
             //onClickDetailInfo(i)     showModal    
                <div className='divTableRow' key={i} onClick={showModal}>
                    <div className='divTableCell'><div className="divImageCell" style={{alignItems:"center"}}><Image src={i<=2
                                                                                                                        ?`https://www.hubpass.co.kr/external/images/a1001/${i===0?'rank_1':i===1?'rank_2':'rank_3'}.jpg`
                                                                                                                        :v.storeCount === '0'
                                                                                                                        ? 'https://www.hubpass.co.kr/external/images/a1001/noorder.gif' 
                                                                                                                        :'https://www.hubpass.co.kr/external/images/a1001/delivery.gif'

                                                                                                                  }
                                                                                                                  
                                                                                                                  alt="materials"
                                                                                                                  width={80} height={60}
                                                                                                                  layout='responsive'
                                                                                                                  /></div></div>
                                                                                                                   {/*v.storeCount === '0'? faker.random.image() :faker.random.image()}/></div></div>*/}
                    
                    <div className='divTableCell' >
                      <font color={i<=2 ? 'red' : ''} style={{fontFamily:'Hanna',fontSize:'3vh'}}>
                     {v.infoName}
                      </font>
                      <br/>
                      <font style={{fontFamily:'jua',fontSize:'2vh'}}>&nbsp;{v.address}</font>
                      <br/>


                      
                      <font style={{fontFamily:'jua',fontSize:'2vh',opacity:'0.6'}}>&nbsp;{v.item,v.status}</font>            
                      <br/>
                    </div>
                    {/* 
                    <div className='divTableCell' style={{paddingRight:'0.7%',fontFamily:'jua'}}><Button type="primary" onClick={onClickDetailInfo(i)} style={{borderRadius:'8px'}}>상세정보</Button></div> 
                    */}
                </div>
            ))}
           
            </div>
            {PerDataLength >= endValue && <Button type="primary" onClick={onClickMore}  loading={btnLoading} block>더 보기 ▼</Button>  } 

                
            
         

        </div>
    )

}
export default DealerInfoListComponent;
