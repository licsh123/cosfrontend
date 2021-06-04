import {Button} from '@material-ui/core';
import ApiService from '../ApiService';
import React, { useEffect,useState } from 'react'
import axios from 'axios';
import { Link,useHistory } from 'react-router-dom';

const OrderMain=()=>{
    const [userInfo,setUserInfo] = useState([]);
    const [radioStatus,setRadioStatus] = useState("option1");
    const history = useHistory();

    

    useEffect(()=>{
    });

    // const pullUserInfo=()=>{
    //     ApiService.showUserInfo()
    //     .then(res=>{
    //         setUserInfo(res.data);
    //     })
    // }

    const changeRadio = (e)=>{
        setRadioStatus(e.target.value);
    }
    // const kakaoPay=()=>{
    //     axios.post("http://localhost:8081/kakaoPay")
    //     .then(response=>{
    //         console.log(response);
    //     })
    // }

    const kakaoPay = ()=>{
        ApiService.kakaoPay()
        .then(res=>{
            window.location.assign(res.data);
        })
        .catch(
            console.log("오류 발생")
        )
    }


    
    return(
        <div>
            <h2>주문서</h2>
            <div className="order_user">
                <p>1.주문 고객 정보</p>
                <hr></hr>
                {/* <p>{userInfo[0]}</p>
                <p>{userInfo[1]}</p>
                <p>{userInfo[2]}</p> */}
            </div>
            <div className="adress_info">
                <p>2.배송지 정보</p>
                <hr></hr>
                <div className="address_radio">
                    <label>
                    <input type="radio"
                    value="option1"
                    checked={radioStatus=="option1"}
                    onChange={changeRadio}/>
                    배송지 목록
                    </label>
                    <label>
                    <input type="radio"
                    value="option2"
                    checked={radioStatus=="option2"}
                    onChange={changeRadio}/>
                    새로 입력
                    </label>
                </div>
                <hr></hr>
                <div style={radioStatus=="option1"?{}:{display:"none"}} >
                    <p>추성훈</p>
                    <p>010-3677-2109</p>
                    <p>서울특별시 영등포구 도신로 15가길 8 302호</p>
                </div>
                <div style={radioStatus=="option2"?{}:{display:"none"}}>
                    <p>김영한</p>
                    <p>010-3227-2759</p>
                    <p>여의도대방로 158번길 29</p>
                </div>
                <hr></hr>
            </div>
            <div className="payAPI">
                <p>4.결제</p>
                <Button variant="contained" color="primary" onClick={kakaoPay}>결제하기</Button>
            </div>
            <div>
            </div>

        </div>
    );

}

export default OrderMain;