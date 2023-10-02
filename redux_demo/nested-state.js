
const redux = require('redux');
const produce = require('immer').produce
const initialState={
    name:"ruban",
    address:{
         street:"123 main st",
         city:'chennai',
         state:"TN"
    }
}
const STREET_UPDATED = 'STREET_UPDATED';
const updatedStreet=(street)=>{
     return{
        type:STREET_UPDATED,
        payload:street,
     }
}
const reduder=(state=initialState,action)=>{
     switch(action.type){
        case STREET_UPDATED:
            // return{
            //     ...state,
            //     address:{
            //         ...state.address ,
            //         street:action.payload,
            //     }
            // }
            return produce(state,(draft)=>{
                 draft.address.street =action.payload
            })
            default:{
                return state
            }
     }
}
const store = redux.legacy_createStore(reduder);
console.log("Initial State",store.getState());
const unsubscribe =store.subscribe(()=>{
     console.log('Updated State',store.getState());
})
store.dispatch(updatedStreet("426 main road"))
unsubscribe()