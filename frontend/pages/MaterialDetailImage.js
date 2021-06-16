import React, { useState } from 'react';
import Image from 'next/image'
import {useRouter} from 'next/router'; 
import { Modal, Button, Col,Row } from 'antd';


const MaterialDetailImage = () =>{

    const router = useRouter(); 
    const [getVisible,setVisible] = useState(true); 

    const {
        materialName,
        src
    } = router.query; 

    const abc = () =>{
        setVisible(false); 
  
        router.back();
        return; 
      }

    return(
        <div>
        <Modal
        title={materialName}
        centered
        maskClosable={false}
 
        visible={getVisible}
     
        footer={null}
        afterClose={()=>router.back()} visible={getVisible} onOk={abc} onCancel={abc}
      
        >
         <Image src={src} alt="materialNames" width={500} height={400} layout='responsive'/>
        </Modal>
                
        </div>
    )

}

export default MaterialDetailImage; 