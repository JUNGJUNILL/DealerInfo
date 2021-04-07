import produce from '../util/produce';


export const  initialState = {
    dealerInfoList   : [],
    clientIp      : '',
}


//유통사 리스트 

export const DEALERINFO_REQUEST='DEALERINFO_REQUEST';
export const DEALERINFO_SUCCESS='DEALERINFO_SUCCESS';
export const DEALERINFO_FAILURE='DEALERINFO_FAILURE';


const reducer = (state = initialState, action) => produce(state, (draft) => {

    switch(action.type){



//--------------------------------------------------------------------
        case DEALERINFO_REQUEST : {
            break;
        }
        case DEALERINFO_SUCCESS : {
            draft.dealerInfoList.length=0; 
            action.data.forEach((v)=>{
                draft.dealerInfoList.push(v); 
            }); 

            break;

        }
        case DEALERINFO_FAILURE: {
            break; 
        }
//--------------------------------------------------------------------
        default : break; 
    
    }

}); 
export default reducer;