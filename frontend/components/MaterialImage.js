import React, { useState } from 'react';
import Image from 'next/image'
import {useRouter} from 'next/router'; 
import {Modal} from 'antd';
import noimages from '/public/noimages.gif'

const MaterialImage =({visible,func,materialName,src})=>{


    const [getVisible,setVisible] = useState(visible); 

    const changeVisibleValue =()=>{
        func(true); 
        setVisible(false);
    }


    return(
        <div>
        <Modal
        title={materialName}
        centered
        maskClosable={false}
        visible={getVisible}

        onCancel={changeVisibleValue}
        onOk={changeVisibleValue}
        cancelText={'닫기'}
        okText={'확인'}

      
        >
         <Image src={src} alt={noimages} width={500} height={400} layout='responsive'/>
        </Modal>
        
        </div>
                
    )


}

export default MaterialImage; 