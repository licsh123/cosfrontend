import axios from 'axios';

const USER_API_BASE_URL = "http://localhost:8081/board";

class ApiService {


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
    

    showUserInfo(){
        return axios.get("http://localhost:8081/order/user")
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


}

export default new ApiService();
