import {Button} from '@material-ui/core';
import ApiService from '../ApiService';
import React, { useEffect,useState } from 'react'
import axios from 'axios';
import { Link,RouteComponentProps } from 'react-router-dom';

const KakaoPaySuccess=(props)=>{
    const [orderInfo,setOrderInfo] = useState({
        amount:[],
        approved_at:"",
        item_name:""
    });
    const {search} = props.location;


    const test = {
        pg_token:search.split("=")[1]
    }


    useEffect(()=>{
        kakaoPayInfoPull(test.pg_token);
    },[])

    const kakaoPayInfoPull=(pg_token)=>{
        ApiService.kakaoPayTest(pg_token)
        .then(res=>{
            console.log(res)
            setOrderInfo(res.data)
            console.log(orderInfo)
        })
        .catch(
            console.log("카카오페이 주문정보 오류 발생")
        )

    }



    return(
        <div>
            <h2>주문이 완료되었습니다</h2>
        </div>
    );

}

export default KakaoPaySuccess;