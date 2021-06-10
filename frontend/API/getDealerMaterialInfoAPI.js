import { Group } from "antd/lib/avatar";

//https://www.youtube.com/watch?v=jQ4YD7Ip6T4 이거보고 해결 
export const getDealerMaterialInfoAPI = async (actionData) =>{

    try{
        const {
            dealerCode, 
            infoCode,
            start,
            end,
            materialName,
            dimension

          } = actionData;
        

      let p_materialName=encodeURIComponent(materialName);
      let p_dimension=encodeURIComponent(dimension);
      let goUrl;
      goUrl=`https://www.hubpass.co.kr/asp/standard/DealerMaterialInfo.jsp?dealerCode=${dealerCode}&infoCode=${infoCode}&start=${start}&end=${end}&materialName=${p_materialName}&dimension=${p_dimension}`

      console.log(goUrl);
      const response = await fetch(goUrl);
      const data = await response.json(); 

      return {
              result:data,
            }; 
  
    }catch(e){
      console.error(e); 
    }
  
  }