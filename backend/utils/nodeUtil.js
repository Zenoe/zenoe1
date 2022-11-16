const generateRoutes = (_router, _routetbl) => {
  for (const route of _routetbl) {
    route.method.call(_router, route.endpoint, route.controller)
  }
}

// const fn = router.post
// fn.call(router, routetbl[0].endpoint, routetbl[0].controller)

module.exports = {
  generateRoutes
}
