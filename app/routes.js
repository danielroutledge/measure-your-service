const express = require('express')
const router = express.Router()

// Add your routes here - above the module.exports line

module.exports = router


// Branching v0.1
router.post('/mys-version-0-1/find-out-about', function (req, res) {
    // Get the answer from session data
    // The name between the quotes is the same as the 'name' attribute on the input elements
    // However in JavaScript we can't use hyphens in variable names
  
    const findout = req.session.data['find-out']
  
    if (findout=== 'find-out-hyp') {
      res.redirect('/mys-version-0-1/which-team')
    } 
    else if (findout === 'find-out-vision') {
      res.redirect('/mys-version-0-1/vision/vision-heatmap')
    }
  })


  router.post('/mys-version-0-1/choose-team-hyp', function (req, res) {
    // Get the answer from session data
    // The name between the quotes is the same as the 'name' attribute on the input elements
    // However in JavaScript we can't use hyphens in variable names
  
    const team = req.session.data['team']
  
    if (team=== 'Royal Blue') {
      res.redirect('/mys-version-0-1/performance-framework/royal-blue')
    } 
    else {
      res.redirect('#')
    }
  })


  // Branching v0.2
router.post('/mys-version-0-2/find-out-about', function (req, res) {
  // Get the answer from session data
  // The name between the quotes is the same as the 'name' attribute on the input elements
  // However in JavaScript we can't use hyphens in variable names

  const findout = req.session.data['find-out']

  if (findout=== 'find-out-hyp') {
    res.redirect('/mys-version-0-2/which-team')
  } 
  else if (findout === 'find-out-vision') {
    res.redirect('/mys-version-0-2/vision/vision-heatmap')
  }
})


router.post('/mys-version-0-2/choose-team-hyp', function (req, res) {
  // Get the answer from session data
  // The name between the quotes is the same as the 'name' attribute on the input elements
  // However in JavaScript we can't use hyphens in variable names

  const team = req.session.data['team']

  if (team=== 'Royal Blue') {
    res.redirect('/mys-version-0-2/performance-framework/royal-blue')
  } 
  else {
    res.redirect('#')
  }
})


// Branching v0.3
router.post('/mys-version-0-3/find-out-about', function (req, res) {
  // Get the answer from session data
  // The name between the quotes is the same as the 'name' attribute on the input elements
  // However in JavaScript we can't use hyphens in variable names

  const findout = req.session.data['find-out']

  if (findout=== 'find-out-hyp') {
    res.redirect('/mys-version-0-3/which-team')
  } 
  else if (findout === 'find-out-metrics') {
    res.redirect('/mys-version-0-3/service-metrics/which-service')
  }
  else if (findout === 'find-out-vision') {
    res.redirect('/mys-version-0-3/vision/vision-heatmap')
  }
})


router.post('/mys-version-0-3/choose-team-hyp', function (req, res) {
  // Get the answer from session data
  // The name between the quotes is the same as the 'name' attribute on the input elements
  // However in JavaScript we can't use hyphens in variable names

  const team = req.session.data['team']

  if (team=== 'Royal Blue') {
    res.redirect('/mys-version-0-3/performance-framework/royal-blue')
  } 
  else {
    res.redirect('#')
  }
})



router.post('/mys-version-0-3/service-metrics/choose-service', function (req, res) {
  // Get the answer from session data
  // The name between the quotes is the same as the 'name' attribute on the input elements
  // However in JavaScript we can't use hyphens in variable names

  const service = req.session.data['service']

  if (service=== 'HAS') {
    res.redirect('/mys-version-0-3/service-metrics/HAS-always-metrics')
  } 
  else {
    res.redirect('#')
  }
})