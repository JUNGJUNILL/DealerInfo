
//https://www.youtube.com/watch?v=jQ4YD7Ip6T4 이거보고 해결 
export const fetchData = async (actionData) =>{

  try{
    const {clientIp, init} = actionData;
    console.log('clientIp====>', clientIp); 
    let goUrl='https://www.hubpass.co.kr/asp/standard/DealerInfo03.jsp?region='; 
   
    if(init){
      
      const request = await fetch(`https://ipinfo.io/${clientIp}?token=ad6b444b39c31e`)
      const json = await request.json(); 
     
      
      goUrl=goUrl+json.region; 

    }else{

      goUrl=goUrl+clientIp; 
    }
    const response = await fetch(goUrl);
    const data = await response.json(); 
    return data; 

  }catch(e){
    console.error(e); 
  }

}