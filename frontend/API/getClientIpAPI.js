
//https://www.youtube.com/watch?v=jQ4YD7Ip6T4 이거보고 해결 
export const getClientIpAPI = async () =>{
    try{

     let goUrl='https://hubpass.co.kr/asp/standard/Get_Client_regionInfo.jsp';
     const response = await fetch(goUrl);
     const data = await response.json(); 
     const reginValue=data.region;
      return {       
              region:reginValue
            }; 

    }catch(e){
      console.error(e); 
    }

  }