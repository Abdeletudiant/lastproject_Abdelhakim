// app/features/CounterSlice.js
import { createSlice } from "@reduxjs/toolkit";

export const counterSlice = createSlice({
    name: "counter",
    initialState: {
        darkmode: true,

        newusername : "",
        newpassword : "",

        basededonnee : [ {username: "test", password: "test"}  ],

        isconnected: false,
        prixtotal: 0,
        panier: [],
        favoris : [],

        current_page : 1,
        nbr_product_by_page: 10,
    },
    reducers: {
        changerpage : (state) => {
            state.current_page += 1
        },

        createaccount : (state,action) => {
            for (let index = 0; index < state.basededonnee.length; index++) {
                const element = state.basededonnee[index];
                if(element.username != action.payload.username) {
                    state.basededonnee.push({username: action.payload.username, password: action.payload.password, })
                }
            }
            // state.newusername = action.payload.username
            // state.newpassword = action.payload.password
            // state.isconnected = true
        },
        disconnect: (state) => {
            state.isconnected = false
        },
        seconnecter : (state, action) => {
            for (let index = 0; index < state.basededonnee.length; index++) {
                const element = state.basededonnee[index];
                if(element.username == action.payload.username && element.password == action.payload.password) {
                    state.isconnected = true
                }
            }
            
            // if (user_existe_deja == false) {
            //     state.basededonnee.push({username: action.payload.username, password: action.payload.password, })
            // }

            // if(action.payload.username === "test" && action.payload.password === "test") {
            //     state.isconnected = true
            // }else {
            //     state.isconnected = false
            // }
        },
        changetheme : (state) => {
            if(state.darkmode == true) {
                state.darkmode = false
            }else {
                state.darkmode = true
            }
        },

        removefavoris : (state, action) => {
            state.favoris.splice(action.payload, 1)
        },

        
        addtofavori : (state, action) => {
            let favori_existe_deja = false
            // si le produit existe pas ne pas l'ajouter
            for (let index = 0; index < state.favoris.length; index++) {
                const element = state.favoris[index];
                if(element.title == action.payload.title ) {
                    element.quantity += 1
                    state.prixtotal += element.price
                    favori_existe_deja = true
                }
            }

            if (favori_existe_deja == false) {
                    // console.log("je rajoute la quantité");
                    state.favoris.push({
                        id: action.payload.id, 
                        img: action.payload.img,
                        title: action.payload.title,
                        price: action.payload.price,
                        quantity : 1,
                    })
                    state.prixtotal += action.payload.price
                }
        },
        ajouter : (state, action) => {
            // console.log(state.panier);
            // state.prixtotal = 0
            let existe_deja = false
            // si le produit existe pas ne pas l'ajouter
            for (let index = 0; index < state.panier.length; index++) {
                const element = state.panier[index];
                if(element.title == action.payload.title ) {
                    element.quantity += 1
                    state.prixtotal += element.price
                    existe_deja = true
                }
            }

            if (existe_deja == false) {
                    // console.log("je rajoute la quantité");
                    state.panier.push({
                        id: action.payload.id, 
                        img: action.payload.img,
                        title: action.payload.title,
                        price: action.payload.price,
                        quantity : 1,
                    })
                    state.prixtotal += action.payload.price
                }
        },

        addone : (state, action) => {
            state.panier[action.payload].quantity += 1
            state.prixtotal +=  state.panier[action.payload].price
        },
        removeonequantity : (state, action) => {
            if (state.panier[action.payload].quantity ==1){
                state.prixtotal -=  state.panier[action.payload].price
                state.panier.splice(action.payload, 1)
                
            }
            else if(state.panier[action.payload].quantity >=2) {
                state.prixtotal -=  state.panier[action.payload].price
                state.panier[action.payload].quantity -= 1
                
            }


        },

        removeproduct : (state,action) => {
            state.prixtotal -=  state.panier[action.payload].price*state.panier[action.payload].quantity
            state.panier.splice(action.payload, 1)
        },

        buynow : (state) => {
            state.panier.splice(0,state.panier.length)
            state.prixtotal = 0
        }


     
    }
});

export const {changerpage, addtofavori, removefavoris, changetheme, ajouter, seconnecter, disconnect, addone, removeonequantity, removeproduct, buynow, createaccount } = counterSlice.actions;

export default counterSlice.reducer;
