import { FC } from 'react';
import './CoursePopover.scss';
import Popover from 'react-bootstrap/Popover';
import { CourseGQLData } from '../../types/types';
import {
  CorequisiteText,
  CourseBookmarkButton,
  CourseDescription,
  IncompletePrerequisiteText,
  PrerequisiteText,
} from '../CourseInfo/CourseInfo';

interface CoursePopoverProps {
  course: CourseGQLData;
  requiredCourses?: string[];
  interactive?: boolean;
}

const CoursePopover: FC<CoursePopoverProps> = ({ course, interactive = true, requiredCourses }) => {
  const { department, courseNumber, minUnits, maxUnits } = course;

  return (
    <Popover.Content className="course-popover">
      <div className="popover-name">
        {department + ' ' + courseNumber + ' '}
        <span className="popover-units">({minUnits === maxUnits ? minUnits : `${minUnits}-${maxUnits}`} units)</span>

        <div className="spacer"></div>
        {interactive && <CourseBookmarkButton course={course} />}
      </div>
      <br />
      <CourseDescription course={course} />
      <PrerequisiteText course={course} />
      <CorequisiteText course={course} />
      <IncompletePrerequisiteText requiredCourses={requiredCourses} />
    </Popover.Content>
  );
};

export default CoursePopover;
