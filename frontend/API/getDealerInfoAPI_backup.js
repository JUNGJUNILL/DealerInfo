
//https://www.youtube.com/watch?v=jQ4YD7Ip6T4 이거보고 해결 
export const getDealerInfoAPI = async (actionData) =>{

  try{
    const {

      clientIp, 
      init,
      start,
      end
    
    } = actionData;
    
    let goUrl;
    let reginValue; 
   
    if(init){
      const request = await fetch(`https://ipinfo.io/${clientIp}?token=ad6b444b39c31e`)
      const json = await request.json(); 
      reginValue = json.region;
      
      goUrl=`https://www.hubpass.co.kr/asp/standard/DealerInfo03.jsp?region=${json.region}&start=${start}&end=${end}`;

    }else{

      reginValue = clientIp;
      goUrl=`https://www.hubpass.co.kr/asp/standard/DealerInfo03.jsp?region=${clientIp}&start=${start}&end=${end}`;
    }
    const response = await fetch(goUrl);
    const data = await response.json(); 
    return {
            result:data,
            region:reginValue
          }; 

  }catch(e){
    console.error(e); 
  }

}