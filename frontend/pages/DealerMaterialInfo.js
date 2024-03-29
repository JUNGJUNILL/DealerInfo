import React, { useState, useEffect, useCallback,useRef } from 'react';
import { Modal, Button,Row,Input,Space } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import Image from 'next/image'
import noimages from '/public/noimages.gif'
import 
    {DEALERMATERIALINFO_REQUEST,} 
from '../reducers/dealerInfoListReducer'; 

import 
    MaterialImage
from '../components/MaterialImage'
import GoogleAds_Material_Page from '../components/Ads/GoogleAds_Material_Page';


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
    const [endValue,  setEndValue] = useState(25);
    const [clickCount , setClickCount] =useState(1); 
    const [materialName,setMaterialName]= useState('');
    const [dimension, setDimension] = useState(''); 
    const [imageMaterialName,setImageMaterialName] = useState(''); 
    const [materialImageSrc,setMaterialImageSrc] = useState(''); 
    const [imageModalFlag, setImageModalFlag] = useState(false); 
    const refMaterialName = useRef(); 
    const refDimension = useRef(); 
    const refImage = useRef(); 

    

    //첫 로딩 시.. 
    useEffect(()=>{
        //구글 에드센스 광고
        //if(window) (window.adsbygoogle = window.adsbygoogle || []).push({});
         
                dispatch({
                type:DEALERMATERIALINFO_REQUEST, 
                data:{  dealerCode:dealerCode,
                        infoCode:infocode,
                        start:0,
                        end:25,
                        prevDealerCode:prevDealerCode,
                        prevInfoCode:prevInfoCode,
                        onClickMaterialInfoModal:getVisible,

                        materialName:materialName,
                        dimension:dimension,
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
                        materialName:materialName,
                        dimension:dimension,
                    },
                });
    
    
    },[clickCount,endValue,prevDealerCode,prevInfoCode,materialName,dimension]); 


    const blank_pattern = /^\s+|\s+&/g; 
    //검색
    const onClickMaterial = useCallback(()=>{

        if(materialName.length === 0 || materialName.replace(blank_pattern,'')===""){
            refMaterialName.current.focus();  
            alert('검색 시 품명은 필수입니다.'); 
            return; 
        }
        
        dispatch({
            type:DEALERMATERIALINFO_REQUEST, 
            data:{  dealerCode:dealerCode,
                    infoCode:infocode,
                    start:0,
                    end:25,
                    prevDealerCode:prevDealerCode,
                    prevInfoCode:prevInfoCode,
                    onClickMaterialInfoModal:getVisible,
                    materialName:materialName,
                    dimension:dimension,
                },
            });


        },[clickCount,endValue,prevDealerCode,prevInfoCode,materialName,dimension]); 

    

    const onChangeMaterialName=useCallback((e)=>{
        setMaterialName(e.target.value); 
    },[materialName])

    const onChangeDimension=useCallback((e)=>{
        setDimension(e.target.value); 
    },[dimension])

    //인풋창에서 enter 눌렀을 시(pc,mobile 동일)
    const onKeyPressMaterialSearch = (e) =>{
        
        if(e.key==='Enter'){
            onClickMaterial(); 
        }
    }

    //이미지 클릭 
    const imgDetail = useCallback((fileName,bigsellerImage,materialName)=>{

        setImageModalFlag(true); 
        setImageMaterialName(materialName); 
        let imgSrc; 
        imgSrc = fileName.length > 0 
        ? `https://www.hubpass.co.kr/external/images/a${dealerCode}/${fileName}` 
        : bigsellerImage.length > 0 
        ? bigsellerImage 
        : noimages

        setMaterialImageSrc(imgSrc); 
        

        
    },[imageMaterialName,materialImageSrc])

    const chageBooleanValue = () =>{
        setImageModalFlag((prev)=>!prev);
        
    }
    

    const abc = () =>{
      setVisible(false); 

      router.back();
      return; 
    }

    return (
        <div>

    
        <Row>  
        
         {imageModalFlag && <MaterialImage visible={imageModalFlag} func={chageBooleanValue} materialName={imageMaterialName} src={materialImageSrc}/>}
        
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
            <br/>
            <br/>
            <GoogleAds_Material_Page />
            <br />
            <Space direction="horizontal">
            <Input placeholder="품명" onKeyPress={onKeyPressMaterialSearch} onChange={onChangeMaterialName} ref={refMaterialName}/>
            <Input placeholder="규격" onKeyPress={onKeyPressMaterialSearch} onChange={onChangeDimension} />
            <Button onClick={onClickMaterial}  loading={materialMoreBtnLoading}>검색</Button>
            </Space>
        </div>
        <br />
     

        <div className='divTable' style={{marginTop:'3%'}}>
            {materialArray && materialArray.map((v,i)=>(
                
                <div className='divTableRow' style={{backgroundColor:materialArrayTopMaterial===v.materialCode ? "#d8d8d8":""}}>
                    <div className='divTableCell'><div className="divImageCell" style={{alignItems:"center"}} onClick={()=>imgDetail(v.fileName,v.bigsellerImage,v.materialName)}><Image src={v.fileName.length > 0 
                                                                                                                       ? `https://www.hubpass.co.kr/external/images/a${dealerCode}/${v.fileName}` 
                                                                                                                       : v.bigsellerImage.length > 0 
                                                                                                                       ? v.bigsellerImage 
                                                                                                                       : noimages}
                                                                                                                       
                                                                                                                       alt={noimages}
                                                                                                                       width={80} height={60}
                                                                                                                       layout='responsive'
                                                                                                                       
                                                                                                                       /></div></div>
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
       
   

        <div className='divTableAds' >
        <div className='divTableAdsRow' >
          <div className='divTableAdsCell'>
          <ins className="adsbygoogle"
                style={{display:'block' ,textAlign:'center'}}
                data-ad-layout="in-article"
                data-ad-format="fluid"
                data-ad-client="ca-pub-9160341796142118"
                data-ad-slot="9182008142"></ins>
          </div>
        </div>
      </div>
     
        </Modal>
     

    </Row>
        </div>
    )
}
export default DealerMaterialInfo;