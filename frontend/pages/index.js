import React , {useState,useEffect,useCallback,createRef}from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Select ,Button} from 'antd';
const { Option } = Select;

import wrapper from '../store/configureStore';
import {localDataList}from '../API/localData'; 
import axios from 'axios';

import 
    {DEALERINFO_REQUEST,} 
from '../reducers/dealerInfoListReducer'; 

import {END} from 'redux-saga'; 

import DealerinfoModalComponent from '../components/DealerinfoModalComponent'


const DealerInfo = ({clientIp,clientRegion}) =>{

  const dispatch              = useDispatch(); 
  const {dealerInfoList, 
         btnLoading, 
         reginValue, 
         PerDataLength}      = useSelector((state)=>state.dealerInfoListReducer); 
  const [startValue,setStartValue] = useState(0); 
  const [endValue,  setEndValue] = useState(50);
  const [clickCount , setClickCount] =useState(1); 

  //첫 로드시 list 50개 가져오기 
  // useEffect(()=>{

  //   dispatch({
  //     type:DEALERINFO_REQUEST, 
  //     data:{clientIp:clientIp,
  //           init:'initLoad',
  //           start:startValue,
  //           end:endValue
  //         },
  //   });
    
  // },[]); 



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
        data:{clientIp:value,
              init:'',
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
  const onChangeSubLocal = (value) =>{
    setSubLocalValue(value); 
  }


  const [boleanValue ,setBooleanValue]= useState(false); 
  const [getDealerInfo,setDealerInfo] = useState(null); 

   const onClickDetailInfo =(i)=>() =>{

    setDealerInfo({...dealerInfoList[i]});
    setBooleanValue((value)=>!value);; 

  }

  //자식 컴포넌트의 변수를 부모 컴포넌트로 가져오는 예시
  //https://velog.io/@breeeeze/react-%EC%9E%90%EC%8B%9D%EC%97%90%EC%84%9C-%EB%B6%80%EB%AA%A8%EB%A1%9C-%EB%8D%B0%EC%9D%B4%ED%84%B0-%EC%A0%84%EB%8B%AC%ED%95%98%EA%B8%B0
  const chageBooleanValue = () =>{
    setBooleanValue((prev)=>!prev); 
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
      data:{clientIp:reginValue,
            init:'',
            start:endValue*clickCount,
            end:endValue
      },
  });
 
  },[clickCount,endValue,reginValue]); 



    return (
        <div>
        {/*상세정보 모달 화면*/}
        {boleanValue && <DealerinfoModalComponent 
                          visible={boleanValue} 
                          dealerinfo={getDealerInfo}
                          func={chageBooleanValue}
                          
                        />
        }
        
        <div style={{width:'100%',textAlign:"center"}}>
            <font style={{fontFamily:'Hanna',fontSize:'5vh'}}>우리동네 식자재 유통사</font> <br/>
            <font style={{fontFamily:'jua',fontSize:'2vh',opacity:'0.6'}}>(매출액이 높은 순으로 정렬)</font>
        </div>
      
        <div style={{display:"flex",justifyContent:"center",alignItems:"center"}}>
             <font style={{fontFamily:'jua',fontSize:'2.2vh'}}>지역선택 :</font> &nbsp; 
            {/*광역 시 도 */}
             <Select defaultValue={clientRegion} onChange={onChangeMainLocal} style={{width:'40%'}}>
              {mainLocal.map((v)=>(              
                <Option value={v.regionName} >{v.regionNameHangul}</Option>
              ))}
             </Select>
            
            {/*광역 시 도 하위 도시
            <Select value={subLocalValue} onChange={onChangeSubLocal}>
              {subLocal.map((v)=>(
                <Option value={v.cityCode}>{v.regionNameHangul}</Option>
              ))}
            </Select>
            */}
        </div>
        

        {/*데이터 리스트*/}
         <div className='divTable' style={{marginTop:'3%'}}>
               
            {dealerInfoList && dealerInfoList.map((v,i)=>(
            
                <div className='divTableRow' key={i}>
                    <div className='divTableCell'><div className="divImageCell" style={{alignItems:"center"}}><img src={i<=2?`https://image.hubpass.co.kr:441/${i===0?'rank_1':i===1?'rank_2':'rank_3'}.jpg`:
                                                                                                                   v.storeCount === '0'? 'https://image.hubpass.co.kr:441/noorder.gif' :'https://image.hubpass.co.kr:441/delivery.gif'}/></div></div>
                    
                    <div className='divTableCell' >
                      <font color={i<=2 ? 'red' : ''} style={{fontFamily:'Hanna',fontSize:'3vh'}}>
                      &nbsp;{v.infoName}
                      </font>
                      <br/>
                      <font style={{fontFamily:'Hanna',fontSize:'2.2vh'}}>
                      &nbsp;&nbsp;업태:&nbsp;
                      </font>
                        <font style={{fontFamily:'jua',fontSize:'2vh'}}>{v.item}</font>
                      <br/>
                      <font style={{fontFamily:'Hanna',fontSize:'2.2vh'}}>
                      &nbsp;&nbsp;업종:&nbsp;
                      </font>
                      <font style={{fontFamily:'jua',fontSize:'2vh'}}>{v.status}</font>
                      <br/>
                      <font style={{fontFamily:'Hanna',fontSize:'2.2vh',opacity:'0.6'}}>
                      &nbsp;&nbsp;주소:&nbsp;
                      </font>
                      <font style={{fontFamily:'jua',fontSize:'2vh',opacity:'0.6'}}>{v.address}</font>
                      
                    </div>

                     <div className='divTableCell' style={{paddingRight:'0.7%',fontFamily:'jua'}}><Button type="primary" onClick={onClickDetailInfo(i)} style={{borderRadius:'8px'}}>상세정보</Button></div>
                </div>
            ))}
           
            </div>

              
          {PerDataLength >= endValue && <Button type="primary" onClick={onClickMore}  loading={btnLoading} block>더 보기 ▼</Button>  } 
          
      
        </div>
    )

}

export const getServerSideProps = wrapper.getServerSideProps(async (context) => {

  try{

      const clientIp =context.req.headers['x-real-ip'] || context.req.connection.remoteAddress;
      const apiResult =await axios.get(`https://ipinfo.io/${clientIp}?token=ad6b444b39c31e`);
      const clientRegion = apiResult.data.region || 'Seoul' || null; 



      context.store.dispatch({
        type:DEALERINFO_REQUEST,
            data:{clientIp:clientIp,
            init:'initLoad',
            start:0,
            end:100
          },
      });
  
    
      // 서버에서 saga에서 SUCCESS 되서 데이터가 완전히 다 만들어진 
      // 상태로 화면이 그려주기 위한 장치 
    
      // REQUEST 해서 SUCCESS 될 때까지 기다려주기 위한 장치
      // 이걸 빼면 그냥 REQUEST 요청만 완료된 상태가 되어버리기 때문에 데이터가 나오지 않을 것이다.
      context.store.dispatch(END); 
      await context.store.sagaTask.toPromise(); 


      
      return {
        props: {clientIp,clientRegion}, // will be passed to the page component as props
      } 
  
  }catch(e){

    console.error(e); 

  }

  });


export default DealerInfo;