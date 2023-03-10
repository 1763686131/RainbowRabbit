import { login, logout, getInfo } from '@/api/user'
import { getToken, setToken, removeToken } from '@/utils/auth'
import { resetRouter ,asyncrouters,constantRoutes,anytoutes} from '@/router'
import router from '@/router'

const getDefaultState = () => {
  return {
    token: getToken(),
    name: '',
    avatar: '',
    roles:[],
    routes:[],
    buttons:[],
    //计算出的异步路由的结果
    resrouters:[],
    //当前用户的全部路由
    resrouterall:[]
  }
}

const state = getDefaultState()

const componentroter=(asyncrouters,data)=>{

 return asyncrouters.filter(item=>{
    //判断数组里面有没有数值，如果有就不等于-1，没有就是-1，然后有数值执行下面代码
    if (data.indexOf(item.name)!=-1) {
      if (item.children && item.children.length) {
          item.children =componentroter(item.children,data)
      }
      return true
    }
  })
  

}
 



const mutations = {
  RESET_STATE: (state) => {
    Object.assign(state, getDefaultState())
  },
  //存储token
  SET_TOKEN: (state, token) => {
    state.token = token
  },
  //储存用户信息
  SET_USERINFO:(state,data)=>{
    //赋值用户名字
    state.name=data.name,
    //赋值用户头像
    state.avatar=data.avatar
    //用户角色标记
    state.roles=data.roles
    //菜单权限
    state.routes=data.routes
    //按钮权限
    state.buttons=data.buttons
    
  },
  //计算出结果的路由
  SET_RESROUTERS:(state,resrouters)=>{
    state.resrouters=resrouters,
    state.resrouterall=constantRoutes.concat(state.resrouters,anytoutes)
    router.addRoutes(state.resrouterall)

  }

}

const actions = {
  // user login
  async login({ commit }, userInfo) {
    //结构出用户和密码
    const { username, password } = userInfo
    let res= await login({username: username.trim(), password: password})
    if(res.code==20000){
      commit('SET_TOKEN', res.data.token)
      setToken(res.data.token)
      return "ok"
    }else{
      return Promise.reject(new error('faile'))
    }
  },

  // 获取用户信息
  async getInfo({ commit, state }) {
    let res= await getInfo(state.token)
    if (res.code==20000) {
      //返回的信息，头像，用户名
      // const {avatar,introduction,name}=res.data
     commit('SET_USERINFO',res.data)
     commit('SET_RESROUTERS',componentroter(asyncrouters,res.data.routes))
      return 'ok'
    }else{
      return Promise.reject(new error('faile'))
    }
    
    // return new Promise((resolve, reject) => {
    //   getInfo(state.token).then(response => {
    //     const { data } = response
    //     if (!data) {
    //       return reject('Verification failed, please Login again.')
    //     }
    //     const { name, avatar } = data

    //     commit('SET_NAME', name)
    //     commit('SET_AVATAR', avatar)
    //     resolve(data)
    //   }).catch(error => {
    //     reject(error)
    //   })
    // })
  },

  // user logout
  logout({ commit, state }) {
    return new Promise((resolve, reject) => {
      logout(state.token).then(() => {
        removeToken() // must remove  token  first
        resetRouter()
        commit('RESET_STATE')
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },

  // remove token
  resetToken({ commit }) {
    return new Promise(resolve => {
      removeToken() // must remove  token  first
      commit('RESET_STATE')
      resolve()
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}

