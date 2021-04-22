import React, { useState, useEffect } from 'react';
import { Modal, Button, Col,Row } from 'antd';

import DealerMaterialInfoComponent from './DealerMaterialInfoComponent'


const DealerinfoModalComponent = ({visible,dealerinfo,func}) =>{

    //모달창 보이기, 안보이기 값
    const [getVisible,setVisible] = useState(visible); 

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
    } = dealerinfo; 

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

     




    //원단위 콤마 정규표현식
    const pattern = /\d{1,3}(?=(\d{3})+(?!\d))/g; 

    //빈칸제거 정규표현식 
    const ceoNameEdit = ceoName.replace(/ /g,"").split(''); 
          ceoNameEdit.splice(1,1,'*')

    const changeVisibleValue=()=>{
        func(true); 
        setVisible(false);
    }


    const [boleanValue ,setBooleanValue]= useState(false); 
    const [getDetailMaterialInfo,setDetailMaterialInfo] = useState(null); 

    //품목 상세 정보 가져오기
    const getMaterialList = () =>{
        setBooleanValue((value)=>!value);; 

    }

    const chageBooleanValue = () =>{
        setBooleanValue((prev)=>!prev); 
      }
    

    return (
       <div>   
       {/*품목 상세정보 모달 화면*/}
       {boleanValue && <DealerMaterialInfoComponent
                    visible={boleanValue} 
                    func={chageBooleanValue}
                    dealerCode={dealerCode}
                    infocode={infocode}
                    infoName={infoName}
                        />
       }
       <Row>
            <Col xs={24} md={12}></Col>
            <Modal
                title={infoName}
                centered
                maskClosable={false}
                visible={getVisible}
                onCancel={changeVisibleValue}
                onOk={changeVisibleValue}
                cancelText={'닫기'}
                okText={'확인'}
              
             
                >
                <p style={{textAlign:'center'}}><font style={{fontFamily:'Hanna',fontSize:'4vh'}}>{stockinday} 거래량</font></p>
                <p>&nbsp;<font style={{fontFamily:'jua',fontSize:'3vh'}}>납품처</font></p>
                <p>&nbsp;&nbsp;&nbsp;&nbsp;<font style={{fontFamily:'Hanna',fontSize:'2vh'}}>{storeCount} 곳</font></p>
                <hr style={{opacity:'0.4'}}/>

                
                <p>&nbsp;<font style={{fontFamily:'jua',fontSize:'3vh'}}>납품된 품목 리스트</font> <Button type="primary"  style={{borderRadius:'8px'}} onClick={getMaterialList}><font style={{paddingRight:'0.7%',fontFamily:'jua'}}>상세정보</font></Button></p>
                <p>&nbsp;&nbsp;&nbsp;&nbsp;<font style={{fontFamily:'Hanna',fontSize:'2.5vh'}}>{orderCount.replace(pattern,'$&,')} 가지</font></p>
                <hr style={{opacity:'0.4'}}/>

                <p>&nbsp;<font style={{fontFamily:'jua',fontSize:'3vh'}}>납품된 품목 총 수량</font></p>
                <p>&nbsp;&nbsp;&nbsp;&nbsp;<font style={{fontFamily:'Hanna',fontSize:'2.5vh'}}>{materialQtyCount.replace(pattern,'$&,')}</font></p>
                <hr style={{opacity:'0.4'}}/>

                <p>&nbsp;<font style={{fontFamily:'jua',fontSize:'3vh'}}>매출액</font></p>
                {/*<p>&nbsp;&nbsp;&nbsp;&nbsp;<font style={{fontFamily:'Hanna',fontSize:'2vh'}}>{money.replace(pattern,'$&,')} 원</font></p>*/}
                <p>&nbsp;&nbsp;&nbsp;&nbsp;<font style={{fontFamily:'Hanna',fontSize:'2.5vh'}}>비공개</font></p>
                <hr style={{opacity:'0.4'}}/>

                <p>&nbsp;<font style={{fontFamily:'jua',fontSize:'3vh'}}>대표자</font></p>
                <p>&nbsp;&nbsp;&nbsp;&nbsp;<font style={{fontFamily:'Hanna',fontSize:'2vh'}}>{ceoNameEdit.join('')}</font></p>
                <hr style={{opacity:'0.4'}}/>

                <p>&nbsp;<font style={{fontFamily:'jua',fontSize:'3vh'}}>연락처</font></p>
                <p>&nbsp;&nbsp;&nbsp;&nbsp;<font style={{fontFamily:'Hanna',fontSize:'2.5vh'}}>{infoPhone}{handphone? ' / ' + handphone: ''}</font></p>
                <hr style={{opacity:'0.4'}}/>

                <p>&nbsp;<font style={{fontFamily:'jua',fontSize:'3vh'}}>주소</font></p>
                <p>&nbsp;&nbsp;&nbsp;&nbsp;<font style={{fontFamily:'Hanna',fontSize:'2vh'}}>{address}</font></p>
     

                <div>
                <div id="map" style={{width:'100%',height:'300px'}}></div>
                </div>
           
            </Modal>
            <Col /> 
            </Row>
       </div>
    )


}

export default DealerinfoModalComponent; 