import passport from 'koa-passport'
import localStrategy from 'passport-local'
import UserModel from '../../dbs/models/users'


passport.use(new localStrategy(async function(username,password,done){
  let where = {
    username:username
  }
  let result = await UserModel.findOne(where);
  if(result != null){
    if(result.password === password){
      done(null,result)
    }else{
      done(null,false,'密码不正确')
    }
  }else{
    done(null,false,'用户不存在')
  }
}))

passport.serializeUser(function(user,done){
  done(null,user)
})

passport.deserializeUser(function(user,done){
  done(null,user)
})

