
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
        </div>
  

    </Col>

    <Col xs={24} md={6}>
    </Col>

    </Row> 
     
        ); 

}

export default AppLayOut; 