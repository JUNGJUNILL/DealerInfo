import produce from '../util/produce';


export const  initialState = {
    dealerInfoList   : [],
    clientIp      : '',
    reginValue    :'', 
    btnLoading    :false,
    PerDataLength :0,
    dealerInfoListError:null,

}


//유통사 리스트 

export const DEALERINFO_REQUEST='DEALERINFO_REQUEST';
export const DEALERINFO_SUCCESS='DEALERINFO_SUCCESS';
export const DEALERINFO_FAILURE='DEALERINFO_FAILURE';


const reducer = (state = initialState, action) => produce(state, (draft) => {

    switch(action.type){



//--------------------------------------------------------------------
        case DEALERINFO_REQUEST : {
            draft.btnLoading=true; 
            break;
        }
        case DEALERINFO_SUCCESS : {
            draft.btnLoading=false; 
            draft.reginValue=action.region; 
    
            //지역 정보를 바꿨을 경우 배열 초기화
            if(action.changeLocalValue){
                draft.dealerInfoList.length=0; 
            }
            draft.PerDataLength=action.data.length;
            draft.dealerInfoList=draft.dealerInfoList.concat(action.data); 

          

            break;

        }
        case DEALERINFO_FAILURE: {
            draft.dealerInfoListError='서버에러 관리자에게 문의하세요'; 
            break; 
        }
//--------------------------------------------------------------------
        default : break; 
    
    }

}); 
export default reducer;