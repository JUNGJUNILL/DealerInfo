
//https://www.youtube.com/watch?v=jQ4YD7Ip6T4 이거보고 해결 
export const fetchData = async () =>{

  try{
      console.log('패치 데이터',hello); 
    const response = await fetch('https://www.hubpass.co.kr/asp/standard/DealerInfo03.jsp?region=Incheon');
    const data = await response.json(); 
    return data; 

  }catch(e){
    console.error(e); 
  }

}