import React , {useState,useEffect,useCallback,createRef}from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Select ,Button} from 'antd';
const { Option } = Select;

import wrapper from '../store/configureStore';
import {localDataList}from './localData'; 
import axios from 'axios';

import 
    {DEALERINFO_REQUEST,} 
from '../reducers/dealerInfoListReducer'; 

import DealerinfoModalComponent from '../components/DealerinfoModalComponent'


const DealerInfo = ({clientIp,clientRegion}) =>{

  const dispatch              = useDispatch(); 
  const {dealerInfoList}      = useSelector((state)=>state.dealerInfoListReducer); 

  useEffect(()=>{

    dispatch({
      type:DEALERINFO_REQUEST, 
      data:{clientIp:clientIp,init:'initLoad'},
    });
    
  },[]); 



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
   
      let changeSubLocalList = localDataList.filter((v,i,array)=>{
          if(v.regionName === value){
              return array;
          }
      }); 

      setSubLocalValue(changeSubLocalList[0].cityCode); 
      setSubLocal([...changeSubLocalList]); 
      
      dispatch({
        type:DEALERINFO_REQUEST, 
        data:{clientIp:value},
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
                    <div className='divTableCell'><div className="divImageCell"><img src={i<=2?`https://image.hubpass.co.kr:441/${i===0?'rank_1':i===1?'rank_2':'rank_3'}.jpg`:'https://image.hubpass.co.kr:441/Vegetable.gif'}/></div></div>
                    
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
                    </div>

                     <div className='divTableCell' style={{paddingRight:'0.7%',fontFamily:'jua'}}><Button type="primary" onClick={onClickDetailInfo(i)} style={{borderRadius:'8px'}}>상세정보</Button></div>
                </div>
            ))}
            </div>
      
        </div>
    )

}

export const getServerSideProps = wrapper.getServerSideProps(async (context) => {

  try{

      const clientIp =context.req.headers['x-real-ip'] || context.req.connection.remoteAddress;
      const apiResult =await axios.get(`https://ipinfo.io/${clientIp}?token=ad6b444b39c31e`);
      const clientRegion = apiResult.data.region || 'Seoul' || null; 
      
      return {
        props: {clientIp,clientRegion}, // will be passed to the page component as props
      } 
  
  }catch(e){

    console.error(e); 

  }

  });


export default DealerInfo;