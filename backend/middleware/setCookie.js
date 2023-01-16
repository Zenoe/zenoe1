
module.exports = setCookie
function setCookie (req, res, next) {
  // check if client sent cookie
  // const cookie = req.cookies.cookieName
  // console.log(' cookie', cookie)
  // no: set a new cookie
  let randomNumber = Math.random().toString()
  randomNumber = randomNumber.substring(2, randomNumber.length)
  const options = {
    // secure: process.env.NODE_ENV !== 'dev',
    maxAge: 1000 * 60 * 10, // would expire after 15 minutes
    httpOnly: true // The cookie only accessible by the web server
    // signed: true // Indicates if the cookie should be signed
  }
  res.cookie('cookieName', randomNumber, options)
  console.log('cookie created')
  next() // <-- important!
}
