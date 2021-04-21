import { all, fork, put, takeLatest, call, throttle, delay} from 'redux-saga/effects';
const fetch =require('node-fetch');
import axios from 'axios'

import {getDealerInfoAPI} from '../API/getDealerInfoAPI';
import {getDealerMaterialInfoAPI} from '../API/getDealerMaterialInfoAPI';

import {

    DEALERINFO_REQUEST,
    DEALERINFO_SUCCESS,
    DEALERINFO_FAILURE,

    DEALERMATERIALINFO_REQUEST,
    DEALERMATERIALINFO_SUCCESS,
    DEALERMATERIALINFO_FAILURE,



} from '../reducers/dealerInfoListReducer';

  //백엔드 서버 사용 시 
 function dealerInfoListAPI(data){

    return axios.post('/dealerInfo/select',{data}); 
    
}

//유통사 정보 리스트 가져오기 
function* dealerInfoList(action){
    try{
        //백엔드 서버 사용 시 
        //const result =yield call(dealerInfoListAPI,action.data); 
        const {result,region} =yield call(getDealerInfoAPI,action.data); 
        const {changeLocalValue} = yield action.data;
        
        yield  put({
              type:DEALERINFO_SUCCESS, 

              //백엔드 서버 사용 시 
              //data:result.data,
              data:result,
              region:region,
              changeLocalValue:changeLocalValue,
          });
  
      }catch(e){
          console.error(e); 
          yield put({
              type:DEALERINFO_FAILURE, 
              error: e.response.data, 
          }); 
      }
}


//유통사별 품목 정보 리스트 가져오기
function* dealerMaterialInfoList(action){
    try{
        
        const {result} =yield call(getDealerMaterialInfoAPI,action.data); 
       
        //유통사 정보를 바꿨을 경우
        const  changeDealerInfoFlag =yield  action.data.prevDealerCode !== action.data.dealerCode || 
                                            action.data.prevInfoCode   !== action.data.infoCode    ? true : false;
      
        yield put({
            
              type:DEALERMATERIALINFO_SUCCESS, 
              data:result,
              prevDealerCode :action.data.dealerCode,
              prevInfoCode : action.data.infoCode,
              changeDealerInfo : changeDealerInfoFlag,
              onClickMaterialInfoModal : action.data.onClickMaterialInfoModal,


          });
  
      }catch(e){
          console.error(e); 
          yield put({
              type:DEALERMATERIALINFO_FAILURE, 
              error: e.response.data, 
          }); 
      }
}


function* watchDealerInfoList() {
    yield takeLatest(DEALERINFO_REQUEST, dealerInfoList);
    //TEST_REQUEST 액션이 실행될 때까지 기다리겠다.
    //takeLatest 더블 클릭 시 서버에 2번요청 간다.
    //응답은 한번만 온다.
    //결국 db에 데이터가 2개 저장 될 수 있다. 
    //이걸 방지한게 throttle이라는 것이 있다. : 마지막 함수가 호출된 후 일정 시간이 지나기 전에 다시 호출되지 않도록 하는것

}

function* watchDealerMaterialInfoList(){
    yield takeLatest(DEALERMATERIALINFO_REQUEST, dealerMaterialInfoList);

}


export default function* testSaga() {
    yield all([
                fork(watchDealerInfoList), 
                fork(watchDealerMaterialInfoList), 
              ]); 
}