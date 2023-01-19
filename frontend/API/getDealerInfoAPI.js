
//https://www.youtube.com/watch?v=jQ4YD7Ip6T4 이거보고 해결 
export const getDealerInfoAPI = async (actionData) =>{

  try{
    const {
      initValue,
      initlocal,
      start,
      end
    
    } = actionData;
    
    let goUrl="";
    let region="";

    if(initValue){

      // let userRegiongoUrl='https://hubpass.co.kr/asp/standard/Get_Client_regionInfo.jsp';
      // const userRegionResponse = await fetch(userRegiongoUrl);
      // const regionData = await userRegionResponse.json();
      // const userRegion = regionData.region;
      region = 'Seoul';

    }else{
      region = 'Seoul';

    }

   


    goUrl=`https://www.hubpass.co.kr/asp/standard/DealerInfo03.jsp?region=${region}&start=${start}&end=${end}`;

    const response = await fetch(goUrl);
    const data = await response.json(); 
    return {
            result:data,
            region:region
          }; 

  }catch(e){
    console.error(e); 
  }

}