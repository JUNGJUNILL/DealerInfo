import React, { useState, useEffect, useCallback } from 'react';
import { Button } from 'antd';
import { useDispatch ,useSelector} from 'react-redux';
import Link from 'next/link';

import {useRouter} from 'next/router'; 
import 
    {MATERIALINFO_CLICK_REQUEST,} 
from '../reducers/dealerInfoListReducer'; 
import GoogleAds_Detail_Page from './Ads/GoogleAds_Detail_Page';



const DealerDetailInfoComponent=({dealerInfoList,dealerCode,info})=>{
    
    const router = useRouter();
    const dispatch = useDispatch();

    const dealerDetailInfo = dealerInfoList.filter((v,i,array)=>{
        if(v.dealerCode===dealerCode && v.infocode===info){
            return array;
        }
    });


    const pattern = /\d{1,3}(?=(\d{3})+(?!\d))/g; 
    const ceoNameEdit = dealerDetailInfo[0].ceoName.replace(/ /g,"").split(''); 
          ceoNameEdit.splice(1,1,'*')

    const infocode = dealerDetailInfo[0].infocode;
    const infoName = dealerDetailInfo[0].infoName;
    const address  = dealerDetailInfo[0].address;
    const item     = dealerDetailInfo[0].item;
    const status   = dealerDetailInfo[0].status;
    const infoPhone= dealerDetailInfo[0].infoPhone;
    const handphone= dealerDetailInfo[0].handphone;
    const storeCount = dealerDetailInfo[0].storeCount;
    const orderCount = dealerDetailInfo[0].orderCount.replace(pattern,'$&,');
    const moneyTohangul=dealerDetailInfo[0].moneyTohangul;
    const money    =dealerDetailInfo[0].money;
    const region   =dealerDetailInfo[0].region;
    const stockinday=dealerDetailInfo[0].stockinday;
    const ceoName =ceoNameEdit.join('');
    const materialQtyCount = dealerDetailInfo[0].materialQtyCount.replace(pattern,'$&,');

    const [x,setX] =useState(''); 
    const [y,setY] =useState(''); 

    
    const onClickMaterialInfo =useCallback(()=>{
        
        dispatch({
                type:MATERIALINFO_CLICK_REQUEST
        })

        
        let queryString = "?dealerCode="+dealerCode
                    +"&infocode="+infocode
                    +"&infoName="+infoName

        router.push('/DealerMaterialInfo'+queryString ,'/DealerMaterialInfo');
        
    },[])


    
     //카카오 맵 api 가져다 씀 
     useEffect(()=>{

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
                 let X = result[0] ? result[0].x : 0
                 let Y = result[0] ? result[0].y : 0
                 setX(X);
                 setY(Y); 
                 

                //지도 클릭 시..
                kakao.maps.event.addListener(map, 'click', function(mouseEvent) {
                    window.open(`https://map.kakao.com/link/map/${infoName},${Y},${X}`);     
                });

            // 정상적으로 검색이 완료됐으면 
             if (status === kakao.maps.services.Status.OK) {
        
                var coords = new kakao.maps.LatLng(Y, X);
        
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



    return(
        <div>   
            
            <br/>
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
            <p onClick={onClickMaterialInfo} >&nbsp;&nbsp;&nbsp;&nbsp;<font style={{fontFamily:'jua',fontSize:'3vh'}} >취급 품목 리스트</font>&nbsp;&nbsp;&nbsp;&nbsp; <Link as='/DealerMaterialInfo' href={{pathname:'/DealerMaterialInfo',query:{dealerCode:dealerCode,infocode:infocode,infoName:infoName}}}><Button type="primary"  style={{borderRadius:'8px'}}><font style={{paddingRight:'0.7%',fontFamily:'jua'}}>품목상세정보</font></Button></Link></p>
            <p onClick={onClickMaterialInfo} >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<font style={{fontFamily:'Hanna',fontSize:'2.5vh'}}>{orderCount} 가지</font></p>
            <hr style={{opacity:'0.4'}}/>

            {/*납품된 품목 총 수량*/}
            <p>&nbsp;&nbsp;&nbsp;&nbsp;<font style={{fontFamily:'jua',fontSize:'3vh'}}>납품된 품목 총 수량</font></p>
            <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<font style={{fontFamily:'Hanna',fontSize:'2.5vh'}}>{materialQtyCount}</font></p>
            <hr style={{opacity:'0.4'}}/>

            {/*매출액*/}
            <p>&nbsp;&nbsp;&nbsp;&nbsp;<font style={{fontFamily:'jua',fontSize:'3vh'}}>매출액</font></p>
            <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<font style={{fontFamily:'jua',fontSize:'2.5vh'}}>{money.replace(pattern,'$&,')} 원</font></p>
            <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<font style={{fontFamily:'jua',fontSize:'2.5vh'}}>{moneyTohangul.substr(3)}</font></p>
            
            {/*<p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<font style={{fontFamily:'Hanna',fontSize:'2.5vh'}}>비공개</font></p>*/}
            <hr style={{opacity:'0.4'}}/>

            {/*대표자*/}
            <p>&nbsp;&nbsp;&nbsp;&nbsp;<font style={{fontFamily:'jua',fontSize:'3vh'}}>대표자</font></p>
            <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<font style={{fontFamily:'Hanna',fontSize:'2.5vh'}}>{ceoName}</font></p>
            <hr style={{opacity:'0.4'}}/>

            {/*연락처*/}
            <p>&nbsp;&nbsp;&nbsp;&nbsp;<font style={{fontFamily:'jua',fontSize:'3vh'}}>연락처</font></p>
            <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<font style={{fontFamily:'Hanna',fontSize:'2.5vh'}}><a href={`tel:${infoPhone}`}>{infoPhone}</a>{handphone?  <a href={`tel:${handphone}`}> / {handphone}</a>: ''}</font></p>
            <hr style={{opacity:'0.4'}}/>

            {/*구글 광고*/}
            <GoogleAds_Detail_Page />

            {/*주소*/}
            <p>&nbsp;&nbsp;&nbsp;&nbsp;<font style={{fontFamily:'jua',fontSize:'3vh'}}>주소</font></p>
            <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<font style={{fontFamily:'Hanna',fontSize:'2.5vh'}}>{address}</font></p>



            {/*카카오 지도 */}
            <div style={{position:'relative'}}>
                <div id="map" style={{width:'100%',height:'300px',position:'relative'}} />
                <a href={`https://map.kakao.com/link/map/${infoName},${y},${x}`} target='_blank'>
                    {/*지도 위에서도 화면 드래그를 위한 장치 (position:'relative' 해 놓은 것도)*/}
                    <div style={{position:'absolute',zIndex:1,top:0,bottom:0,left:0,right:0}} />
                </a>
            </div>


        </div>
    )
}

export default DealerDetailInfoComponent; 