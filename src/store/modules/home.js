import mockrequest from '@/utils/mockrequest'
const actions={
   async mockre({commit}){
        let res=await mockrequest.get('/home/list')
        if (res.code==20000) {
           
            commit('MOCKRE',res.data)
        }
    }
}

const mutations={
    MOCKRE(state,mochredata){
        state.mochredata=mochredata
    }
}

const state={
    mochredata:{}
}

const settings={

}

export default {
    actions,
    mutations,
    state,
    settings
}