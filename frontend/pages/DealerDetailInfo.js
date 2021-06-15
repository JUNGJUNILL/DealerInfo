import React, { useState, useEffect } from 'react';
import { Button,Modal } from 'antd';
import Link from 'next/link';

import {useRouter} from 'next/router'; 
import DealerMaterialInfoComponent from '../components/DealerMaterialInfoComponent'



//{dealerinfo}
const DealerDetailInfo =()=>{

    const router = useRouter(); 
    //유통사 상세정보 
    const {
        dealerCode,
        infocode,
        infoName,
        address,
        item,
        status,
        infoPhone,
        handphone,
        storeCount,
        orderCount,
        materialQtyCount,
        moneyTohangul,
        money,
        region,
        stockinday,
        ceoName
    } = router.query; 

    // //모달창 보이기, 안보이기 값
    // const [boleanValue ,setBooleanValue]= useState(false); 


    // //품목 상세 정보 가져오기
    // const getMaterialList = () =>{ 

    //     //router.push('/DealerMaterialInfo');
    //     setBooleanValue((value)=>!value);; 

    // }

    
    // const chageBooleanValue = () =>{
    //     setBooleanValue((prev)=>!prev); 
    //   }
    
    const onClickMaterialInfo =()=>{

        let queryString = "?dealerCode="+dealerCode
                    +"&infocode="+infocode
                    +"&infoName="+infoName

        router.push('/DealerMaterialInfo'+queryString ,'/DealerMaterialInfo');

    }



     //카카오 맵 api 가져다 씀 
     useEffect(()=>{
        if(window) (window.adsbygoogle = window.adsbygoogle || []).push({});


        var container = document.getElementById('map');
        var options = {
          center: new kakao.maps.LatLng(0, 0), //default ,지도 정보가 이상할
          level: 2
        };
        var map = new kakao.maps.Map(container, options);
        var geocoder = new kakao.maps.services.Geocoder();



        geocoder.addressSearch(address, function(result, status) {

                 map.setZoomable(false); //지도 확대 축소 차단 
                 map.setDraggable(false); //지도 그레그 이동 차단

                //지도 클릭 시..
                kakao.maps.event.addListener(map, 'click', function(mouseEvent) {        
                    window.open(`https://map.kakao.com/link/map/${infoName},${result[0].y},${result[0].x}`);     
                });

            // 정상적으로 검색이 완료됐으면 
             if (status === kakao.maps.services.Status.OK) {
        
                var coords = new kakao.maps.LatLng(result[0].y, result[0].x);
        
                // 결과값으로 받은 위치를 마커로 표시합니다
                var marker = new kakao.maps.Marker({
                    map: map,
                    position: coords
                });
        
                // 인포윈도우로 장소에 대한 설명을 표시합니다
                var infowindow = new kakao.maps.InfoWindow({
                    content: `<div style="width:150px;text-align:center;padding:6px 0;">${infoName}</div>`
                });
                infowindow.open(map, marker);
        
                // 지도의 중심을 결과값으로 받은 위치로 이동시킵니다
                map.setCenter(coords);
            }
        });    


        }, [])

 

    return (
        <div>

        {/*품목 상세정보 모달 화면*/}
    

        {/*유통사명*/}
        <p style={{textAlign:'center',marginBottom:'-2%',marginTop:'2%'}}><font style={{fontFamily:'Hanna',fontSize:'4vh'}}>{infoName}</font></p>

        {/*날짜*/}
        <p style={{textAlign:'center'}}><font style={{fontFamily:'Hanna',fontSize:'4vh'}}>{stockinday} 거래량</font></p>
        <hr style={{opacity:'0.4'}}/>

        {/*납품처*/}
        <p>&nbsp;&nbsp;&nbsp;&nbsp;<font style={{fontFamily:'jua',fontSize:'3vh'}}>납품처</font></p>
        <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<font style={{fontFamily:'Hanna',fontSize:'2vh'}}>{storeCount} 곳</font></p>
        <hr style={{opacity:'0.4'}}/>

        {/*품목 리스트*/}
        <p onClick={onClickMaterialInfo} >&nbsp;&nbsp;&nbsp;&nbsp;<font style={{fontFamily:'jua',fontSize:'3vh'}} >품목 리스트</font>&nbsp;&nbsp;&nbsp;&nbsp; <Link as='/DealerMaterialInfo' href={{pathname:'/DealerMaterialInfo',query:{dealerCode:dealerCode,infocode:infocode,infoName:infoName}}}><Button type="primary"  style={{borderRadius:'8px'}}><font style={{paddingRight:'0.7%',fontFamily:'jua'}}>품목상세정보</font></Button></Link></p>
        <p onClick={onClickMaterialInfo} >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<font style={{fontFamily:'Hanna',fontSize:'2.5vh'}}>{orderCount} 가지</font></p>
        <hr style={{opacity:'0.4'}}/>

        {/*납품된 품목 총 수량*/}
        <p>&nbsp;&nbsp;&nbsp;&nbsp;<font style={{fontFamily:'jua',fontSize:'3vh'}}>납품된 품목 총 수량</font></p>
        <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<font style={{fontFamily:'Hanna',fontSize:'2.5vh'}}>{materialQtyCount}</font></p>
        <hr style={{opacity:'0.4'}}/>

         {/*매출액*/}
        <p>&nbsp;&nbsp;&nbsp;&nbsp;<font style={{fontFamily:'jua',fontSize:'3vh'}}>매출액</font></p>
        {/*<p>&nbsp;&nbsp;&nbsp;&nbsp;<font style={{fontFamily:'Hanna',fontSize:'2vh'}}>{money.replace(pattern,'$&,')} 원</font></p>*/}
        <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<font style={{fontFamily:'Hanna',fontSize:'2.5vh'}}>비공개</font></p>
        <hr style={{opacity:'0.4'}}/>

        {/*대표자*/}
        <p>&nbsp;&nbsp;&nbsp;&nbsp;<font style={{fontFamily:'jua',fontSize:'3vh'}}>대표자</font></p>
        <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<font style={{fontFamily:'Hanna',fontSize:'2vh'}}>{ceoName}</font></p>
        <hr style={{opacity:'0.4'}}/>

        {/*연락처*/}
        <p>&nbsp;&nbsp;&nbsp;&nbsp;<font style={{fontFamily:'jua',fontSize:'3vh'}}>연락처</font></p>
        <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<font style={{fontFamily:'Hanna',fontSize:'2.5vh'}}><a href={`tel:${infoPhone}`}>{infoPhone}</a>{handphone?  <a href={`tel:${handphone}`}> / {handphone}</a>: ''}</font></p>
        <hr style={{opacity:'0.4'}}/>

        {/*주소*/}
        <p>&nbsp;&nbsp;&nbsp;&nbsp;<font style={{fontFamily:'jua',fontSize:'3vh'}}>주소</font></p>
        <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<font style={{fontFamily:'Hanna',fontSize:'2vh'}}>{address}</font></p>
     
        <div>
        <div id="map" style={{width:'100%',height:'300px'}}></div>
        </div>
        <br/>
        <p>
          <ins className="adsbygoogle"
                style={{display:'block' ,textAlign:'center'}}
                data-ad-layout="in-article"
                data-ad-format="fluid"
                data-ad-client="ca-pub-9160341796142118"
                data-ad-slot="1678868744"></ins>
       </p>
      </div>


     
    )
}
export default DealerDetailInfo;