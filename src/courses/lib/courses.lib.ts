export const enum COURSE_EVENT {
  USER_ENROLMENT_CREATED = 'user_enrolment_created',
  COURSE_MODULE_VIEWED = 'course_module_viewed',
  ATTEMPT_SUBMITTED = 'attempt_submitted',
  COURSE_COMPLETED = 'course_completed',
}

export const getCourseEventMessage = (
  event: COURSE_EVENT,
  studentName: string,
  courseName: string,
): string => {
  const messages: Record<COURSE_EVENT, string> = {
    [COURSE_EVENT.USER_ENROLMENT_CREATED]: `${studentName} has successfully enrolled in ${courseName}`,
    [COURSE_EVENT.COURSE_MODULE_VIEWED]: `${studentName} has viewed this module in ${courseName}`,
    [COURSE_EVENT.ATTEMPT_SUBMITTED]: `${studentName} has submitted their attempt successfully in ${courseName}`,
    [COURSE_EVENT.COURSE_COMPLETED]: `Congratulations! ${studentName} has completed ${courseName}`,
  };

  return messages[event];
};
