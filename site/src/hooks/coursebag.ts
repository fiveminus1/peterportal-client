import { useCallback, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { addCourseToBagState, removeCourseFromBagState } from '../store/slices/coursebagSlice';
import trpc from '../trpc';
import { useIsLoggedIn } from './isLoggedIn';
import { CourseGQLData } from '../types/types';

export function useCoursebag() {
  const coursebag = useAppSelector((state) => state.coursebag.coursebag);
  const dispatch = useAppDispatch();
  const isLoggedIn = useIsLoggedIn();

  useEffect(() => {
    if (coursebag !== undefined) {
      localStorage.setItem('coursebag', JSON.stringify(coursebag.map((course) => course.id)));
    }
  }, [coursebag]);

  const addCourseToBag = useCallback(
    (course: CourseGQLData) => {
      dispatch(addCourseToBagState(course));
      if (isLoggedIn) trpc.savedCourses.add.mutate({ courseId: course.id });
    },
    [dispatch, isLoggedIn],
  );

  const removeCourseFromBag = useCallback(
    (course: CourseGQLData) => {
      dispatch(removeCourseFromBagState(course));
      if (isLoggedIn) trpc.savedCourses.remove.mutate({ courseId: course.id });
    },
    [dispatch, isLoggedIn],
  );

  const toggleBookmark = useCallback(
    (course: CourseGQLData) => {
      const isBookmarked = coursebag!.some((c) => c.id === course.id);
      if (isBookmarked) {
        removeCourseFromBag(course);
      } else {
        addCourseToBag(course);
      }
    },
    [addCourseToBag, coursebag, removeCourseFromBag],
  );

  return { coursebag: coursebag ?? [], addCourseToBag, removeCourseFromBag, toggleBookmark };
}
