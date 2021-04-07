const express = require('express'); 
const router  = express.Router(); 
const data =require('../jsonData/dealerInfoData.js'); 
const fetch = require('node-fetch'); 


//게시글 TEST 
router.post('/select', async (req,res,next)=>{

  try{

    const {clientIp,init} = req.body.data; 
 
     //모듈 시스템에 대해 계략적으로 배움 : https://uroa.tistory.com/57
     //실제 데이터
     let dealerInfoList;

    if(init){ //첫 로드시 

      const request = await fetch(`https://ipinfo.io/${clientIp}?token=${process.env.IPTOKEN}`)
      const json = await request.json(); 
      

      dealerInfoList =  data.dealerInfoList().filter((v,i,array)=>{
        if(v.region === json.region){
          return array;
        }
      }); 

    return res.json(dealerInfoList); 

    }else{ //select 박스 변경 시 

       dealerInfoList =  data.dealerInfoList().filter((v,i,array)=>{
        if(v.region === clientIp){
          return array;
        }
      });          

      return res.json(dealerInfoList); 
    }

  }catch(e){
      console.log(e); 
      next(e); 
  }
}); 





module.exports  = router; 