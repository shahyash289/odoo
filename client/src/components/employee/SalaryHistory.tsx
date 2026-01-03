import express from 'express';
import verifyUser from '../middleware/authMiddleware.js';
import { 
  addSalary,
  getAllSalaries,
  getSalary,
  getSalariesByEmployee,
  updateSalary,
  updateSalaryStatus,
  deleteSalary
} from '../controllers/salaryController.js';

const router = express.Router();

// Get all salaries (admin view)
router.get('/', verifyUser, getAllSalaries);

// Get salary by ID
router.get('/:id', verifyUser, getSalary);

// Get salaries for an employee (by employeeId)
router.get('/employee/:employeeId', verifyUser, getSalariesByEmployee);

// Add salary
router.post('/', verifyUser, addSalary);

// Update salary
router.put('/:id', verifyUser, updateSalary);

// Update salary status
router.patch('/:id/status', verifyUser, updateSalaryStatus);

// Delete salary
router.delete('/:id', verifyUser, deleteSalary);

export default router;