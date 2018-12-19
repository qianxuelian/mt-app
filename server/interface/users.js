import Router from 'koa-router'
import Redis from 'koa-redis'
import nodeMailer from 'nodemailer'
import User from '../dbs/models/user'
import Passport from './utils/passport'
import Email from '../dbs/config'
import axios from './utils/axios'

let router = new Router({
  prefix:'/users'
})

let Store = new Redis().client

/*注册*/
router.post('/signup',async(ctx) => {
  const {
    username,
    password,
    email,
    code,
  } = ctx.request.body;
  /*验证验证码*/
  if (code) {
    /*从redis中获取code expire*/
    const saveCode = await Store.hget(`nodemail:${username}`, 'code')
    const saveExpire = await Store.hget(`nodemail:${username}`, 'expire')
    /*验证码判断*/
    if (code === saveCode) {
      if (new Date().getTime() - saveExpire > 0) {
        ctx.body = {
          code: -1,
          msg: '验证码已过期,请重新尝试'
        }
        return false;
      }
    }else {
      ctx.body = {
        code: -1,
        msg: '请填写正确的验证码'
      }
    }
  }else {
    /*没有输入验证码*/
    ctx.body = {
      code: -1,
      msg: '请填写验证码'
    }
  }

  /*验证用户名和密码*/
  let user = await User.find({
    username
  })
  if (user.length) {
    ctx.body = {
      code: -1,
      msg: '用户已被注册'
    }
    return
  }
  let nuser = await User.create({ username, password, email })
  if (nuser) {
    let res = await axios.post("/users/signin", { username, password })
    if (res.data && res.data.code == 0) {
      ctx.body = {
        code: 0,
        msg: '注册成功',
        user: res.data.user
      }
    } else {
      ctx.body = {
        code: -1,
        msg: 'error'
      }
    }
  }else{
    ctx.body = {
      code: -1,
      msg: '注册失败'
    }
  }
})

// 登录
router.post('/signin',async(ctx,next) => {
  /*调用passport-local的方法*/
  return Passport.authenticate('local',function(err,user,info,state){
    if(err){
      ctx.body = {
        code:-1,
        msg:err
      }
    }else{
      if(user){
        ctx.body = {
          code:0,
          msg:'登录成功',
          user
        }
        return ctx.login(user)
      }else{
        ctx.body = {
          code:1,
          msg:info,
        }
      }
    }
  })(ctx,next)
})

//验证码
router.post('/verify',async(ctx,next) => {
  let username = ctx.request.body.username;
  const saveExpire = await Store.hget(`nodemail:${username}`,'expire')
  if(saveExpire && new Date().getTime() - saveExpire > 0){
    //防御机制
    ctx.body = {
      code: -1,
      msg:'验证码请求过于频繁,1分钟内1次'
    }
    return false
  }
  //发送配置信息
  let transporter = nodeMailer.createTransport({
    host:Email.stmp.host,
    port:587,
    secure:false,
    auth:{
      user: Email.stmp.user,
      pass: Email.stmp.pass
    }
  })

  /*发送方*/
  let ko = {
    code:Email.stmp.code(),
    expire: Email.stmp.expire(),
    email:ctx.request.body.email,
    user:ctx.request.body.username
  }

  /*发送内容*/
  let mailOptions = {
    from:`"认证邮件"<${Email.stmp.user}>`,
    to: ko.email,
    subject:'注册吗',
    html:'注册吗'
  }
  await transporter.sendMail(mailOptions,(error,info) =>{
    if(error){
      return console.log('error')
    }else{
      Store.hmset(`nodemail:${ko.user}`,'code',ko.code,'expire',ko.expire,'email',ko.email)
    }
  })
  ctx.body = {
    code:0,
    msg:'验证码已发送,可以还有延迟'
  }
})

/*退出*/
router.get("/exit",async(ctx,next) =>{
  await ctx.logout()
  if( !ctx.isAuthenticated()){
    ctx.body = {
      code:0
    }
  }else{
    ctx.body = {
      code:-1
    }
  }
})

/*得到用户信息*/
router.get('/getUser',async(ctx) =>{
  if(ctx.isAuthenticated()){
    const {username,email} = ctx.session.passport.user
    ctx.body = {
      user:username,
      email:email
    }
  }else{
    ctx.body = {
      user:'',
      email:''
    }
  }
})

export default router;
