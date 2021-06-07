import {Button} from '@material-ui/core';
import ApiService from '../ApiService';
import React, { useEffect,useState } from 'react'
import axios from 'axios';
import { Link,useHistory } from 'react-router-dom';

const OrderMain=()=>{
    const [userInfo,setUserInfo] = useState({
        user_email:"",
        user_name:"",
        user_phone:""
    });
    const [radioStatus,setRadioStatus] = useState("option1");
    const [addresses,setAddresses] = useState([]);
    const [innerRadioStatus,setInnerRadioStatus] = useState(0);
    const [carts,setCarts] = useState([]);

    

    useEffect(()=>{
        reloadAddress();
        reloadOrderList();
        reloadUserInfo();
    },[]);

    const changeRadio = (e)=>{
        setRadioStatus(e.target.value);
    }
    const changeInnerRadio = (e)=>{
        setInnerRadioStatus(e.target.value);
    }

    const reloadAddress = () =>{
        ApiService.showAddressList()
            .then(res => {
                setAddresses(res.data);
            })
            .catch(err => {
                console.log('reloadAddressList() Error!',err);
            })
    }

    const reloadOrderList = () =>{
        ApiService.showCartList()
            .then(res => {
                setCarts(res.data);
            })
            .catch(err => {
                console.log('reloadBoardList() Error!',err);
            })
        }
    const reloadUserInfo=()=>{
        ApiService.showUserInfo()
            .then(res=>{
                setUserInfo(res.data);
            })
            .catch(err => {
                console.log('reloadUserInfo() Error!',err);
            })
    }

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
            <div className="oderList">
                        {carts.map((cart,index) =>
                            <div key={cart.cartId}>
                                <img src={cart.productImagePath}/>
                                <p>{cart.productName}</p>
                                <p>{cart.productPrice}</p>
                                <p>사이즈: {cart.productSize}</p>
                                <p>컬러 블루</p>
                                <p>수량: {cart.amount}</p>
                                <div className="cartprice">
                                    <p>{cart.money}</p>
                                </div>
                                <hr></hr>
                            </div>
                        )}
                </div>
            <div className="order_user">
                <p>1.주문 고객 정보</p>
                <hr></hr>
                <p>{userInfo.user_email}</p>
                <p>{userInfo.user_name}</p>
                <p>{userInfo.user_phone}</p>
            </div>
            <hr></hr>
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
                    <div className="addressListRadio">
                        {addresses.map((address,index) =>
                            <label key={index}>
                            <input type="radio"
                            value={index}
                            checked={innerRadioStatus==index}
                            onChange={changeInnerRadio}/>
                            {index+1}번 배송지
                            </label>
                        )}
                      </div>
                      <div>
                      {addresses.map((address,index)=>
                      <div style={innerRadioStatus==index?{}:{display:"none"}}>
                            <p>우편번호: {address.postCode}</p>
                            <p>주소: {address.address}</p>
                            <p>상세 주소: {address.detailAddress}</p>
                        </div>
                        )}
                      </div>
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