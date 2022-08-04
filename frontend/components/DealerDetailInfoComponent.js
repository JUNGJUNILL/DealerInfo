

const DealerDetailInfoComponent=({dealerInfoList,dealerCode})=>{
    
    const dealerDetailInfo = dealerInfoList.filter((v,i,array)=>{
        if(v.dealerCode===dealerCode){
            return array;
        }
    });

    const pattern = /\d{1,3}(?=(\d{3})+(?!\d))/g; 
    const ceoNameEdit = dealerDetailInfo[0].ceoName.replace(/ /g,"").split(''); 
          ceoNameEdit.splice(1,1,'*')

    const infocode = dealerDetailInfo[0].infocode;
    const infoName = dealerDetailInfo[0].infoName;
    const address  = dealerDetailInfo[0].address;
    const item     = dealerDetailInfo[0].item;
    const status   = dealerDetailInfo[0].status;
    const infoPhone= dealerDetailInfo[0].infoPhone;
    const handphone= dealerDetailInfo[0].handphone;
    const storeCount=dealerDetailInfo[0].storeCount;
    const orderCount=dealerDetailInfo[0].orderCount.replace(pattern,'$&,');
    const moneyTohangul=dealerDetailInfo[0].moneyTohangul;
    const money    =dealerDetailInfo[0].money;
    const region   =dealerDetailInfo[0].region;
    const stockinday=dealerDetailInfo[0].stockinday;
    const ceoName =ceoNameEdit.join('');





    return(
        <div>
            <p>유통사 상세 정보={dealerCode},{ceoName},{infoName}</p>
        </div>
    )
}

export default DealerDetailInfoComponent; 