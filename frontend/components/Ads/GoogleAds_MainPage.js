
import React , {useEffect}from 'react'

const GoogleAds_MainPage = ()=>{

    useEffect(()=>{
        if(window) (window.adsbygoogle = window.adsbygoogle || []).push({});

    },[])

    return (
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
    )
}
export default GoogleAds_MainPage;