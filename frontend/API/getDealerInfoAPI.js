
//https://www.youtube.com/watch?v=jQ4YD7Ip6T4 이거보고 해결 
export const getDealerInfoAPI = async (actionData) =>{

  try{
    const {

      initlocal,
      start,
      end
    
    } = actionData;
    
    let goUrl;
      goUrl=`https://www.hubpass.co.kr/asp/standard/DealerInfo03.jsp?region=${initlocal}&start=${start}&end=${end}`;

    const response = await fetch(goUrl);
    const data = await response.json(); 
    return {
            result:data
          }; 

  }catch(e){
    console.error(e); 
  }

}