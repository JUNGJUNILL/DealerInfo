
import {useCallback,useState,useEffect, useRef} from 'react'
import {Row,Col,Button,Layout} from  'antd'; 
import {UnorderedListOutlined,HomeOutlined } from '@ant-design/icons'


import Router from 'next/router'; 
import Link from 'next/link'
import { useDispatch, useSelector } from 'react-redux';


const AppLayOut = ({children}) =>{
    const dummyList = ['카테코리01','카테코리02','카테코리03','카테코리04','카테코리05','카테코리05','카테코리05','카테코리05','카테코리05','카테코리05','카테코리05','카테코리05','카테코리05','카테코리05','카테코리05','카테코리05','카테코리05','카테코리05','카테코리05','카테코리05','카테코리05']; 
    const [isClicked,setIsClicked] = useState(false);

    const catergoriList = () =>{
        setIsClicked(!isClicked);
    }

    const closeCatergoriList = () =>{
        setIsClicked(false);
    }

    const gotoHome = () =>{
        Router.push('/'); 
    }


    
    return(



        <Row>

        <Col xs={24} md={6}>
        </Col>


        <Col  xs={24} md={12}>
        <ul className="navul">
        {/*
            <li className="navli" onClick={catergoriList}><UnorderedListOutlined /></li>
        */}
            <li className="navli"><HomeOutlined onClick={gotoHome} /></li>    
      
        </ul>
       
    {children}
    
        <div className="footerSub"></div>
 
        <div className="footer">
         <font style={{fontFamily:'jua',fontSize:'2.5vh',opacity:'0.5'}}>문의 : 개발자 이메일 devjji1207@gmail.com</font>
         <br/>
         <font style={{fontFamily:'jua',fontSize:'2.0vh',opacity:'0.5'}}>도매,도소매,제조,채소,과실,농산물,가공,수산물,가공식품,식품,소매,무역,축산물,슈퍼마켓,육류,식료품,전자상거래,주류,식자재 중개,식품 B2B 사이트,식자재마트 리스트,식자재마트 현황,식자재마트,식자재마트 추천,식품 업체 정보,식품 업체 리스트</font>
        </div>
  

    </Col>

    <Col xs={24} md={6}>
    </Col>

    </Row> 
     
        ); 

}

export default AppLayOut; 