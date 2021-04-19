
import React, { useEffect } from 'react'

const map  = ()=>{

    useEffect(()=>{
        var container = document.getElementById('map');
        var options = {
          center: new kakao.maps.LatLng(0, 0), //default ,지도 정보가 이상할
          level: 1
        };
        var map = new kakao.maps.Map(container, options);
        var geocoder = new kakao.maps.services.Geocoder();
        geocoder.addressSearch('서울시 구로구 디지털로27길 36', function(result, status) {

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
                    content: '<div style="width:150px;text-align:center;padding:6px 0;">우리회사</div>'
                });
                infowindow.open(map, marker);
        
                // 지도의 중심을 결과값으로 받은 위치로 이동시킵니다
                map.setCenter(coords);
            }
        });    


        }, [])
    
    
        return (
            <div>
                <div id="map" style={{width:'100%',height:'400px'}}></div>
            </div>
        )

}

export default map; 