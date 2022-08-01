import React , {useState,useEffect,useCallback}from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Select ,Button,Modal} from 'antd';
import {useCookies} from 'react-cookie'
const { Option } = Select;

import wrapper from '../store/configureStore';
import {localDataList}from '../API/localData'; 
import axios from 'axios';
import {useRouter} from 'next/router'; 
import Image from 'next/image'

import 
    {DEALERINFO_REQUEST,} 
from '../reducers/dealerInfoListReducer'; 

import {END} from 'redux-saga'; 
import { route } from 'next/dist/next-server/server/router';


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



  //에널리틱스 
  useEffect(()=>{

    //구글 광고
    if(window) (window.adsbygoogle = window.adsbygoogle || []).push({});

    dispatch({
      type:DEALERINFO_REQUEST,
          data:{clientIp:'36.39.49.234',
          init:'initLoad',
          start:0,
          end:20
        },
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



    return (
        <div>

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
      {/* 
        <ins className="adsbygoogle"
            style={{display:'block',marginTop:'3%'}}
            data-ad-client={'ca-pub-9160341796142118'}
            data-ad-slot={'1823921553'}
            data-ad-format={'auto'}
            data-full-width-responsive={'true'}></ins>
      */}

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
                <div className='divTableRow' key={i} onClick={onClickDetailInfo(i)}>
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
/*
export const getServerSideProps = wrapper.getServerSideProps(async (context) => {

  try{
    console.log('req=>',context.req);
      const clientIp =process.env.NODE_ENV === 'production' ? context.req.headers['x-real-ip'] || context.req.connection.remoteAddress : '36.39.49.234';
      const apiResult =await axios.get(`https://ipinfo.io/${clientIp}?token=ad6b444b39c31e`);
      const clientRegion = apiResult.data.region || 'Seoul' || null; 


      //서버사이드렌더링 페이지 캐싱하기 위한 장치
      //서버사이드렌더링 페이지로 뒤로가기 시 캐싱이 안되서 새로 로드 될 때 상당히 느린 문제를 해결함. 
      //하지만 해당 위치의 스크롤 이동까지는 구현하지 못함
      // if(context.res){ 
      // }

        context.res.setHeader(
          'Cache-Control',
          'public, max-age=100, s-maxage=100, stale-while-revalidate=100'
        )

//        console.log('context.res.req',context.req); 
    

        
      

      context.store.dispatch({
        type:DEALERINFO_REQUEST,
            data:{clientIp:clientIp,
            init:'initLoad',
            start:0,
            end:20
          },
      });
    

  
      // 서버에서 saga에서 SUCCESS 되서 데이터가 완전히 다 만들어진 
      // 상태로 화면이 그려주기 위한 장치 
    
      // REQUEST 해서 SUCCESS 될 때까지 기다려주기 위한 장치
      // 이걸 빼면 그냥 REQUEST 요청만 완료된 상태가 되어버리기 때문에 데이터가 나오지 않을 것이다.
      context.store.dispatch(END); 
      await context.store.sagaTask.toPromise(); 

      
      return {
        props: {clientRegion}, // will be passed to the page component as props
      } 
  
  }catch(e){

    console.error(e); 

  }

  });
*/
export default DealerInfo;