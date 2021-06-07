import {Button} from '@material-ui/core';
import ApiService from '../ApiService';
import React, { useEffect,useState } from 'react'
import "./css/CartList.css";
import { Link,RouteComponentProps } from 'react-router-dom';

const CartList = ()=>{
    const [carts,setCarts] = useState([]);
    const [sumMoneys,setSumMoneys] = useState(0);
    const [x,setX] = useState(0);

    const imgUrl = "/images/";
    
    useEffect(()=>{
        reloadBoardList();
        reloadSumMoney();
    },[x]);

    const reloadBoardList = () =>{
    ApiService.showCartList()
        .then(res => {
            setCarts(res.data);
        })
        .catch(err => {
            console.log('reloadBoardList() Error!',err);
        })
    }
    const deleteCart = (cartId) =>{
        ApiService.deleteCart(cartId)
        .then(res=>{
            setCarts(carts.filter(cart=>cart.cartId!==cartId));
            setX(x+1);
        })
        .catch(err=>{
            console.log("지우기 에러");
        })
    }
    const plusChange = (name,index)=>{
        let newArr = carts.map((item,i)=>{
            if(index==i&&item.amount<item.productStock){
                return {...item,[name]:item.amount+1};
            }else{
                return item;
            }
        });
        ApiService.updateCart(newArr[index]);
        setX(x+1);
    }
    const minusChange = (name,index)=>{
        let newArr = carts.map((item,i)=>{
            if(index==i&&item.amount>1){
                return {...item,[name]:item.amount-1};
            }else{
                return item;
            }
        });
        ApiService.updateCart(newArr[index]);
        setX(x-1);
    }
    const reloadSumMoney = () =>{
        ApiService.showSumMoney()
            .then(res => {
                setSumMoneys(res.data);
            })
            .catch(err => {
                console.log('reloadSumMoney() Error!',err);
            })
        }
    // const sumMoney =()=>{
    //     let result =0;
    //     carts.map((cart,index)=>{
    //         console.log(cart.amount);
    //         console.log(cart.productPrice);
    //         result+=cart.amount*cart.productPrice;
    //     });
    //     setSumMoneys(result);
    // }
    return (
                    <div className="cartlistmain">
                      <div className="cartlistheader">
                          <p>장바구니</p>
                          <hr></hr>
                      </div>
                      <div className="cartlistget">
                        {carts.map((cart,index) =>
                            <div key={cart.cartId}>
                                <div className="exitbutton">
                                    <Button onClick={()=>deleteCart(cart.cartId)}>x</Button>
                                </div>
                                <img src={imgUrl+cart.productImagePath}/>
                                <p>{cart.productName}</p>
                                <p>{cart.productPrice}</p>
                                <p>{cart.productSize}</p>
                                <p>컬러 블루</p>
                                <p>수량 
                                <Button onClick={()=>minusChange("amount",index)}>-</Button>
                                {cart.amount}
                                <Button onClick={()=>plusChange("amount",index)}>+</Button></p>
                                <div className="cartprice">
                                    <p>{cart.money}</p>
                                </div>
                                <hr></hr>
                            </div>
                        )}
                      </div>
                      <div className="cartlistfooter">
                            <div className="cartlistprice">
                                <div className="cartlistpriceleft">
                                    <p>총 상품 금액</p>
                                    <p>배송비</p>
                                    <p>총 결제 예정 금액</p>
                                </div>
                                <div className="cartlistpriceright">
                                    <p>{sumMoneys}</p>
                                    <p>3000</p>
                                    <p>{sumMoneys+3000}</p>
                                </div>
                            </div>
                            <div className="claerfloat"/>
                            <div className="cartlistpay">
                                <hr></hr>
                                <Link to="/order" style={{textDecoration: 'none'}}>
                                <Button >주문하기</Button>
                                </Link>
                            </div>
                        </div>
                    </div>
                );
}
export default CartList;