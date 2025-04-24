import { Router } from 'express';
const router = Router();
import { getAllUsers, getUserById, createUser, updateUser, deleteUser, } from '../../controllers/userController.js';
// /api/courses
router.route('/').get().post();
// /api/courses/:courseId
router
    .route('/:id')
    .get(getAllUsers)
    .get(getUserById)
    .post(createUser)
    .put(updateUser)
    .delete(deleteUser);
export { router as userRouter };
