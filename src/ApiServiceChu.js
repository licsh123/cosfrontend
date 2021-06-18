import axios from 'axios';

const USER_API_BASE_URL = "http://localhost:8081/board";

class ApiServiceChu {


    addCart(cart){
        return axios.post("http://localhost:8081/cart/insert",cart)
    }
    showCartList(){
        return axios.get("http://localhost:8081/cart/list")
    }
    deleteCart(cartId){
        return axios.delete("http://localhost:8081/cart/"+cartId)
    }
    updateCart(cart){
        return axios.put("http://localhost:8081/cart/modify",cart)
    }
    showSumMoney(){
        return axios.get("http://localhost:8081/cart/summoney")
    }
    
    showAddressList(){
        return axios.get("http://localhost:8081/order/address")
    }

    showUserInfo(){
        return axios.get("http://localhost:8081/order/user")
    }
    
    addOrderInfo(order){
        return axios.post("http://localhost:8081/order/insert",order)
    }

    kakaoPay(){
        return axios.post("http://localhost:8081/order/kakaoPay")
    }

    // kakaoPaySuccess(test){
    //     return axios.get("http://localhost:8081/order/kakaoPaySuccess")
    // }
    kakaoPayTest(test){
        return axios.get("http://localhost:8081/order/kakaoPaySuccess"+test)
    }
    
    //채팅 보낸 내용 backend로전송
    submitChat(chat){
        return axios.post("http://localhost:8081/chat/submit",chat)
    }


}

export default new ApiServiceChu();
