import produce from '../util/produce';


export const  initialState = {

    //유통사 정보 리스트 
    dealerInfoList   : [],
    clientIp      : '',
    reginValue    :'', 
    btnLoading    :false,
    PerDataLength :0,
    dealerInfoListError:null,


    //유통사별 품목 정보 리스트 
    materialArray : [], 
    dealerMaterialInfoListError:null,
    materialMoreBtnLoading:false,
    materialPerDataLength:0,
    materialArrayTopMaterial:'',

    prevDealerCode:'',
    dealerCode:'',

    prevInfoCode:'',
    infoCode:'',


    //유통사 품목 정보 클릭 
    materialInfoClick:false,

    //더 보기 버튼 클릭
    moreButtonClick:1,


}


//유통사 리스트 
export const DEALERINFO_REQUEST='DEALERINFO_REQUEST';
export const DEALERINFO_SUCCESS='DEALERINFO_SUCCESS';
export const DEALERINFO_FAILURE='DEALERINFO_FAILURE';

//유통사별 품목 정보 리스트 
export const DEALERMATERIALINFO_REQUEST='DEALERMATERIALINFO_REQUEST';
export const DEALERMATERIALINFO_SUCCESS='DEALERMATERIALINFO_SUCCESS';
export const DEALERMATERIALINFO_FAILURE='DEALERMATERIALINFO_FAILURE';

//유통사 품목 정보 클릭 
export const MATERIALINFO_CLICK_REQUEST='MATERIALINFO_CLICK_REQUEST';

//더보기 버튼 클릭 
export const MORE_BUTTON_CLICK_REQUEST='MORE_BUTTON_CLICK_REQUEST';


const reducer = (state = initialState, action) => produce(state, (draft) => {

    switch(action.type){


//유통사 리스트
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

//유통사별 품목 정보 리스트
//--------------------------------------------------------------------

        case DEALERMATERIALINFO_REQUEST: {
            draft.materialMoreBtnLoading=true; 
            break; 
        }
        case DEALERMATERIALINFO_SUCCESS: {
            draft.materialMoreBtnLoading=false; 

            //유통사 정보를 바꿨을 경우, 
            //품목 상세정보를 다시 클릭 했을 경우, 배열 초기화
            if(action.onClickMaterialInfoModal || action.changeDealerInfo){
                draft.materialArray.length=0; 
            }

            draft.prevDealerCode=action.prevDealerCode;
            draft.prevInfoCode=action.prevInfoCode;
            draft.materialPerDataLength=action.data.length; 
            draft.materialArrayTopMaterial=action.data[0].materialCode;
            draft.materialArray=draft.materialArray.concat(action.data); 
            break; 
        }

        case DEALERMATERIALINFO_FAILURE: {
            draft.dealerMaterialInfoListError='서버에러 관리자에게 문의하세요'; 
            break; 
        }

//--------------------------------------------------------------------

//유통사 품목 정보 클릭
//--------------------------------------------------------------------
        case MATERIALINFO_CLICK_REQUEST : {
            draft.materialInfoClick=true;

            break;
        }
//--------------------------------------------------------------------


//더 보기 버튼 클릭
//--------------------------------------------------------------------
        case MORE_BUTTON_CLICK_REQUEST : {
           draft.moreButtonClick=action.data.count+1;

        break;
        }
//--------------------------------------------------------------------





        default : break; 
    
    }

}); 
export default reducer;