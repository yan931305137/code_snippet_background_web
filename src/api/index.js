import request from '../utils/request'

export default {
  // 用户
  GetInformationList (size,num) {
    return request({
      url: '/user/Information/'+size+'/'+num,
      method: 'get'
    })
  },
  AddInformation(UserName,  Password,  Gender,  age,  Birthday,  Address, Mobile,  Email){
    let data = {
      UserName,  Password,  Gender,  age,  Birthday,  Address, Mobile,  Email
    }
    return request({
      url: '/user/Information',
      method: 'post',
      data
    })
  },
  PutInformation(UserName,  Password,  Gender,  Age,  Birthday,  Address, Mobile,  Email){
    let data = {
      UserName,  Password,  Gender,  Age,  Birthday,  Address, Mobile,  Email
    }
    return request({
      url: '/user/Information',
      method: 'put',
      data
    })
  },
  DeleteUserInfo(id){
    let data = {
      id
    }
    return request({
      url: '/user/Information',
      method: 'delete',
      data
    })
  },
  //角色
  captcha () {
    return request({
      url: '/role/captcha',
      method: 'get'
    })
  },
  login (rolename, password, captcha, idKey) {
    let data = {
      rolename, password, captcha, idKey
    }
    return request({
      url: '/role/login',
      method: 'post',
      data
    })
  },
  GetInformation () {
    return request({
      url: '/role/Information',
      method: 'get'
    })
  },
  AddRoleInformation(RoleName,  Password,Authority,  Gender,  age,  Birthday,  Address, Mobile,  Email){
    let data = {
      RoleName,  Password,Authority,  Gender,  age,  Birthday,  Address, Mobile,  Email
    }
    return request({
      url: '/role/Information',
      method: 'post',
      data
    })
  },
  PutRoleInformation(RoleName,  Password,Authority,  Gender,  Age,  Birthday,  Address, Mobile,  Email){
    let data = {
      RoleName,  Password,Authority,  Gender,  Age,  Birthday,  Address, Mobile,  Email
    }
    return request({
      url: '/role/Information',
      method: 'put',
      data
    })
  },
  DeleteRoleInfo(id){
    let data = {
      id
    }
    return request({
      url: '/role/Information',
      method: 'delete',
      data
    })
  },
  GetRoleInformationList (size,num) {
    return request({
      url: '/role/Information/'+size+'/'+num,
      method: 'get'
    })
  },
  // 代码
  GetCodeInformationList (size,num) {
    return request({
      url: '/code/GetCodeList/'+size+'/'+num,
      method: 'get'
    })
  },
  AddCodeInformation(UserID,  Title,Content,Authority,  Description,  Category,  Tags){
    let data = {
      UserID,  Title,Content,Authority,  Description,  Category,  Tags
    }
    return request({
      url: '/code/PostCode',
      method: 'post',
      data
    })
  },
  PutCodeInformation(Id,UserID,  Title,  Content, Authority, Description, Category, Tags){
    let data = {
      Id,UserID,  Title,  Content, Authority, Description, Category, Tags
    }
    return request({
      url: '/code/Information',
      method: 'put',
      data
    })
  },
  DeleteCodeInfo(ids){
    let data = {
      ids
    }
    return request({
      url: '/code/Information',
      method: 'delete',
      data
    })
  },
  // log
  GetLogInformationList (size,num) {
    return request({
      url: '/logs/'+size+'/'+num,
      method: 'get'
    })
  },
  AddLogInformation(RequestURI,Method,ResponseCode,ResponseMsg,Time,Level){
    let data={
      RequestURI,Method,ResponseCode,ResponseMsg,Time,Level
    }
    return request({
      url: 'log',
      method: 'post',
      data
    })
  },
  PutLogInformation(Id,RequestURI,Method,ResponseCode,ResponseMsg,Time,Level){
    let data={
      Id,RequestURI,Method,ResponseCode,ResponseMsg,Time,Level
    }
    return request({
      url: 'log',
      method: 'put',
      data
    })
  },
  DeleteLogInfo(ids){
    let data = {
      ids
    }
    return request({
      url: '/log',
      method: 'delete',
      data
    })
  },
}

