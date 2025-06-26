import express from 'express';
import { 
  createBooking, 
  getUserBookings, 
  getOwnerBookings, 
  updateBookingStatus, 
  cancelBooking 
} from '../controllers/bookingController.js';
import { protect, authorize } from '../middleware/auth.js';

const router = express.Router();

// User booking routes
router.post('/', protect, createBooking);
router.get('/user', protect, getUserBookings);
router.put('/cancel/:id', protect, cancelBooking);

// Owner booking routes
router.get('/owner', protect, authorize('owner', 'admin'), getOwnerBookings);
router.put('/status/:id', protect, authorize('owner', 'admin'), updateBookingStatus);

export default router;