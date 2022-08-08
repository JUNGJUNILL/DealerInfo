import React , {useState,useEffect,useCallback}from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Select ,Button,Modal} from 'antd';
const { Option } = Select;

import {localDataList}from '../API/localData'; 
import {useRouter} from 'next/router'; 
import Image from 'next/image'
import noimages from '/public/noimages.gif'

import GoogleAds_MainPage from './Ads/GoogleAds_MainPage';


import 
    {DEALERINFO_REQUEST,
     MORE_BUTTON_CLICK_REQUEST
    } 
from '../reducers/dealerInfoListReducer'; 





const DealerInfoListComponent = ()=>{

    const dispatch              = useDispatch(); 
    const {dealerInfoList, 
          btnLoading, 
          reginValue, 
          PerDataLength,moreButtonClick}      = useSelector((state)=>state.dealerInfoListReducer); 
    const [endValue,  setEndValue] = useState(20);
    const [clickCount , setClickCount] =useState(moreButtonClick); 
    const router = useRouter(); 


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
      type:MORE_BUTTON_CLICK_REQUEST,
      data:{
        count:0
      }
    })
    
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
    const getDetailDealerIno =(dealerCode,infocode)=>() => {
      router.push(`?page=true&code=${dealerCode}&info=${infocode}`)
    };


    //더 보기 버튼 클릭 
    const onClickMore = useCallback(()=>{

        setClickCount(prev=>prev+1);
        dispatch({
          type:MORE_BUTTON_CLICK_REQUEST,
          data:{
            count:clickCount
          }
        })

        /*
            50~100        처음 더보기          50 ~ 50
          
            100~150       두 번째 더보기       100 ~ 50      
            
            150~200       세 번째 더보기       150 ~ 50
        */
        dispatch({
          type:DEALERINFO_REQUEST, 
          data:{
                initlocal:reginValue,
                initValue:false,
                start:endValue*clickCount,
                end:endValue
          },
      });
     
      },[clickCount,endValue,reginValue]); 



    return (
        <div>

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
            <GoogleAds_MainPage />

         {/*데이터 리스트*/}
         <div className='divTable'>
            {dealerInfoList && dealerInfoList.map((v,i)=>(
             //'https://image.hubpass.co.kr:441/delivery.gif ' 
             //onClickDetailInfo(i)     showModal    
                <div className='divTableRow' key={i} onClick={getDetailDealerIno(dealerInfoList[i].dealerCode,dealerInfoList[i].infocode)}>
                    <div className='divTableCell'><div className="divImageCell" style={{alignItems:"center"}}><Image src={i<=2
                                                                                                                        ?`https://www.hubpass.co.kr/external/images/a1001/${i===0?'rank_1':i===1?'rank_2':'rank_3'}.jpg`
                                                                                                                        :v.storeCount === '0'
                                                                                                                        ? 'https://www.hubpass.co.kr/external/images/a1001/noorder.gif' 
                                                                                                                        :'https://www.hubpass.co.kr/external/images/a1001/delivery.gif'

                                                                                                                  }
                                                                                                                  
                                                                                                                  alt={noimages}
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
