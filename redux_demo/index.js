 const redux = require('redux');
 const createStore = redux.legacy_createStore
 const bindActionCreators = redux.bindActionCreators
 const combineReducers = redux.combineReducers
const reduxLogger = require('redux-logger')
const logger = reduxLogger.createLogger();
const applyMiddleware = redux.applyMiddleware
 const CAKE_ORDERED = 'CAKE_ORDERED';
 const CAKE_RESTOCKED="CAKE_RESTOCKED";
 const ICECREAM_ORDERED ="ICECREAM_ORDERED";
 const ICECREAM_RESTOCKED= "ICECREAM_RESTOCKED";
 const orderCake=()=>({type:CAKE_ORDERED, quantity:1})
//  (previousState,action)=>newState
function restoreCake(qty=1){
      return{
        type:CAKE_RESTOCKED,
        payload:qty
      }
}
function orderIceCream(qty=1){
     return{
         type:ICECREAM_ORDERED,
         payload:qty
     }
}
function restockIceCream(qty=1){
     return{
        type : ICECREAM_RESTOCKED ,
        payload:qty
     }
}
// const initialState={
//     numOfCakes :10,
//     numOfIceCream:20
//     // anotherPrperty:0,
// }
const initialCakeState={
     numOfCakes:10
}
const initialIceCreamState={
    numOfIceCream:20
}
const cakeReducer=(state=initialCakeState,action)=>{
    switch(action.type){
        case CAKE_ORDERED:
            return{ 
                ...state,
                numOfCakes:state.numOfCakes- 1,
            }
            case CAKE_RESTOCKED:
                return{
                    ...state,
                    numofCakes: state.numOfCakes + action.payload ,
                }
               
        default:
            return state
    }
}
const iceCreamReducer=(state=initialIceCreamState,action)=>{
    switch(action.type){
        case ICECREAM_ORDERED:
            return{ 
                ...state,
                numOfIceCream:state.numOfIceCream- 1,
            }
            case ICECREAM_RESTOCKED:
                return{
                    ...state,
                    numOfIceCream: state.numOfIceCream + action.payload ,
                }
        default:
            return state
    }
}
const rootReduder = combineReducers({
    cake:cakeReducer,
    iceCream:iceCreamReducer
})
const store = createStore(rootReduder,applyMiddleware(logger));
console.log("Initial state",store.getState());
const unsubscribe =store.subscribe(()=>console.log("new State",store.getState()));
// store.dispatch(orderCake())
// store.dispatch(orderCake())
// store.dispatch(orderCake())
// store.dispatch(restoreCake(3))

const actions = bindActionCreators({orderCake,restoreCake,orderIceCream,restockIceCream},store.dispatch)
actions.orderCake()
actions.orderCake()
actions.orderCake()
actions.restoreCake(3)
actions.orderIceCream();
actions.restockIceCream(3)
unsubscribe()
