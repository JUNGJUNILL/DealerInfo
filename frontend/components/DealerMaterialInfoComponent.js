import React, { useState, useEffect, useCallback } from 'react';
import { Modal, Button, Col,Row } from 'antd';
import { useDispatch, useSelector } from 'react-redux';

import 
    {DEALERMATERIALINFO_REQUEST,} 
from '../reducers/dealerInfoListReducer'; 


const DealerMaterialInfoComponent =({visible,func,dealerCode,infocode,infoName})=>{

    const dispatch              = useDispatch(); 

    const [getVisible,setVisible] = useState(visible); 
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
    const [endValue,  setEndValue] = useState(10);
    const [clickCount , setClickCount] =useState(1); 

 
    //첫 로딩 시.. 
    useEffect(()=>{
               
                dispatch({
                type:DEALERMATERIALINFO_REQUEST, 
                data:{  dealerCode:dealerCode,
                        infoCode:infocode,
                        start:0,
                        end:10,
                        prevDealerCode:prevDealerCode,
                        prevInfoCode:prevInfoCode,
                        onClickMaterialInfoModal:getVisible
                    },
                });

    },[]); 

    //자식 컴포넌트에서 부모 변수 컨트롤하기
    const changeVisibleValue =()=>{
        func(true); 
        setVisible(false);
    }

      //더 보기 버튼 클릭 
    const onClickMore = useCallback(()=>{

        setClickCount(prev=>prev+1);
        console.log('clickCount=>',clickCount); 
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


    return(
        <div>
        <Row>  
            <Col xs={24} md={12}> </Col>
            <Modal
            title={`${infoName}-품목 리스트`}
            centered
            visible={getVisible}
            onCancel={changeVisibleValue}
            onOk={changeVisibleValue}
            cancelText={'닫기'}
            okText={'확인'}
          
            >
            <div style={{width:'100%',textAlign:"center"}}>
                <font style={{fontFamily:'Hanna',fontSize:'3vh'}}>품목 리스트</font> <br/>
                <font style={{fontFamily:'jua',fontSize:'2vh',opacity:'0.6'}}>(인기 많은 품목순으로 정렬)</font>
            </div>

            <div className='divTable' style={{marginTop:'3%'}}>
                {materialArray && materialArray.map((v,i)=>(
                    <div className='divTableRow' style={{backgroundColor:materialArrayTopMaterial===v.materialCode ? "#d8d8d8":""}}>
                        <div className='divTableCell'><div className="divImageCell" style={{alignItems:"center"}}><img src={'https://image.hubpass.co.kr:441/delivery.gif'}/></div></div>
                        <div className='divTableCell'>
                        <font style={{fontFamily:'Hanna',fontSize:'2.2vh'}}>
                        {v.materialName}
                        </font>
                        <br />
                        &nbsp;규격 : {v.dimension} , {v.materialCode}
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

         
            </Modal>
            <Col /> 

        </Row>
        </div>
    )

}


export default DealerMaterialInfoComponent; 