const express = require('express');
const router = express.Router();
const passport = require('passport');
const stationController = require('../controllers/stationController');

// Station routes
router.get('/', stationController.getAllStations);
router.get('/me', passport.authenticate('jwt', { session: false }), stationController.getMyStation);
router.get('/:id', stationController.getStationById);
router.get('/search/:city', stationController.searchStationsByCity);
router.get('/status/:status', stationController.getStationsByStatus);
router.post('/', stationController.createStation);
router.patch('/:id/status', stationController.updateStationStatus);
router.get('/stats', stationController.getStationStats);

// GPS Structure routes
router.get('/:stationId/gps-structure', stationController.getStationGPSStructure);
router.put('/:stationId/gps-structure', stationController.saveStationGPSStructure);
router.post('/:stationId/submit-for-approval', stationController.submitStationForApproval);
router.post('/:stationId/approve', stationController.approveStation);
router.post('/:stationId/reject', stationController.rejectStation);
router.patch('/:stationId/visibility', stationController.togglePublicVisibility);
router.get('/mapping-status/:status', stationController.getStationsByMappingStatus);

// Station Settings routes
router.get('/settings', passport.authenticate('jwt', { session: false }), stationController.getStationSettings);
router.post('/settings', passport.authenticate('jwt', { session: false }), stationController.saveStationSettings);

// Station Admin Profile routes
router.get('/admin/profile', passport.authenticate('jwt', { session: false }), stationController.getStationAdminProfile);
router.put('/admin/profile', passport.authenticate('jwt', { session: false }), stationController.updateStationAdminProfile);
router.put('/admin/change-password', passport.authenticate('jwt', { session: false }), stationController.changeStationAdminPassword);

// Admin API to set station working hours
router.post('/admin/:id/hours', passport.authenticate('jwt', { session: false }), stationController.setStationHours);

module.exports = router;
