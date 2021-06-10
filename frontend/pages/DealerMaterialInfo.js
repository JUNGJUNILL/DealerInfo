import React, { useState, useEffect, useCallback } from 'react';
import { Modal, Button, Col,Row,Input } from 'antd';
import { useDispatch, useSelector } from 'react-redux';

import 
    {DEALERMATERIALINFO_REQUEST,} 
from '../reducers/dealerInfoListReducer'; 


import {useRouter} from 'next/router'; 


const DealerMaterialInfo =()=>{

    const router = useRouter(); 
    const dispatch              = useDispatch(); 
    const {
      dealerCode,
      infocode,
      infoName,
  } = router.query; 

    const [getVisible,setVisible] = useState(true); 
 
    const [changeDealerInfo,setChangeDealerInfo] = useState(false);
    const {materialArray, 
           dealerMaterialInfoListError,
           prevDealerCode,
           prevInfoCode,
           materialMoreBtnLoading,
           materialPerDataLength,
           materialArrayTopMaterial
          } = useSelector((state)=>state.dealerInfoListReducer); 

    const [startValue,setStartValue] = useState(0); 
    const [endValue,  setEndValue] = useState(100);
    const [clickCount , setClickCount] =useState(1); 

 
    //첫 로딩 시.. 
    useEffect(()=>{
        if(window) (window.adsbygoogle = window.adsbygoogle || []).push({});
                dispatch({
                type:DEALERMATERIALINFO_REQUEST, 
                data:{  dealerCode:dealerCode,
                        infoCode:infocode,
                        start:0,
                        end:100,
                        prevDealerCode:prevDealerCode,
                        prevInfoCode:prevInfoCode,
                        onClickMaterialInfoModal:getVisible
                    },
                });
               

    },[]); 

    //자식 컴포넌트에서 부모 변수 컨트롤하기
    const changeVisibleValue =()=>{
        //func(true); 
        setVisible(false);
    }

      //더 보기 버튼 클릭 
    const onClickMore = useCallback(()=>{

        setClickCount(prev=>prev+1);
        /*
            100~200        처음 더보기         100 ~ 100
        
            200~300       두 번째 더보기       200 ~ 100      
            
            300~400       세 번째 더보기       300 ~ 100
        */
            dispatch({
                type:DEALERMATERIALINFO_REQUEST, 
                data:{  dealerCode:dealerCode,
                        infoCode:infocode,
                        start:endValue*clickCount,
                        end:endValue,
                        prevDealerCode:prevDealerCode,
                        prevInfoCode:prevInfoCode,
                    },
                });
    
    
    },[clickCount,endValue,prevDealerCode,prevInfoCode]); 

    const abc = () =>{
      setVisible(false); 

      router.back();
      return; 
    }

    return (
        <div>
        <Row>  
        <Col xs={24} md={12}> </Col>
        <Modal
        title={`${infoName}-품목 리스트`}
        centered
        maskClosable={false}
 
        visible={getVisible}
     
        footer={null}
        afterClose={()=>router.back()} visible={getVisible} onOk={abc} onCancel={abc}
      
        >
        <div style={{width:'100%',textAlign:"center"}}>
            <font style={{fontFamily:'Hanna',fontSize:'3vh'}}>품목 리스트</font> <br/>
            <font style={{fontFamily:'jua',fontSize:'2vh',opacity:'0.6'}}>(인기 많은 품목순으로 정렬)</font>        
        </div>
        <br />

        <div className='divTable' style={{marginTop:'3%'}}>
            {materialArray && materialArray.map((v,i)=>(
                
                <div className='divTableRow' style={{backgroundColor:materialArrayTopMaterial===v.materialCode ? "#d8d8d8":""}}>
                    <div className='divTableCell'><div className="divImageCell" style={{alignItems:"center"}}><img src={'https://image.hubpass.co.kr:441/delivery.gif'}/></div></div>
                    <div className='divTableCell'>
                    <font style={{fontFamily:'Hanna',fontSize:'2.2vh'}}>
                    {v.materialName}
                    </font>
                    <br />
                    &nbsp;규격 : {v.dimension}
                    <br />
                    &nbsp;단위 : {v.unitName}
                    <br />
                    &nbsp;선발주 일수 : D-{v.restrictCount}
                    </div>
                </div>
            ))}
        </div>
        {materialPerDataLength >= endValue && 
        <Button type="primary" onClick={onClickMore} loading={materialMoreBtnLoading} block>더 보기 ▼</Button> }
       
        <br/>

        <div className='divTableAds' >
        <div className='divTableAdsRow' >
          <div className='divTableAdsCell'>
          <ins className="adsbygoogle"
                style={{display:'block' ,textAlign:'center',border:'1px solid'}}
                data-ad-layout="in-article"
                data-ad-format="fluid"
                data-ad-client="ca-pub-9160341796142118"
                data-ad-slot="9182008142"></ins>
          </div>
        </div>
      </div>
     
        </Modal>
        <Col /> 

    </Row>
        </div>
    )
}
export default DealerMaterialInfo;