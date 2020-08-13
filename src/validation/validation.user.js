const formValidate = async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    await req.flash("error", "Please Insert Password and email");
    return await res.redirect(req.path);
  }

  if (password.length < 6) {
    await req.flash("error", "password At least 6 caracter");
    return await res.redirect(req.path);
  }
  return next()
};

const usernameValidate = (req, res, next) => {
  const {username, name} = req.body

  if(!username || !name){
    req.flash('error', 'Username and Name must be filled in')
    return res.redirect(req.path)
  } 

  return next()
}

const validateVerification = (req, res) => {
  const verify = req.user.verification
  if(!verify){
    res.redirect('/verify')
  }

  res.redirect('/')
}

module.exports = {
  formValidate,
  validateVerification,
  usernameValidate
};
